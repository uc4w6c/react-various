import React from 'react';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAsc: true
    };
  }

  order() {
    this.setState(prevState => ({
      isAsc: !prevState.isAsc
    }));
  }

  render() {

    const moves = this.props.history.map((step, move) => {
      const desc = move ? 
        'Go to move #' + move + '  (row:' + step.setRow + ', col:' + step.setCol + ')':
        'Go to game start';
      const buttonClassName = (move === this.props.stepNumber) ? 
        'current-history-button' :
        'history-button';
      return (
        <li className="history-list" key={move}>
          <button className={buttonClassName} onClick={() => this.props.onClick(move)}>{desc}</button>
        </li>
      )
    });

    const orderMoves = this.state.isAsc ? moves : moves.reverse();

    return (
      <div>
        <div>{this.props.status}</div>
        <button onClick={() => this.order()}>
          {this.state.isAsc ? '降順' : '昇順'}
        </button>
        <ol>{orderMoves}</ol>
      </div>
    );
  }
}

export default Info
