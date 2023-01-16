
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
