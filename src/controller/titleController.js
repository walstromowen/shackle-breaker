import {playSoundEffect, playMusic} from '../utility.js';

export default class TitleController{
    constructor(props, model, view){
        this.props = props;
        this.initialize();
    }
    initialize(){
        document.getElementById('title-start-button').addEventListener('click', ()=>{
            if(document.querySelector('body').requestFullscreen) {
                document.querySelector('body').requestFullscreen();
            }else if (document.querySelector('body').webkitRequestFullscreen) { /* Safari */
                document.querySelector('body').webkitRequestFullscreen();
            }else if (document.querySelector('body').msRequestFullscreen) { /* IE11 */
                document.querySelector('body').msRequestFullscreen();
            }
            this.props.switchScreen('lobby-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            
        });
    }
}