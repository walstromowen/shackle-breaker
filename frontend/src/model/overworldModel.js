import Map from './misc/map.js';

export default class OverworldModel{
    constructor(props){
        this.props = props;
       
    }
    generateNewMap(){//want this to execute after lobby start happens
        if(this.props.calcHighestPartyLevel() > 14 && !this.props.getMilestones().includes('dolosDefeated')){
            this.props.setMap(new Map('Altus Capital'));
        }else{
            this.props.setMap(new Map());
        }
        this.props.setCurrentPartyPosition(this.props.getMap().getEntrancePosition());
        this.props.setNextPartyPosition(this.props.getCurrentPartyPosition());
    }
    movePartyUp(){//this could allow for one way direction (mab object traversable North, traversable South, ... etc)
        let map = this.props.getMap();
        if(this.props.getCurrentPartyPosition()[1]-1 >= 0){
            if(map.tileLayout[this.props.getCurrentPartyPosition()[1]-1][this.props.getCurrentPartyPosition()[0]].mapObject){
                if(map.tileLayout[this.props.getCurrentPartyPosition()[1]-1][this.props.getCurrentPartyPosition()[0]].mapObject.traversable){
                   this.props.setNextPartyPosition(map.tileLayout[this.props.getCurrentPartyPosition()[1]-1][this.props.getCurrentPartyPosition()[0]].position);
                }
            }else this.props.setNextPartyPosition(map.tileLayout[this.props.getCurrentPartyPosition()[1]-1][this.props.getCurrentPartyPosition()[0]].position);
        }   
    }
    movePartyDown(){
        let map = this.props.getMap();
        if(this.props.getCurrentPartyPosition()[1]+1 < map.tileLayout.length){
            if(map.tileLayout[this.props.getCurrentPartyPosition()[1]+1][this.props.getCurrentPartyPosition()[0]].mapObject){
                if(map.tileLayout[this.props.getCurrentPartyPosition()[1]+1][this.props.getCurrentPartyPosition()[0]].mapObject.traversable){
                   this.props.setNextPartyPosition(map.tileLayout[this.props.getCurrentPartyPosition()[1]+1][this.props.getCurrentPartyPosition()[0]].position);
                }
            }else this.props.setNextPartyPosition(map.tileLayout[this.props.getCurrentPartyPosition()[1]+1][this.props.getCurrentPartyPosition()[0]].position);
        }
    }
    movePartyLeft(){
        let map = this.props.getMap();
        if(this.props.getCurrentPartyPosition()[0]-1 >= 0){
            if(map.tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]-1].mapObject){
                if(map.tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]-1].mapObject.traversable){
                   this.props.setNextPartyPosition(map.tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]-1].position);
                }
            }else this.props.setNextPartyPosition(map.tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]-1].position);
        }
    }
    movePartyRight(){
        let map = this.props.getMap();
        if(this.props.getCurrentPartyPosition()[0]+1 < map.tileLayout[this.props.getCurrentPartyPosition()[1]].length){
            if(map.tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]+1].mapObject){
                if(map.tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]+1].mapObject.traversable){
                   this.props.setNextPartyPosition(map.tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]+1].position);
                }
            }else this.props.setNextPartyPosition(map.tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]+1].position);
        }
    }
    movePartyTile(){
        this.props.setPreviousPartyPosition(this.props.getCurrentPartyPosition());
        this.props.setCurrentPartyPosition(this.props.getNextPartyPosition());
        this.props.getMap().tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]].status = 'visited';
    }
    determineRoomEvent(){
      
        let biome = this.props.getMap().biome;
        let tileEntered = this.props.getMap().tileLayout[this.props.getCurrentPartyPosition()[1]][this.props.getCurrentPartyPosition()[0]]
        
        if(tileEntered.battle ){
            this.toggleBattle(tileEntered.battle);
            return; 
        }
        if(tileEntered.encounter){
            this.toggleEncounter(tileEntered.encounter);
            return;
        }
        if(tileEntered.mapObject){
            if(tileEntered.mapObject.name == 'exit'){
                this.toggleMapChange()
                return;
            }
        }
        if(tileEntered.mapObject == false){
            if(tileEntered.mapObject.name != 'blank'){
                this.decideRandomEvent(tileEntered, biome)
            }
        }
    }
    decideRandomEvent(tileEntered, biome){
        let chance = Math.floor(Math.random()*50);
        if(chance == 0){
            tileEntered.battle = biome.generateBattle(this.props.calcHighestPartyLevel(), this.props.getDifficulty());
            this.toggleBattle(tileEntered.battle);
            return;
        }
        if(chance == 1){
            tileEntered.encounter = biome.generateEncounter(this.props.recruitWanderingCompanion);
            this.toggleEncounter(tileEntered.encounter);
            return;
        }
    }
    toggleBattle(battle){
        this.props.setBattle(battle);
        this.props.setScreen('battle-screen');
        
    }
    toggleEncounter(encounter){
        this.props.setEncounter(encounter);
        this.props.setScreen('encounter-screen');
        
    }
    toggleMapChange(){
        this.props.setScreen('map-change-screen');
        this.props.setSituation('');
    }
    changeMap(){
        this.generateNewMap();
        this.props.setCurrentPartyPosition(this.props.getMap().getEntrancePosition());
    }
    //TODO
    determineCurrentCharater(){
        this.currentCharacter = getRandomArrayElement(this.props.getParty());
        if(this.currentCharacter.currentHP <= 0){
            this.determineCurrentCharater();
        }
    }
    
}