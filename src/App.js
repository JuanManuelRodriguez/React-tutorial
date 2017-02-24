import React from 'react';
import './App.css';
import calculateWinner from './index.js'

function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(){
        super();
        this.state={
            history:[{
                squares: Array(9).fill(null),
                positionClicked:0,
                posX:0,
                posY:0
            }],
            xIsNext:true,
            stepNumber:0,
        };
    }
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                positionClicked:i,
                posX:Math.floor(i % 3 + 1),
                posY:Math.floor(i / 3 + 1)
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber:history.length,
        });
    }
    position(){
        this.setState({
            posX:this.state.history.positionClicked ,
            posY:this.state.history.positionClicked 
        });

    }
    jumpTo(step)
    {
        this.setState({
           stepNumber:step,
           xIsNext:(step % 2)? false : true //We set xIsNext to true if the index of the move number is an even number.
            //JS 1==true and 0==false
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves=history.map((step,move)=>{          // https://www.w3schools.com/jsref/jsref_map.asp -- map(currentValue,index)
            const desc=move?'Move #'+move+' posX:'+step.posX+' posY:'+step.posY : 'Game start';
        return(
            <li key={move}>
                <a  href="#" onClick={()=>this.jumpTo(move)}>{desc}</a>
            </li>
        )
        });

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
                        onClick={(i) => this.handleClick(i)}
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

export default Game;