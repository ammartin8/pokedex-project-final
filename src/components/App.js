import React, { Component } from "react";
export default class App extends Component {
 state = {
   offset: 0,
   limit: 12,
   pokemon: {
     results: []
   },
   pokeDetail: {
     name: "",
     sprites: {},
     abilities: []
   },
   isCardOpen: false
 };
 componentDidMount() {
   this.fetchPokemon();
 }
 componentDidUpdate(prevProps, prevState) {
   if (prevState.offset !== this.state.offset) {
     this.fetchPokemon();
   }
 }
 fetchPokemon = () => {
   fetch(
     `https://pokeapi.co/api/v2/pokemon/?offset=${this.state.offset}&limit=12`
   )
     .then(res => res.json())
     .then(json => {
       console.log(json);
       this.setState({ pokemon: json });
     });
 };
 update = num => {
   this.setState(prevState => {
     return { offset: prevState.offset + num };
   });
 };
 
 // Todo:
 /* 1. create function that open new div on click of pokecard
 2. fetch data on specific pokemon based on user input (click of card)
 3. Display data on new div
 4. create close button and close new div upon click of close button*/
 fetchPokeDetails = (name) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
     .then(res => res.json())
     .then(json => {
       console.log(json);
       this.setState({ pokeDetail: json });
       this.setState({isCardOpen: true})
     });

 };
 
 getPokeDetails = (name) => {
   this.fetchPokeDetails(name);
 };

 handleClose = () => {
   this.setState({isCardOpen: false});
 };
 
 render() {
   return (
     <div className="App">
       <div className="header">
         <img
           className="header-logo"
           src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pokedex.png"
           alt="pokedex logo"
         />
         <h1>Pok&eacute;dex</h1>
       </div>
       <div id="main-content">
        {this.state.isCardOpen ? (
        <div className="poke-card-details info">
          <img className="spriteImage" src={this.state.pokeDetail.sprites.front_default} alt="" />
          <h2 className="pokeName">{this.state.pokeDetail.name}</h2>
          <h3>Abilities:{this.state.pokeDetail.abilities.map(abilityObj => (
            <li className="pokeAbility">{abilityObj.ability.name}</li>
              )
            )}
          </h3>
          <button className="detailBtn" onClick={() => this.handleClose()}>close</button>
        </div>
        ) : (
          <>
         <ul>
           {this.state.pokemon.results.map(poke => (
             <li
               className="poke-card"
               key={poke.name}
               onClick={() => this.getPokeDetails(poke.name)}
             >
               <h3>{poke.name}</h3>
               <button className="detailBtn">Details</button>
             </li>
           ))}
         </ul>
          
         <button
           id="previous"
           className="btn"
           onClick={() => this.update(-12)}
         >
           Previous
         </button>
         <button id="next" className="btn" onClick={() => this.update(12)}>
           Next
         </button>
         </>
        )
           }
       </div>
       <img
         id="pikachu"
         className="hvr-hang"
         src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pikachu.png"
         alt="Pikachu"
       />
     </div>
   );
 }
}
