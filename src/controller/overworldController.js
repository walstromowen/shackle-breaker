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
        document.getElementById('overworld-escape-menu-fullscreen-button').addEventListener('click', ()=>{
            if(document.querySelector('body').requestFullscreen) {
                document.querySelector('body').requestFullscreen();
            }else if (document.querySelector('body').webkitRequestFullscreen) { /* Safari */
                document.querySelector('body').webkitRequestFullscreen();
            }else if (document.querySelector('body').msRequestFullscreen) { /* IE11 */
                document.querySelector('body').msRequestFullscreen();
            }
        });
        document.getElementById('overworld-escape-menu-exit-button').addEventListener('click', ()=>{
            document.getElementById('overworld-escape-menu').style.display='none';
            this.props.switchScreen('title-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            document.getElementById('music-player').pause();
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
                this.afterMove();
            }
        });
        document.getElementById('mobile-up-button').addEventListener('click', ()=>{
            if(this.model.props.getScreen() == 'overworld-screen'){
                this.model.movePartyUp();
                this.afterMove();
            }
        });
        document.getElementById('mobile-down-button').addEventListener('click', ()=>{
            if(this.model.props.getScreen() == 'overworld-screen'){
                this.model.movePartyDown();
                this.afterMove();
            }
        });
        document.getElementById('mobile-left-button').addEventListener('click', ()=>{
            if(this.model.props.getScreen() == 'overworld-screen'){
                this.model.movePartyLeft();
                this.afterMove();
            }
        });
        document.getElementById('mobile-right-button').addEventListener('click', ()=>{
            if(this.model.props.getScreen() == 'overworld-screen'){
                this.model.movePartyRight();
                this.afterMove();
            }
        });
    }
    onSwitchScreen(){
        this.view.draw(this.model.props.getMap(), this.model.currentPartyPosition);
        
     
    }
    afterMove(){
        this.view.draw(this.model.props.getMap(), this.model.currentPartyPosition);
        if(this.model.props.getScreen() == 'battle-screen'){
            playMusic(this.model.props.getMap().biome.battleMusicSrc);
            //document.getElementById('music-player').pause();//temp
            this.view.hideOverWorldUi();
            this.view.playBattleTransition().then(()=>{
                
                this.props.switchScreen('battle-screen');
            });
            return;
        }
        if(this.model.props.getScreen() == 'encounter-screen'){
            this.view.hideOverWorldUi();
            this.view.playBattleTransition().then(()=>{
                
                this.props.switchScreen('encounter-screen');
            });
            return;
        }
    }
}





