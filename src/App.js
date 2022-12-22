import './App.css';
import React, { useState } from 'react';

function App() {

  const [displayCount, setDisplayCount] = useState("0");
  const [displayResult, setDisplayResult] = useState(0);
  const [displayUpdate, setDisplayUpdate] = useState(false);


  const click = (digit)=>{
    if(digit==="AC"){
      setDisplayCount("0");
      setDisplayResult(0);
      setDisplayUpdate(false);
    }
    else if(digit==="="){
      op(displayCount);
    }
    else if (/^0$/.test(displayCount) && /\d/.test(digit)) {
      //Para evitar doble ceros o mas ceros al inicio (ejem: 0045)
      setDisplayCount(digit);
    }
    else if (/^0$/.test(displayCount) && /\./.test(digit)){
      //Para concatenar un 0 inical con \.
      setDisplayCount(displayCount.concat(digit));
    }
    else if (/^-?\d+$|^-?\d+\.\d+$/.test(displayCount) && /\d/.test(digit) && displayUpdate===true){
      //Para cuando se obtiene un resultado y se escribe inmediatamente un numero nuevo
      setDisplayCount(digit);
      setDisplayResult(0);
      setDisplayUpdate(false);
    }
    else if (/^\d+\.\d+$|[+*/-]\d+\.\d+$|[+*/-]$|\.$/.test(displayCount) && /\./.test(digit)){
      //Filtrado de \. (para no repetir . en la misma cantidad ejem: 23.23.23 ó 23..)
    }
    else if (  /-$|([+*/]-)$/.test(displayCount) && /-/.test(digit)  ){
      //Filtrado de Doble sigo negativo (--) Ó operador más signo negativo ([+*/]-) 
    }
    else if ( /[+*/-]$|([+*/]-)$|(-{2,})$|\.$/.test(displayCount)&& /[+*/]/.test(digit) ){
    //Dos o más operadores ( el nuevo digito es [+*/] ) y de punto más operador (\.[+*/])
      const replace = displayCount.replace(/[+*/-]$|([+*/]-)$|(-{2,})$|\.$/,digit);
      setDisplayCount(replace);
    }
    else if((displayCount.length >= 13 && /\d$/.test(displayCount) && /\d/.test(digit))||(displayCount.length === 17 && /[+*/-]|\./.test(digit))||(displayCount.length >= 18 && /\d|[+*/-]/.test(digit))){
      //Para cuando se exceda el numero de digitos permitidos
    }
    else{
      //Resto de operaciones
      setDisplayCount(displayCount.concat(digit));
    }
  }

  const op = (count) =>{
    const result = eval(count);
    setDisplayCount(result.toString());
    setDisplayResult(result);
    setDisplayUpdate(true);
  } 

  const numbers = [["seven","7"],["eight","8"],["nine","9"],["four","4"],["five","5"],["six","6"],["one","1"],["two","2"],["three","3"],["zero","0"],["equals","="],["add","+"],["subtract","-"],["multiply","*"],["divide","/"],["decimal","."],["clear","AC"]];
  const numberButtons = numbers.map(idElement=><button className='buttons' id={idElement[0]} onClick={()=>click(idElement[1])}>{idElement[1]}</button>);
  return (
    <div>
    <div className="main-div">
      <div className='display-div' id="display">{displayCount}</div>
      <div className='display-div' id="display-result">Result={displayResult}</div>
      <div className='buttons-div'>
      {numberButtons}
      </div>
    </div>
    <p id='p1'>Javascript-Calculator by<span id='p2'> Manuel</span></p>
    
    </div>
  );
}

export default App;
