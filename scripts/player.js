import Map from "./map.js";
import {controller as theController} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";

export default class Player{
    constructor(){
        this.map = new Map();
        this.currentEnemy = ""; 
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        this.level = 1;
        this.currentHP = 10;
        this.maxHP = 10
        this.currentStamina = 10;
        this.maxStamina = 10;
        this.currentMagic = 1;
        this.maxMagic = 10
        this.armorLevel = 1;
        this.baseAttack = 2;

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
                this.currentEnemy = nextRoom.enemy
                theController.updateEnemyStats();
                theController.toggleBattle();
                return; 
            }
            this.currentRoom.visited = true;//
            this.currentRoom = nextRoom;
            theMiniMap.draw();
            if(this.currentRoom.isExit == true){
                this.level += 1;
                theController.gameConsole.innerHTML += `<p>You find an exit! Curent level: ${this.level}</p>`;
                this.generateNewMap();
            }else{
                theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
            }
        }
        else{
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();           
    }
    defeatEnemy(){
        this.currentRoom.visited = true;//
        this.currentRoom = this.nextRoom;//
        this.currentRoom.enemy = "";
        theMiniMap.draw();//
        theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";//
        theController.scrollToBottom("game-console");
    }
    attackEnemy(){
        if(this.baseAttack - this.currentEnemy.armorLevel > 0){
            this.currentEnemy.currentHP = this.currentEnemy.currentHP - this.baseAttack + this.currentEnemy.armorLevel;
            theController.gameConsole.innerHTML += `<p> You attack the ${this.currentEnemy.name} for ${this.baseAttack - this.currentEnemy.armorLevel} damage!</p>`;
        }
        this.currentStamina = this.currentStamina - 2;
        theController.disablePlayerBattleControls();
        theController.updateEnemyStats();
        theController.updatePlayerStats();
        setTimeout(()=>{
            if(theController.battleOverCheck() === true){
                console.log('attack enemy from player battle overCheck returned true');
                theController.endBattle();
            }else{
                console.log("enemey HP: " + this.currentEnemy.currentHP);
                this.currentEnemy.attackPlayer(this);
            }
        }, 2000);
    }
    generateNewMap(){
        this.map = new Map();
        this.currentEnemy = ""; 
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        theMiniMap.draw();
    }
}


