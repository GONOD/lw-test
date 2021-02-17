import React, { useEffect, useState } from 'react';
import GameComponent from './Game';
import Card from '../card/class/card';
import Game from './class/game';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    line: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: 500,
      width: '100%',
      justifyContent: 'space-between'
    },
    board: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 24
    },
    turn: {
      textAlign: 'center',
      fontSize: 35
    },
    end: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 35,
      margin: '45px 0',
      display: 'flex',
      flexDirection: 'column'
    },
    retry: {
      marginTop: 24
    }
  })
);

interface GameManagerProps {
  game: Game;
}

export default function GameManager({game}: GameManagerProps) {
  const [allowBack, setAllowBack] = useState<boolean>(false);
  const [lock, setLock] = useState<boolean>(false);
  const [board, setBoard] = useState<Card[][]>(game.getBoard());
  const classes = useStyles();

  useEffect(() => {
    game.startGame();
  }, [game]);

  function finishTurn() {
    if (game.isFinished()) { // CHECK IF GAME IS FINISHED
      game.endGame();
    }

    setBoard(game.getBoard());
    setLock(false);
  }

  function handleChange(card: Card) {
    if (!lock) { // LOCK TO PREVENT CLICK ON OTHER CARDS
      setLock(true);
      card.flip();

      const playTurn = game.getPlayTurn();
      const isSameValue = playTurn.turn === 2 &&  playTurn.previousCard.value === card.value;


      game.addToHistory(card);


      if (playTurn.turn === 1 || isSameValue) { // FIRST CARD OR SAME VALUE DO NOTHING
        finishTurn();
        return;
      }

      //SECOND CARD WITHOUT SAME VALUE
      setTimeout(() => {
        playTurn.previousCard.flip(); // FLIP TWO CARDS
        card.flip();

        setAllowBack(true);
        finishTurn();
      }, 1000);

      setBoard(game.getBoard()); // RENDER FLIPPED CARD
    }
  }

  function handleBack() {
    game.undo();
    setAllowBack(false);
    setBoard(game.getBoard());
  }

  function handleReset() {
    game.reset();
    setAllowBack(false);
    setBoard(game.getBoard());
  }

  const isFinished = game.isFinished();

  if (isFinished) { // TODO CREATE A SEPARATE COMPONENT
    return (
    <div className={classes.end}>
      CONGRATULATION [{game.time()} seconds]

      <Button
        className={classes.retry}
        variant="outlined"
        color="primary"
        onClick={handleReset}
        startIcon={<ReplayIcon/>}
      >
        Retry
      </Button>
    </div>
    );
  }

  return ( <GameComponent board={board} turn={game.getHistory().length} onChange={handleChange} onBack={handleBack} disabledBack={!allowBack}/>)
}

