import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './board.js'
import Info from './info.js'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(3).fill().map(() => new Array(3).fill(null)),
        setRow: null,
        setCol: null,
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = new Array(current.squares.length);
    for (let i = 0; i < current.squares.length; i++) {
      squares[i] = current.squares[i].slice();
    }
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        setRow: i,
        setCol: j,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <Info
            status={status}
            history={history}
            stepNumber={this.state.stepNumber}
            onClick={(step) => this.jumpTo(step)}
          />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  // 横並び
  for (let i = 0; i < 3; i++) {
    if (!squares[i][0]) continue;
    let isSameMark = true;
    for (let j = 1; j < 3; j++) {
      if (squares[i][0] !== squares[i][j]) {
        isSameMark = false;
        break;
      }
    }
    if (isSameMark) {
      return squares[i][0];
    }
  }

  // 縦並び
  for (let i = 0; i < 3; i++) {
    if (!squares[0][i]) continue;
    let isSameMark = true;
    for (let j = 1; j < 3; j++) {
      if (squares[0][i] !== squares[j][i]) {
        isSameMark = false;
        break;
      }
    }
    if (isSameMark) {
      return squares[0][i];
    }
  }

  // 斜め
  if (squares[0][0] && squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) {
    return squares[0][0];
  }
  if (squares[0][2] && squares[0][2] === squares[1][1] && squares[0][2] === squares[2][0]) {
    return squares[0][0];
  }

  return null;
}
