import React from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import { client } from './scripts/client';



function App() {
  if (client.gameStarted) {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }

  else {
    return (
      <div className="App">
        <MainMenu />
      </div>
    );
  }

}

export default App;
