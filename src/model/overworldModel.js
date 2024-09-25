import Map from './misc/map.js';
import Battle from './misc/battle.js';

export default class OverworldModel{
    constructor(props){
        this.props = props;
        this.currentPartyPosition = [0,0];//in Tiles
        this.previousPartyPosition = [0,0];//in Tiles
        this.initialize();
    }
    initialize(){//want this to execute after lobby start happens
        this.props.setMap(new Map());
        this.currentPartyPosition = this.props.getMap().getEntrancePosition();
    }
    movePartyUp(){
        let map = this.props.getMap();
        if(this.currentPartyPosition[1]-1 >= 0){
            if(map.tileLayout[this.currentPartyPosition[1]-1][this.currentPartyPosition[0]].type != 'wall'){
                this.movePartyTile(map.tileLayout[this.currentPartyPosition[1]-1][this.currentPartyPosition[0]]);
            }
        }   
    }
    movePartyDown(){
        let map = this.props.getMap();
        if(this.currentPartyPosition[1]+1 < map.tileLayout.length){
            if(map.tileLayout[this.currentPartyPosition[1]+1][this.currentPartyPosition[0]].type != 'wall'){
                this.movePartyTile(map.tileLayout[this.currentPartyPosition[1]+1][this.currentPartyPosition[0]]);
            }
        }
    }
    movePartyLeft(){
        let map = this.props.getMap();
        if(this.currentPartyPosition[0]-1 >= 0){
            if(map.tileLayout[this.currentPartyPosition[1]][this.currentPartyPosition[0]-1].type != 'wall'){
                this.movePartyTile(map.tileLayout[this.currentPartyPosition[1]][this.currentPartyPosition[0]-1])
            }
        }
    }
    movePartyRight(){
        let map = this.props.getMap();
        if(this.currentPartyPosition[0]+1 < map.tileLayout[this.currentPartyPosition[1]].length){
            if(map.tileLayout[this.currentPartyPosition[1]][this.currentPartyPosition[0]+1].type != 'wall'){
                this.movePartyTile(map.tileLayout[this.currentPartyPosition[1]][this.currentPartyPosition[0]+1])
            }
        }
    }
    movePartyTile(nextRoom){
        if(nextRoom.type != 'wall'){
            this.previousPartyPosition = this.currentPartyPosition;
            this.currentPartyPosition = nextRoom.position;
            if(nextRoom.battle != ''){
                this.toggleBattle(nextRoom.battle);
                return; 
            }
            if(Math.floor(Math.random()*10) == 0){
                this.nextPartyPosition = nextRoom.position;
                let biome = this.props.getMap().biome
                nextRoom.battle = new Battle(biome.generateEnemies(this.props.calcAveragePartyLevel(), 3)); //Math.floor(Math.random()*4)
                this.toggleBattle(nextRoom.battle);
                return;
            }
        }
    }
    toggleBattle(battle){
        this.props.setBattle(battle);
        this.props.setScreen('battle-screen');
        
    }
    
    
}