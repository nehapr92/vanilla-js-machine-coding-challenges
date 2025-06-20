import React, {useState} from 'react'

const board = {
  display:'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
};

const cell ={
    width:'100px',
    height:'100px',
    cursor
}

const tictactoe = () => {

  const [board,setBoard] = useState(Array(9).fill(""));
  const [gameover, setGameOver] = useState(false)

  return (
    <div style ={board}>
      {board.map((b, i)=>{
        return <button style={cell} key ={i}>{b}</button>
      })}
    </div>
  )
}

export default tictactoe
