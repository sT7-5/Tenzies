import { useState } from 'react'
import './index.css'
import Die from './Die'
import React from 'react';
import { nanoid } from 'nanoid';

export default function App(){

  //STATES
  const [dice, setDice] = React.useState(allNewDie);//keeps track of all the dice
  const [tenzies, changeTenzies] = React.useState(false);//keeps track of if user has won or not


  React.useEffect(() =>{
    let allHeld = true;
    let allSameValue = true;
    let initialValue = dice[0].value;

    //checking if all dice are held and same value
    for(let i = 0; i < 10; i++){
      if(!dice[i].isHeld){
        allHeld = false;
      }
      if(dice[i].value != initialValue){
        allSameValue = false;
      }
    }
    if(allHeld && allSameValue){
      changeTenzies(true);
      console.log("TENZIESS")
    }else{
      changeTenzies(false);
    }

  }, [dice])

  function allNewDie(){
    const arr= [];
    for(let i = 0; i < 10; i++){
      let randomNum = Math.floor(Math.random() * 6 + 1)
      arr[i] = {
        value: randomNum,
        isHeld: false,
        id: nanoid()
      };
    }
    return arr;
  }

  function getRandomDie(){
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice =>{
        return oldDice.map(die =>{
          return die.isHeld ? die : getRandomDie()
        })
      })
    } else{
      setDice(allNewDie);
      changeTenzies(false);
    }

  }

  function holdDice(id){
    setDice(oldDice =>{
      return oldDice.map(die =>{
        return die.id===id? {...die, isHeld:!die.isHeld} : die
    })
    
   })
  }


  const allTheDice = dice.map(die => 
  <Die 
    key={die.id} 
    value={die.value} 
    isHeld={die.isHeld} 
    id={die.id} 
    holdDice={() => holdDice(die.id)} 
    />
  )

  allNewDie();
  return(
    <main>
        
      <h1>Tenzies</h1>
      <p>Keep rolling until all the dice are the same number. Click on a dice to freeze its value</p>
      
      <div className='diceContainer'>
        {allTheDice}
      </div>
      <button className='rollButton' onClick={rollDice} type="button">{tenzies ? 'YOU WON' : 'Roll'}</button>


    </main>
  )
}
