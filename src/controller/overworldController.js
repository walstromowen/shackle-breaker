import {playSoundEffect, playMusic} from '../utility.js';

export default class OverworldController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.initialize();
    }
    initialize(){
        window.addEventListener('resize', ()=>{
            this.view.resize();
            this.view.draw(this.model.props.getMap(), this.model.currentPartyPosition);
        });
       
        document.getElementById('overworld-toggle-party-screen-button').addEventListener('click', ()=>{
            this.props.switchScreen('party-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        document.getElementById('overworld-toggle-escape-menu-button').addEventListener('click', ()=>{
            document.getElementById('overworld-escape-menu').style.display='flex';
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        document.getElementById('overworld-escape-menu-resume-button').addEventListener('click', ()=>{
            document.getElementById('overworld-escape-menu').style.display='none';
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        document.getElementById('overworld-escape-menu-exit-button').addEventListener('click', ()=>{
            document.getElementById('overworld-escape-menu').style.display='none';
            this.props.switchScreen('title-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        window.addEventListener("keydown", (e) => {
            if(this.model.props.getScreen() == 'overworld-screen'){
                switch(e.key){
                    case 'w':
                        this.model.movePartyUp();
                        break;
                    case 's':
                        this.model.movePartyDown();
                        break;
                    case 'a':
                        this.model.movePartyLeft();
                        break;
                    case 'd':
                        this.model.movePartyRight();
                        break;
                }
                this.view.draw(this.model.props.getMap(), this.model.currentPartyPosition);
                if(this.model.props.getScreen() == 'battle-screen'){
                    playMusic(this.model.props.getMap().biome.battleMusicSrc);
                    //document.getElementById('music-player').pause();//temp
                    this.view.playBattleTransisiton().then(()=>{
                        this.props.switchScreen('battle-screen');
                    });
                }
            }
        });
    }
    onSwitchScreen(){
        this.view.draw(this.model.props.getMap(), this.model.currentPartyPosition);
        playMusic(this.model.props.getMap().biome.backgroundMusicSrc);
    }
}



