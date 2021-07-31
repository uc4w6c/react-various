import React from 'react';

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
    let squareRowList = [];
    for (let i = 0; i < 3; i++) {
      let squareColList = [];
      for (let j = 0; j < 3; j++) {
        squareColList.push(this.renderSquare(i, j));
      }
      squareRowList.push(<div className="board-row">{squareColList}</div>);
    }

    return (
      <div>
        {squareRowList}
      </div>
    );
  }
}

export default Board
