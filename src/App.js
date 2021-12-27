/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';

//global variables
const width = 8;
const candyColors = [
  'orange',
  'blue',
  'yellow', 
  'green', 
  'red', 
  'purple',
]

const App = () => {

  const [currentColorArrangement, setCurrentColorArrengement] = useState([])

  
  //useEffect -checkmatches set interval 100ms
  
  //create Board (randomcolor, forloop, randomcolorarrengement.push, useState, map - img, css game)

  const createBoard = () => {
    const randomColorArrengment = [];
    for (let i = 0; i < width * width ; i++) {
        const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)]
        randomColorArrengment.push(randomColor)
        
    }
    setCurrentColorArrengement(randomColorArrengment)
  }
    
  //check column of 3 (columnofthree, we loop firs sq os column as decided color, if column every square => current color arran === decided color then columnofthre.foreach currentCollorArrangement[sq] = '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkColumnOfThree = () => {
   for (let i = 0; i < 47; i++) {
     const columnOfThree = [i, i + width, i + width*2];
     const decidedColor = currentColorArrangement[i];

     if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor)){
       columnOfThree.forEach((square)=>{
         currentColorArrangement[square] = ''
       })
     }
     
   }
  }

  //check column of 4
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width*2, i + width*3];
      const decidedColor = currentColorArrangement[i];
 
      if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor)){
        columnOfFour.forEach((square)=>{
          currentColorArrangement[square] = ''
        })
      }
      
    }
   }
  //check row of 3
  const checkRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
 
      if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor)){

        if(rowOfThree.includes(notValid)) continue;
        rowOfThree.forEach((square)=>{
          currentColorArrangement[square] = ''
        })
      }
      
    }
   }
  
  //check row of 4

  const checkRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i+3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
 
      if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor)){

        if(rowOfFour.includes(notValid)) continue;
        rowOfFour.forEach((square)=>{
          currentColorArrangement[square] = ''
        })
      }
      
    }
   }
  
//useEffect - board
 
useEffect(() => {
  createBoard()
}, [])

useEffect(()=>{
  const timer = setInterval(()=>{
    checkColumnOfFour();
    checkRowOfFour();
    checkColumnOfThree();
    checkRowOfThree();
    setCurrentColorArrengement([...currentColorArrangement])
  }, 100)
  return ()=> clearInterval(timer)
  
}, [checkColumnOfFour, checkColumnOfThree, checkRowOfThree, checkRowOfFour, currentColorArrangement])


  



  return (
    <div className="app">
      <div className='game'>
        {
          currentColorArrangement.map((candyColor, index)=>(
            <img
              key = {index}
              style={{backgroundColor: candyColor}}
              alt = {index}
              />
          ))
        }  

      </div>
    </div>
  );
}

export default App;
