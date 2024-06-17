import {playSoundEffect, playMusic} from '../utility.js';

export default class CharacterSummaryController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.initialize();
    }
    initialize(){
        document.getElementById('character-summary-toggle-party-button').addEventListener('click', ()=>{
            this.props.switchScreen('party-screen');
            document.getElementById('sound-effect-player').src = './assets/audio/soundEffects/cinematic-boom-6872.mp3';
            document.getElementById('sound-effect-player').play();
        });
        document.getElementById('character-summary-screen').querySelectorAll('.stat-cell-hoverable').forEach((node)=>{
            node.addEventListener('mouseenter', (e)=>{
                const miniMenu =  node.querySelector('.stat-cell-hover-menu');
                miniMenu.style.display='flex';
            });
            node.addEventListener('mouseleave', (e)=>{
                const miniMenu =  node.querySelector('.stat-cell-hover-menu');
                miniMenu.style.display = 'none';
            });
        });
    }
    onSwitchScreen(){
        this.view.displayCharacterSummary(this.model.currentCharacter);
      
        //Switch Buttons
    }
}