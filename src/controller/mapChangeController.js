import {playSoundEffect, playMusic} from '../utility.js';

export default class MapChangeController{
    constructor(props, model, view){
        this.props = props;
        this.initialize();
    }
    initialize(){
        document.getElementById('map-change-continue-button').addEventListener('click', ()=>{
            this.props.switchScreen('overworld-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            playMusic(this.props.getOverworldController().model.props.getMap().biome.backgroundMusicSrc);
            document.querySelector('body').classList.remove('battle-wipe');
            this.props.getOverworldController().view.revealOverworldUi();
        });
    }
}