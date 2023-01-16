import React from 'react';
import '../App.css';
import { onChatMessage, client } from '../scripts/client.js';
import log from '../scripts/log.js';
import cardImage from '../assets/card.png';

function debugClick(event) {
  const card = event.target.parentElement;
  console.log(card);
  client.send(JSON.stringify({ type: 'playCard', card: card.id }));
}


function Card(props) {
  return (
    <div className="PlaceCard" key={props}>
      <img src={cardImage} alt="card" className="PlaceCardImage" onClick={debugClick} />
    </div>
  );
}

function PlaceGrid() {
  let cards = [];
  for (let i = 0; i < 13; i++) {
    cards.push(Card(i));
  }


  return (
    <div className="PlaceGrid">
      {cards}
    </div>
  );
}

function Deck() {
  return (
    <div className="Deck">
      <div className="DeckImage"></div>
    </div>
  );
}

// the board is a 4x4 grid of PlaceCards
function Board() {
  return (
    <div className="Board">
      <PlaceGrid />
      <Deck />
    </div>
  );


}

function Game() {
  return (
    <div className="Game">
      <div className="GameMenu">
        <Board />
        <div className="GameChat">
          <div name="log" className="log"></div>
          < table >
            <tbody>
              <tr>
                <td>chat:</td>
                <td><input type="text" name="chat" onKeyUpCapture={onChatMessage} /></td>
              </tr>
            </tbody>
          </table >
        </div>
      </div>
      <div className="BackgroundImage"></div>
    </div>
  );
}

export default Game;
