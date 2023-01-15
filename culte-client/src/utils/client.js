import log from "./utils.js";

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


class Client {
    constructor() {
        this.serverAddress = null
        this.serverPort = null;
        this.socket = null;
    }

    connect(addr, port) {
        this.serverAddress = addr;
        this.serverPort = port;

        let hoststr = this.serverAddress + ":" + this.serverPort;
        log("\nConnecting to " + hoststr + "...");

        this.socket = new WebSocket("ws://" + hoststr);

        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    }

    onOpen(event) {
        log("Connected to server");
    }

    onMessage(event) {
        let msg = JSON.parse(event.data);
        if (msg.type === "message") {
            log("[" + msg.author + "]: " + msg.content);
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


export default Client;