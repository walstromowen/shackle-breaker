import {playSoundEffect, playMusic} from '../utility.js';

export default class TitleController{
    constructor(props, model, view){
        this.props = props;
        this.initialize();
    }
    initialize(){
        document.getElementById('title-start-button').addEventListener('click', ()=>{
            this.props.switchScreen('lobby-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            
        });
    }
}