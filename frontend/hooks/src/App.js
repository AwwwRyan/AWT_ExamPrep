import React from 'react';
import './App.css';
import ClassComponent from './components/ClassComponent';
import FunctionalComponent from './components/FunctionalComponent';

function App() {
    return ( 
        <div className = "App" >
        
        <header className = "App-header" >
        <h1 > React Components Demo </h1> 
        <div className = "components-container" >
        < ClassComponent / >
        <FunctionalComponent / >
        </div> 
        </header > 
        </div>
    );
}

export default App;