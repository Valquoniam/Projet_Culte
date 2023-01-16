import log from "./log.js";
import render from "../index.js";

const onclose_errors = {
    1000: "Normal closure",
    1001: "Going away",
    1002: "Protocol error",
    1003: "Unsupported data",
    1004: "Reserved",
    1005: "No status code",
    1006: "Abnormal closure",
    1007: "Invalid frame payload data",
    1008: "Policy violation",
    1009: "Message too big",
    1010: "Missing extension",
    1011: "Internal error",
    1012: "Service restart",
    1013: "Try again later",
    1014: "Bad gateway",
    1015: "TLS handshake"
}

const special_colors = {
    "SERVER": "#00ff00",
    "GAME": "#ff0000",
}



class Client {
    constructor() {
        this.serverAddress = null
        this.serverPort = null;
        this.socket = null;
        this.gameStarted = false;
    }

    connect(addr, port) {
        this.serverAddress = addr;
        this.serverPort = port;
        this.gameStarted = false;

        let hoststr = this.serverAddress + ":" + this.serverPort;
        log("\nConnecting to " + hoststr + "...");

        this.socket = new WebSocket("ws://" + hoststr);

        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    }

    onOpen(event) {
        log("Successfully connected to server !");
    }

    onMessage(event) {
        let msg = JSON.parse(event.data);
        let color = "#ffffff";

        if (msg.author in special_colors) {
            color = special_colors[msg.author];
        }

        if (msg.type === "message") {
            log("[" + msg.author + "]: " + msg.content, color);
        }

        if (msg.type === "start") {
            log("[SERVER]: Game started", special_colors["GAME"]);

            // don't know why but this works 
            client.gameStarted = true;

            // rerender app
            render();
        }

    }

    onClose(event) {
        log("Disconnected from server");
        if (event.code in onclose_errors) {
            log("Reason: " + onclose_errors[event.code]);
        }
        else {
            log("Reason: " + event.code);
        }

        this.socket = null;
    }

    onError(event) {
        if (event.code === undefined) {
            log("Error: could not connect to server");
        }
        else {
            log("Error: " + event.code + " " + event.reason);
        }
    }

    send(message) {
        if (this.socket === null) {
            log("Not connected to server");
            return;
        }
        this.socket.send(message);
    }
}


function onServerAddressChange(event) {
    if (event.key === "Enter") {
        onConnect();
    }
}

function onConnect() {
    const serverAddress = document.getElementsByName("serverAddress")[0].value;
    const serverPort = document.getElementsByName("serverPort")[0].value;

    if (serverAddress === "" || serverPort === "") {
        return;
    }

    // if already connected to the same server, raise error
    if (client.socket !== null &&
        client.socket.readyState === WebSocket.OPEN &&
        client.serverAddress === serverAddress &&
        client.serverPort === serverPort) {

        log("Already connected to " + serverAddress + ":" + serverPort + "\n");
        return;
    }

    if (client.socket !== null) {
        client.socket.close();
    }

    client.connect(serverAddress, serverPort);
}

function onRequestStart() {
    if (client.socket === null || client.socket.readyState !== WebSocket.OPEN) {
        log("Not connected to server\n");
        return;
    }

    client.send(JSON.stringify({ type: "start" }));
}


function onChatMessage(event) {
    if (event.key === "Enter") {
        const chat = document.getElementsByName("chat")[0].value;

        if (chat === "") {
            return;
        }

        // syntax: /command arg1 arg2 ...
        if (chat.startsWith("/")) {
            log(chat + "\n");
            const cmd = chat.substring(1).split(" ")[0];

            // syntax: /help
            if (cmd === "help") {
                log("Help:");
                log("Available commands:");
                log("/exit - disconnect from server");
                log("/name <name> - change your name");
                log("/help - show this message\n");
            }

            // syntax: /exit
            else if (cmd === "exit") {
                client.send(JSON.stringify({
                    type: "exit",
                }));
            }

            // syntax: /name <name>
            else if (cmd === "name") {
                const name = chat.substring(6);
                if (name === "") {
                    log("Name cannot be empty\n");
                }
                else {
                    client.send(JSON.stringify({
                        type: "name",
                        content: name,
                    }));
                }
            }
            else {
                log("Unknown command, type /help for help\n");
            }
        }
        else {

            // Send chat message
            client.send(JSON.stringify({
                type: "message",
                content: chat,
            }));
        }

        // clear chat input
        document.getElementsByName("chat")[0].value = "";
    }
}

let client = new Client("localhost", "8080");
export { onConnect, onRequestStart, onChatMessage, onServerAddressChange, client };