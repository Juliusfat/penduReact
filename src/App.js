import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Letter from './Letter';
import WordLetter from './WordLetter';

const LETTER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', ' Y', 'Z']

const WORDS = ['AMBULANCE', 'POLICE', 'IMMEUBLE', 'REACT', 'ORANGE', 'BONJOUR', 'INFIRMERIE', 'DINOSAURE', 'AVION', 'MONTAGNE', 'SILOUETTE']

class App extends Component {

  state = {
    letters: LETTER,
    matchedIndex: [],
    letterClicked: [],
    word: this.generateWord(),
    essais: 0,
  }


  resetGame = event => {
   this.setState ({
    letters: LETTER,
    matchedIndex: [],
    letterClicked: [],
    word: this.generateWord(),
    essais: 0,
   });
  }

  generateWord() {
    const indice = Math.ceil(Math.random() * (WORDS.length - 1));
    const wordTab = [];
    const devine = [];
    const wordRandom = WORDS[indice];
    for (let i = 0; i < wordRandom.length; i++) {
      wordTab.push(wordRandom[i]);
    }
    return wordTab;
  }

  letterGetClicked = letter => {
    const { letterClicked } = this.state
    const position = letterClicked.indexOf(letter);
    let classValeur = "visible";
    if (position !== -1) {
      classValeur = "hidden"
    }
    return classValeur;
  }

  getFeedbackForWordLetter = index => {
    const { matchedIndex } = this.state;

    for (var i = 0; i < matchedIndex.length; i++) {
      if (matchedIndex[i] === index) {
        return 'visible';
      }
    }

    return 'hidden';
  };

  updateMatchedLetters = letter => {
    const { word, matchedIndex } = this.state;

    let indexOfLetter = word.indexOf(letter);
    let indexToAdd = [indexOfLetter];

    while (indexOfLetter !== -1) {
      indexOfLetter = word.indexOf(letter, indexOfLetter + 1);
      if (indexOfLetter !== -1) {
        indexToAdd.push(indexOfLetter);
      }
    }

    this.setState({ matchedIndex: [...matchedIndex, ...indexToAdd] });
  };

  LetterClick = letter => {
    const { word } = this.state;
    const { letterClicked } = this.state;
    console.log(word);
    console.log(letterClicked);

    if (word.indexOf(letter) !== -1) {
      this.updateMatchedLetters(letter);
    }

    letterClicked.push(letter);
    this.setState(
      {
        letterClicked: letterClicked,
        essais: this.state.essais + 1
      }
    )
  }

  render() {
    const { word, letters, matchedIndex } = this.state;
    const won = word.length === matchedIndex.length;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Le jeu du Pendu</h1>
        </header>
        <div className="container-fluid">
          <div className="word">
            {word.map((letter, index) => (
              <WordLetter
                letter={letter}
                index={index}
                key={index}
                feedback={this.getFeedbackForWordLetter(index)}
              />
            ))}
          </div>
          {!won ? 
            <div className="penduLetter">
            {letters.map((letter, index) => (
              <Letter
                index={index}
                letter={letter}
                feedback={this.letterGetClicked(letter)}
                key={index}
                onClick={this.LetterClick}
              />
            ))
            }
            <div className="essais">Nombre d'essais : {this.state.essais}</div>
          </div>
            
          : 
          <div>
              <div className="essais">
                Vous avez gagné en {this.state.essais} essais!!!!!
        </div>
              <div>
                <button type="button" className="btn btn-primary" onClick={this.resetGame.bind(this)} >une autre partie</button>
              </div>
            </div>

          }
        </div>
  
      </div>
        );
      }
    }
    
    export default App;
