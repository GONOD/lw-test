import React, { useEffect, useState } from 'react';
import GameApi from './game-api';
import Game from './class/game';
import GameManager from './GameManager';

export default function GamePage() {
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const gameApi = new GameApi();

    async function newGame() {
      const {cards} = await gameApi.newGame();

      setGame(new Game(gameApi, cards));
    }
    newGame();
  }, []);


  return (
    <div>
      {game && <GameManager game={game}/>}
    </div>

  );
}
