import React, { Component } from 'react';

import FadeIn from '../transitions/fade-in';
import CharacterBox from './characterBox';
import ScoreDisplay from './scoredisplay';

const shuffleArray = arr => (
    arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]) 
);

const initialChars = [
    {
        name: 'Spongebob Squarepants',
        img: 'clicky-game/public/images/Spongebob_squarepants.png',
        clicked: false
    },
    {
        name: 'Patrick Star',
        img: 'clicky-game/public/images/Patrick_stock_art.png',
        clicked: false
    },
    {
        name: 'Squidward',
        img: 'clicky-game/public/images/Squidward_stock_art.png',
        clicked: false
    },
    {
        name: 'Mr. Krabbs',
        img: 'clicky-game/public/images/Krabs_artwork.png',
        clicked: false
    },
    {
        name: 'Gary',
        img: 'clicky-game/public/images/Gary_looking_up_stock_art.png',
        clicked: false
    },
    {
        name: 'Tom Fish',
        img: 'clicky-game/public/images/SpongeBob_SquarePants_-_Tom.jpg',
        clicked: false
    },
    {
        name: 'Sandy Cheeks',
        img: 'clicky-game/public/images/Sandy_stock_art.png',
        clicked: false
    },
    {
        name: 'Plankton',
        img: 'clicky-game/public/images/Plankton_stock_art.png',
        clicked: false
    },
    {
        name: 'Mrs. Puff',
        img: 'clicky-game/public/images/Mrs_Puff_stock_art.png',
        clicked: false
    },
    {
        name: 'Mermaidman',
        img: 'clicky-game/public/images/Mermaidman.png',
        clicked: false
    },
    {
        name: 'Larry The Lobster',
        img: 'clicky-game/public/images/Larry_the_Lobster.png',
        clicked: false
    },
    {
        name: 'Barnacle boy',
        img: 'clicky-game/public/images/BB3.png',
        clicked: false
    },
]

export default class Board extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: {
                score: 0 
            },
            characters: shuffleArray( initialChars )
        };
    }

    onCharacterClick = ( index ) =>{
        if( !this.state.characters[index].clicked ){
            this.setState({
                characters: shuffleArray( this.state.characters.map( (character, current) =>  {
                    return ( current === index ) ? { ...character, clicked:true } : character
                })),
                user: {
                    ...this.state.user,
                    score: this.state.user.score + 1
                }
            });
            //and shuffle
        } else {
            this.setState({
                characters: shuffleArray(this.state.characters.map( character => { return { ...character, clicked : false } })),
                user: {
                    ...this.state.user,
                    score: 0
                }
            });
            //and shuffle
        }
        
    }

    render(){
        return (
            <div className="Board">
                <FadeIn 
                    in={true}
                    duration={450}
                    length={'30px'}
                    direction={'bottom'}
                    delay={'1s'}>
                    <h4>Try to click on every Spongebob Character once. Once you click a character the grid will shuffle.<br/>Try not to click the same character twice or the game will start all over!</h4>
                </FadeIn>
                <FadeIn 
                    in={true}
                    duration={500}
                    direction={'bottom'}
                    delay={'1.5s'}>
                    <ScoreDisplay
                        score={this.state.user.score} />
                </FadeIn>
                <CharacterBox 
                    characters={this.state.characters} 
                    onCharacterClick={this.onCharacterClick} />
            </div>
        )
    }

}