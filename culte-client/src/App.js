import React from 'react';
import './App.css';
import Client from './utils/client.js';
import log from './utils/utils.js';


let client = new Client("localhost", "8080");

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
  if (client.socket !== null) {
    try {
      client.socket.close();
    }
    catch (e) {
      console.log(e);
    }
  }
  client.connect(serverAddress, serverPort);
}


function onChatMessage(event) {
  if (event.key === "Enter") {
    const chat = document.getElementsByName("chat")[0].value;
    if (chat === "") {
      return;
    }

    const msg = {
      type: "message",
      content: chat,
    };

    client.send(JSON.stringify(msg));
    document.getElementsByName("chat")[0].value = "";
  }
}


function ConnectionMenu() {
  return (
    <div className="ConnectionMenu">
      <h1>Connect to Server</h1>

      <table>
        <tbody>
          <tr>
            <td>Server address:</td>
            <td><input type="text" name="serverAddress" onKeyUpCapture={onServerAddressChange} defaultValue="localhost" /></td>
          </tr>
          <tr>
            <td>Server port:</td>
            <td><input type="text" name="serverPort" onKeyUpCapture={onServerAddressChange} defaultValue="8080" /></td>
          </tr>
        </tbody>

      </table>
      <button onClick={onConnect}>Connect</button>

      <textarea name="log" rows="20" readOnly></textarea>

      <table>
        <tbody>
          <tr>
            <td>chat:</td>
            <td><input type="text" name="chat" onKeyUpCapture={onChatMessage} /></td>
          </tr>
        </tbody>
      </table>

    </div>
  );

}

function MainMenu() {
  return (
      <div className="MainMenu">
        <h1>Culte Web</h1>
        <ConnectionMenu />
        <div className="BackgroundImage">
      </div>
    </div>
  );

}




export default MainMenu;
