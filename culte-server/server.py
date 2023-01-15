"""Uses sockets to create a server that can handle multiple clients at once.
"""

import websockets
import socket
import logging
import asyncio
import time
import json

logging.basicConfig(filename='server.log', level=logging.DEBUG,
                    format='%(asctime)s:%(levelname)s:%(message)s')


class Client(object):
    """Represents a client connected to the server.
    """

    def __init__(self, websocket, name):
        self.websocket = websocket
        self.name = name

    def __str__(self):
        return f'{self.name} ({self.websocket.remote_address})'

    def __repr__(self):
        return f'Client({self.websocket}, {self.name})'

    def __eq__(self, other):
        return self.websocket == other.websocket

    def __hash__(self):
        return hash(self.websocket)

    def __ne__(self, other):
        return not self.__eq__(other)


class Server(object):
    """Creates a server that can handle multiple clients at once.
    """

    def __init__(self, host, port):
        self.host = host
        self.port = port

        # create the websocket server
        self.websocket = websockets.serve(self.run, host, port)

        self.runnning = True
        self.clients = []

        # log infos about the server
        logging.info('Server started on %s:%s' % (self.host, self.port))

    async def send(self, client: Client, msg: dict):
        """Sends a message to a client.
        """
        logging.debug(f'[SEND][{client.name}] {msg}')
        msg = json.dumps(msg)
        try:
            await client.websocket.send(msg)

        except ConnectionResetError:
            logging.warning(f'[SEND][{client.name}] Connection reset')
            await self.remove_client(client)

        except Exception as e:
            logging.error(f'[SEND][{client.name}] Unexpected error: {e}')

    async def broadcast(self, msg):
        """Sends a message to all clients.
        """
        for client in self.clients:
            await self.send(client, msg)

    async def remove_client(self, client: Client):
        """Removes a client from the list of clients.
        """
        if client in self.clients:
            self.clients.remove(client)

            to_send = {
                'type': 'info',
                'content': f'{client.name} left the server',
                'author': 'SERVER',
            }
            await self.broadcast(to_send)
            logging.info(f'[DISCONNECT] {client}')
        else:
            logging.warning(f'[DISCONNECT] {client} not found')

    async def handle(self, websocket, path, client: Client):
        """Handles the communication with a client.

        Args:
            websocket (websockets.WebSocketServerProtocol): the websocket
            path (str): the path of the websocket
            client (Client): the client object


        messages format:
            msg = {
                'type': 'message',
                'content': 'Hello world!'
            }

        types:
            - message : sends a message to all clients
            - name : changes the client's name, sends a message to all clients
            - exit : disconnects the client, sends a message to all clients

        disconnects at the end of the function
        """
        while self.runnning:
            try:
                # decode the packet into a dict
                raw_msg = await websocket.recv()
                msg = json.loads(raw_msg)

                logging.info(f'[RECV][{client.name}] {msg}')

                # handle the message
                if msg['type'] == 'message':
                    to_send = {
                        'type': 'message',
                        'content': msg['content'],
                        'author': client.name
                    }
                    await self.broadcast(to_send)

                # change the client's name
                elif msg['type'] == 'name':
                    new_name = msg['content']

                    to_send = {
                        'type': 'message',
                        'content': f'{client.name} changed his name to {new_name}',
                        'author': 'SERVER',
                    }
                    client.name = new_name
                    await self.broadcast(to_send)

                # disconnect the client
                elif msg['type'] == 'exit':
                    break

            except ConnectionResetError:
                logging.warning(f'[RECV][{client.name}] Connection reset')
                break

            except json.JSONDecodeError:
                logging.warning(
                    f'[RECV][{client.name}] Invalid message: {raw_msg}')

            except Exception as e:
                logging.error(f'[RECV][{client.name}] {e}')
                break

            finally:
                await asyncio.sleep(0.01)

        await self.remove_client(client)
        await websocket.close()

    async def run(self, websocket, path):
        """Runs the server.

        Args:
            websocket (websockets.WebSocketServerProtocol): the websocket
            path (str): the path of the websocket
        """
        # create a client object
        client = Client(websocket, f'Anonymous_{id(websocket)}')

        # add the client to the list of clients
        self.clients.append(client)

        # log infos about the client
        logging.info(f'[CONNECT] {client}')

        # send a message to all the connected clients
        await self.broadcast({
            'type': 'message',
            'content': f'"{client.name}", Welcome to the server!',
            'author': 'SERVER',
        })

        # handle the communication with the client
        await asyncio.gather(self.handle(websocket, path, client))


if __name__ == '__main__':
    host = socket.gethostname()
    port = 8080
    server = Server(host, port)
    asyncio.get_event_loop().run_until_complete(server.websocket)
    asyncio.get_event_loop().run_forever()
