import React from 'react';
import CardComponent from '../card/Card';
import Card from '../card/class/card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UndoIcon from '@material-ui/icons/Undo';

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
      fontSize: 35,
      margin: '24px'
    },
    end: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 35,
      margin: '45px 0'
    },
    header: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);

interface GameManagerProps {
  board: Card[][];
  turn: number;
  onChange: Function;
  onBack: () => void;
  disabledBack: boolean;
}

export default function Game({board, turn, onChange, onBack, disabledBack}: GameManagerProps) {
  const classes = useStyles();
  return (
    <div className={classes.board}>
      <div className={classes.header}>
        <div className={classes.turn}>
          TURN: {turn}
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={onBack}
            disabled={disabledBack}
            startIcon={<UndoIcon/>}
          >
            Undo
          </Button>
        </div>
      </div>
      {
        board.map((line: Card[], index: number) => (
          <div key={index} className={classes.line}>
            {
              line.map((card: Card, cardIndex: number) => <CardComponent key={`${index}-${cardIndex}`} card={card} onChange={onChange}/>)
            }
          </div>
        ))
      }
    </div>
  )
}

