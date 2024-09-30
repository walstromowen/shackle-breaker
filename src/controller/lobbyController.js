import {playSoundEffect, playMusic} from '../utility.js';

export default class LobbyController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.initialize();
    }
    initialize(){
        document.getElementById('lobby-back-button').addEventListener('click', ()=>{
            this.props.switchScreen('title-screen');
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            document.getElementById('music-player').pause();
        });
        document.getElementById('lobby-start-button').addEventListener('click', ()=>{
            this.model.updateCompanion();
            this.model.updateName();
            this.props.switchScreen('overworld-screen');
            playMusic(this.model.props.getMap().biome.backgroundMusicSrc);
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        document.getElementById('lobby-screen').querySelectorAll('.stat-cell-hoverable').forEach((node)=>{
            node.addEventListener('mouseenter', ()=>{
                const miniMenu = node.querySelector('.stat-cell-hover-menu');
                miniMenu.style.display='flex';
            });
            node.addEventListener('mouseleave', ()=>{
                const miniMenu = node.querySelector('.stat-cell-hover-menu');
                miniMenu.style.display = 'none';
            });
        });
        document.getElementById('lobby-apperance-selection').addEventListener('change', ()=>{
            this.model.updateApperance();
            this.view.updateApperance(this.model.props.getParty()[0].apperance);
        });
        document.getElementById('lobby-background-selection').addEventListener('change', ()=>{
            this.model.updateBackground();
            this.view.updateInventory(this.model.props.getParty()[0].getEquipment(Object.keys(this.model.props.getParty()[0].equipment)), this.model.props.getInventory());
            this.view.updateAttributes(this.model.props.getParty()[0].getAttributes());
            this.view.updateStats(this.model.props.getParty()[0].getCurrentStats());
            this.view.updateGold(this.model.props.getGold());
        });
        document.getElementById('lobby-keepsake-selection').addEventListener('change', ()=>{
            this.model.updateKeepsake();
            this.view.updateInventory(this.model.props.getParty()[0].getEquipment(Object.keys(this.model.props.getParty()[0].equipment)), this.model.props.getInventory());
        });
        document.getElementById('lobby-difficulty-selection').addEventListener('change', ()=>{
            this.model.updateDifficulty();
        });
    }
    onSwitchScreen(){
        this.view.updateInventory(this.model.props.getParty()[0].getEquipment(Object.keys(this.model.props.getParty()[0].equipment)), this.model.props.getInventory());
        this.view.updateAttributes(this.model.props.getParty()[0].getAttributes());
        this.view.updateStats(this.model.props.getParty()[0].getCurrentStats());
        this.view.updateGold(this.model.props.getGold());
        playMusic('./assets/audio/musicTracks/Alex-Productions - Epic Cinematic Adventure Vlog _ Eglair.mp3');
    }
}