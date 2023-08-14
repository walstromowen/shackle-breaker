import {Recover, Punch, Retreat} from "./abilities.js";
import Map from "./map.js";

export default class Player{
    constructor(characterCreationArray){
        this.name = characterCreationArray[0];
        this.apperance = characterCreationArray[1]
        this.origin = characterCreationArray[2]
        this.equippedArray = ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"];
        this.inventory = characterCreationArray[3];
        this.abilityArray = [new Punch, new Recover, new Retreat];
        this.level = 0;
        this.currentXP = 0;
        this.maxHP = characterCreationArray[4];
        this.currentHP = this.maxHP;
        this.maxStamina = characterCreationArray[5]
        this.currentStamina = this.maxStamina;
        this.maxMagic = characterCreationArray[6];
        this.currentMagic = this.maxMagic;
        this.baseBluntAttack = 1;
        this.currentBluntAttack = this.baseBluntAttack;
        this.basePierceAttack = 1;
        this.currentPierceAttack = this.basePierceAttack;
        this.baseArcaneAttack = 1;
        this.currentArcaneAttack = this.baseArcaneAttack;
        this.baseElementalAttack = 1;
        this.currentElementalAttack = this.baseElementalAttack;
        this.baseBluntDefense = 1;
        this.currentBluntDefense = this.baseBluntDefense;
        this.basePierceDefense = 1;
        this.currentPierceDefense = this.basePierceDefense;
        this.baseArcaneDefense = 1;
        this.currentArcaneDefense = this.baseArcaneDefense;
        this.baseElementalDefense = 1;
        this.currentElementalDefense = this.baseElementalDefense;
        this.baseSpeed = 1;
        this.currentSpeed = this.baseSpeed;
        this.statusArray = [];//new Poisoned(this)
        this.isInBattle = false;
        this.canMoveRoom = true;
        this.map = new Map(this.level);
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
    }
    moveNorth(){
        this.moveRoom(this.currentRoom.roomNorth);
    }
    moveEast(){
        this.moveRoom(this.currentRoom.roomEast);
    }
    moveSouth(){
        this.moveRoom(this.currentRoom.roomSouth);
    }
    moveWest(){
        this.moveRoom(this.currentRoom.roomWest);
    }
    moveRoom(nextRoom){
        if(nextRoom !== ""){
            if(nextRoom.enemy !== ""){
                this.nextRoom = nextRoom;
                theController.toggleBattle(nextRoom.enemy);
                theController.updateEnemyStats();
                return; 
            }
            this.currentRoom.visited = true;//
            this.currentRoom = nextRoom;
            theMiniMap.draw();
            if(this.currentRoom.isExit == true){
                this.levelUp();
                theController.gameConsole.innerHTML += `<p>You find an exit!</p>`;
                this.generateNewMap();
            }else{
                //theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
            }
        }
        else{
            theController.gameConsole.innerHTML += "<p>Cannot go this way.</p>";
        }
        theController.updatePlayerStats();           
    }
}