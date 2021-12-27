/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ScoreBoard from './components/ScoreBoard';
import './App.css';
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

//global variables
const width = 8;
const candyColors = [
  orangeCandy,
  blueCandy,
  yellowCandy, 
  greenCandy, 
  redCandy, 
  purpleCandy,
]

// const candyColors = [
//   'orange',
//   'blue',
//   'yellow', 
//   'green', 
//   'red', 
//   'purple',
// ]

const App = () => {

  const [currentColorArrangement, setCurrentColorArrengement] = useState([]);
  const [squareDragged, setSquareDragged] = useState([null]);
  const [squareReplaced, setSquareReplaced] = useState([null]);
  const [scoreDisplay, setScoreDisplay] = useState(0)


  
  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width*2, i + width*3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank
 
      if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        setScoreDisplay((scoreDisplay)=> scoreDisplay + 4)
        columnOfFour.forEach((square)=>{
          currentColorArrangement[square] = blank
        })
        return true
      }
      
    }
   }
   const checkRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i+3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
      const isBlank = currentColorArrangement[i] === blank
 
      if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){

        if(rowOfFour.includes(notValid)) continue;
        setScoreDisplay((scoreDisplay)=> scoreDisplay + 4)
        rowOfFour.forEach((square)=>{
          currentColorArrangement[square] = blank
        })
        return true
      }
      
    }
   }

  const checkColumnOfThree = () => {
   for (let i = 0; i <= 47; i++) {
     const columnOfThree = [i, i + width, i + width*2];
     const decidedColor = currentColorArrangement[i];
     const isBlank = currentColorArrangement[i] === blank

     if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
      setScoreDisplay((scoreDisplay)=> scoreDisplay + 3)
       columnOfThree.forEach((square)=>{
         currentColorArrangement[square] = blank
       })
       return true
     }
     
   }
  }


  const checkRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
      const isBlank = currentColorArrangement[i] === blank
 
      if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){

        if(rowOfThree.includes(notValid)) continue;
        setScoreDisplay((scoreDisplay)=> scoreDisplay + 3)
        rowOfThree.forEach((square)=>{
          currentColorArrangement[square] = blank
        })
        return true
      }
      
    }
   }
  

  

  const moveToSquareBelow = () =>{
    for (let i = 0; i < 64 -width; i++) {


      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i);

      if(isFirstRow && currentColorArrangement[i] === blank){
        let randomNumber = Math.floor(Math.random()*candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber]
      }
      
      if(currentColorArrangement[i+width] === blank){
        currentColorArrangement[i+width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank
      }
      
    }
  }
  
  console.log(scoreDisplay, 'score')
  const dragStart = (e) => {
    
    setSquareDragged(e.target)
  }
  
  const dragDrop = (e) => {
    console.log(e.target)
    
    setSquareReplaced(e.target)
  }

  const dragEnd = () => {
    console.log('drag end');
    const squareDraggedId = parseInt(squareDragged.getAttribute('data-id'))
    const squareReplacedId = parseInt(squareReplaced.getAttribute('data-id'))
    
    currentColorArrangement[squareReplacedId] = squareDragged.getAttribute('src');
    currentColorArrangement[squareDraggedId] = squareReplaced.getAttribute('src');

    const validMoves = [
      squareDraggedId - 1, 
      squareDraggedId + 1,
      squareDraggedId + width, 
      squareDraggedId - width,
    ]

    const validMove = validMoves.includes(squareReplacedId)

    const isAColumnOfFour = checkColumnOfFour();
    const isARowOfFour = checkRowOfFour();
    const isAColumnOfThree = checkColumnOfThree();
    const isARowOfThree = checkRowOfThree();

    if(squareReplacedId && validMove && (
      isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree
    )){
      setSquareDragged(null);
      setSquareReplaced(null);

    } else {
      currentColorArrangement[squareReplacedId] = squareReplaced.getAttribute('src');
      currentColorArrangement[squareDraggedId] = squareDragged.getAttribute('src');

      setCurrentColorArrengement([...currentColorArrangement])
    }
  }



  const createBoard = () => {
    const randomColorArrengment = [];
    for (let i = 0; i < width * width ; i++) {
        const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)]
        randomColorArrengment.push(randomColor)
        
    }
    setCurrentColorArrengement(randomColorArrengment)
  }

 
  useEffect(() => {
      createBoard()
    }, [])

  useEffect(()=>{
      const timer = setInterval(()=>{
        checkColumnOfFour();
        checkRowOfFour();
        checkColumnOfThree();
        checkRowOfThree();
        moveToSquareBelow();
        setCurrentColorArrengement([...currentColorArrangement])
      }, 100)
      return ()=> clearInterval(timer)
      
    }, [checkColumnOfFour, checkColumnOfThree, checkRowOfThree, checkRowOfFour, moveToSquareBelow, currentColorArrangement])


  return (
    <div className="app">
      <div className='game'>
        {
          currentColorArrangement.map((candyColor, index)=>(
            <img
              key = {index}
              //style = {{backgroundColor : candyColor}}
              src = {candyColor}
              alt = {index}
              data-id = {index}
              draggable = {true}
              onDragStart={dragStart}s
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop ={dragDrop}
              onDragEnd={dragEnd}
              />
          ))
        }  

      </div>
      <ScoreBoard score={scoreDisplay}/>
    </div>
  );
}

export default App;
