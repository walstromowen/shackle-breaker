import {playSoundEffect, playMusic} from '../utility.js';

export default class OverworldController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;

        this.keysDown = {
            w: false,
            s: false,
            a: false,
            d: false,
            shift: false,
        }

        this.loopID;
        this.isLooping = true;
        this.fps = 0;
        this.fpsInterval = 0;
        this.startTime
        this.now;
        this.then;
        this.elapsed;

        this.playerMoveDelay = 200;
        this.playerTimeMoved = 0;
        this.isMoving = false;
        this.count = 0;
       
        this.initialize();
    }
    initialize(){
        window.addEventListener('resize', ()=>{
            this.view.resize();
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
            this.model.props.setSituation('title-screen')
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        document.getElementById('overworld-escape-menu-save-button').addEventListener('click', ()=>{
            document.getElementById('overworld-escape-menu').style.display='none';
            this.props.switchScreen('save-list-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });


        window.addEventListener("keydown", (e) => {
            if(this.model.props.getScreen() == 'overworld-screen' && this.isMoving == false){
                this.keysDown[e.key] = true;
            }
        });
        window.addEventListener("keyup", (e) =>{
            this.keysDown[e.key] = false; 
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
    onSwitchScreen() {
        if (this.model.props.getSituation() == '') {
            this.view.updateMapTitle(this.model.props.getMap().biome.name);
            this.view.revealMapTitle(); 
        }

        this.view.preloadImages(this.model.props.getMap()).then(() => {
            this.model.props.setSituation('overworld');
            this.isLooping = true;
            this.model.props.setNextPartyPosition(this.model.props.getCurrentPartyPosition());
            this.view.revealOverworldUi();
            this.startOverworldLoop(60);
        });
    }
    /*
    onSwitchScreen() {
        if (this.model.props.getSituation() == '') {
            this.triggerMapTitleSequence(this.model.props.getMap().biome.name);
        }
        this.view.preloadImages(this.model.props.getMap()).then(() => {
            this.model.props.setSituation('overworld');
            this.isLooping = true;
            this.model.props.setNextPartyPosition(this.model.props.getCurrentPartyPosition());
            this.view.revealOverworldUi();
            this.startOverworldLoop(60);
        });
    }
        */
    startOverworldLoop(desiredFPS){
        this.fpsInterval = 1000 / desiredFPS;
        this.then = Date.now();
        this.startTime = this.then;
        this.isMoving = false;
        this.loopID = requestAnimationFrame(this.loopOverworld.bind(this));
    }
    loopOverworld(){     
        this.now = Date.now();
        this.elapsed = this.now - this.then;//time between now and last then update (see if statement)
        if(this.isMoving == false){
            this.playerTimeMoved = this.now;
            if(this.keysDown['w']){
                this.model.movePartyUp();//just updates next party Position
            }
            if(this.keysDown['s']){
                this.model.movePartyDown();
            }
            if(this.keysDown['a']){
               this.model.movePartyLeft();
            }
            if(this.keysDown['d']){
                this.model.movePartyRight();
            }
        }
        if(this.elapsed > this.fpsInterval){
            this.processMovement();
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.view.draw(this.model.props.getMap(), this.model.props.getCurrentPartyPosition());
            //console.log((Math.floor((this.now - this.startTime)/1000)))
        } 
        if(this.isLooping){
            requestAnimationFrame(this.loopOverworld.bind(this));
        }else{
            cancelAnimationFrame(this.loopID)
        } 
    }
    processMovement(){
        if(this.model.props.getCurrentPartyPosition()[0] == this.model.props.getNextPartyPosition()[0] && this.model.props.getCurrentPartyPosition()[1] == this.model.props.getNextPartyPosition()[1]){
            return false;
        }
        if(this.now - this.playerTimeMoved <= this.playerMoveDelay){
            this.isMoving = true;
            this.view.processMovement(this.model.props.getCurrentPartyPosition(), this.model.props.getNextPartyPosition(), this.fpsInterval, this.playerMoveDelay)
            this.count++;
        }else{
            this.view.viewport.movementOffset = [0,0];
           
            this.isMoving = false;
            this.model.movePartyTile()
            this.model.determineRoomEvent();
            this.afterMove();
        }
    }
    afterMove(){
        if(this.model.props.getScreen() == 'battle-screen'){
            this.isLooping = false;
            playMusic(this.model.props.getBattle().battleMusicSrc);
            this.view.hideOverWorldUi();
            this.view.playBattleTransition().then(()=>{
                this.props.switchScreen('battle-screen');
            });
            return;
        }
        if(this.model.props.getScreen() == 'encounter-screen'){
            this.isLooping = false;
            playMusic(this.model.props.getEncounter().currentStage.musicSrc);
            this.view.hideOverWorldUi();
            this.view.playBattleTransition().then(()=>{
                this.props.switchScreen('encounter-screen');
            });
            return;
        }
        if(this.model.props.getScreen() == 'map-change-screen'){
            this.isLooping = false;
            this.view.hideOverWorldUi();
            this.view.playBattleTransition().then(()=>{
                this.props.switchScreen('map-change-screen');
                this.model.changeMap();
                document.getElementById('music-player').pause();
            });
            return;
        }
    }
    triggerMapTitleSequence(biomeName, displayDuration = 3000) {
        this.view.updateMapTitle(biomeName);
        this.view.showMapTitle();

        const mapTileEl = this.view.mapTileContainer;

        const style = window.getComputedStyle(mapTileEl);
        const animationDuration = parseFloat(style.animationDuration) * 1000 || 1000;

        const handleAnimationEnd = () => {
            mapTileEl.classList.remove('animate-map-title');
            mapTileEl.removeEventListener('animationend', handleAnimationEnd);
        };
        mapTileEl.addEventListener('animationend', handleAnimationEnd);

        setTimeout(() => {
            this.view.hideMapTitle();
        }, displayDuration + animationDuration);
    }
}



