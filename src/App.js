
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header'

import './App.css';
import Landing from './components/Landing';
import LevelOne from './components/LevelOne'



const App = () => {

 


  return (
    <div className="app">
      {/* <Game /> */}
      <Header/>
      <div className='game-section'>
        <div className='game-container'>
          <Routes>
            <Route path ="/" element={<Landing/>}/>
            <Route path = "/play" element={<LevelOne/>}/>
          </Routes>
        </div>
      </div>
      {/* <Footer/> */}

      
      
    </div>
  );
}

export default App;
