import Card from './class/card';
import {makeStyles} from '@material-ui/core/styles';
import ReactCardFlip from 'react-card-flip';

const useStyles = makeStyles({
  front: {
    border: `1px solid black`,
    borderRadius: 8,
    height: 100,
    width: 75,
    margin: 8,
    background: 'blue',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    color: 'white'
  },
  back: {
    border: `1px solid black`,
    borderRadius: 8,
    height: 100,
    width: 75,
    margin: 8,
    background: 'red',
    cursor: 'pointer'
  }
});

interface CardProps {
  card: Card;
  onChange: Function;
}

export default function CardComponent({card, onChange}: CardProps) {
  const classes = useStyles();

  function handleChange() {
    onChange(card);
  }

  return (
    <ReactCardFlip isFlipped={!!card.value} flipDirection="horizontal">
        <div className={classes.back} onClick={handleChange}>
        </div>
        <div className={classes.front}>
          {card.value}
        </div>
    </ReactCardFlip>
  )
}