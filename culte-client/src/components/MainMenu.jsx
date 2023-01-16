import React from 'react';
import '../App.css';
import { onServerAddressChange, onConnect, onRequestStart, onChatMessage } from '../scripts/client.js';


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

      <div className="buttons">
        <button onClick={onConnect}>Connect</button>
        <button onClick={onRequestStart}>Start game</button>
      </div>

      <div name="log" className="log"></div>

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
