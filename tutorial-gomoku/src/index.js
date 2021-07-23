import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i, j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  render() {
    // MEMO: ここでfor文を利用して作りたいが、やり方がわからない・・・
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
        </div>
      </div>
    );
  }
}

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
    const squares = current.squares.slice();
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

    const moves = history.map((step, move) => {
      const desc = move ? 
        'Go to move #' + move + '  (row:' + step.setRow + ', col:' + step.setCol + ')':
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

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
          <div>{status}</div>
          <ol>{moves}</ol>
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
