/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {useState, useEffect} from 'react';
import blank from '../images/blank.png'
import ScoreBoard from './ScoreBoard';
import './LevelOne.css'
import IntroLevel from './IntroLevel'

import  {candyColors}  from '../utilities/candies';

const width = 5;

function Game() {

  const [currentColorArrangement, setCurrentColorArrengement] = useState([]);
  const [squareDragged, setSquareDragged] = useState([null]);
  const [squareReplaced, setSquareReplaced] = useState([null]);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [playerReady, setPlayerReady] = useState(false)

  const checkColumnOfFour = () => {
    for (let i = 0; i <= 9; i++) {
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
    for (let i = 0; i < width*width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i+3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [2, 3, 4, 7, 8, 9];
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
   for (let i = 0; i <= 14; i++) {
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
    for (let i = 0; i < width*width; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [3, 4, 8, 9, 13, 14, 18, 19, 23, 24]
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
  
  
  const dragStart = (e) => {
    
    setSquareDragged(e.target)
  }
  
  const dragDrop = (e) => {
    
    
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
     let timer = 4
      const loadingInterval = setInterval(function(){
          if(timer===0){
          setLoading(false)
          console.log(timer, 'timer', loading);
          clearInterval(loadingInterval)
          
          
          }else{
          timer--
          }
          
      }, 1000)
      
     
      createBoard()


    }, [])

  useEffect(()=>{
      const timerId = setInterval(()=>{
        checkColumnOfFour();
        checkRowOfFour();
        checkColumnOfThree();
        checkRowOfThree();
        moveToSquareBelow();
        setCurrentColorArrengement([...currentColorArrangement])
      }, 100)
      return ()=> clearInterval(timerId)
      
    }, [checkColumnOfFour, checkColumnOfThree, checkRowOfThree, checkRowOfFour, moveToSquareBelow, currentColorArrangement])

    
      
    

    return (
      
      <div className={`board-container ${loading?'loading':'loaded'}`}>
      {
        !loading?(
          <div className='board'>
          {
            currentColorArrangement.map((candyColor, index)=>(
              <img
                key = {index}
                src = {candyColor}
                alt = {index}
                data-id = {index}
                draggable = {true}
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop ={dragDrop}
                onDragEnd={dragEnd}
                />
                
            ))
          }
          
          {/* <ScoreBoard score={scoreDisplay}/> */}
        </div>
        ):(null)
      }
      <IntroLevel/>
      <div className="opacity"></div>  
      </div>
    )
}

export default Game
