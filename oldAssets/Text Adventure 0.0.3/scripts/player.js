import Map from "./map.js";
import Enemy from "./enemy.js";
import {controller as theController} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";

export default class Player{
    constructor(){
        this.map = new Map();
        this.currentEnemy = 0; //0 for empty
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        this.currentHP = 10;
        this.maxHP = 10
        this.currentStamina = 10;
        this.maxStamina = 10;
        this.currentMagic = 1;
        this.maxMagic = 10
        this.baseAttack = 2;

    }
    moveNorth(){
        if(this.currentRoom.roomNorth !== ""){
            if(Math.floor(Math.random()*5) == 0){
                theController.toggleBattle();
                this.nextRoom = this.currentRoom.roomNorth;
                return; 
            }
            this.currentRoom.visited = true;
            this.currentRoom = this.currentRoom.roomNorth;
            theMiniMap.draw();
            theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
        }
        else{
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();
    }
    moveSouth(){
        if(this.currentRoom.roomSouth !== ""){
            this.currentRoom.visited = true;
            this.currentRoom = this.currentRoom.roomSouth;
            theMiniMap.draw();
            theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
        }
        else{
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();
    }
    moveEast(){
        if(this.currentRoom.roomEast !== ""){
            this.currentRoom.visited = true;
            this.currentRoom = this.currentRoom.roomEast;
            theMiniMap.draw();
            theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
        }
        else{
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();
    }
    moveWest(){
        if(this.currentRoom.roomWest !== ""){
            this.currentRoom.visited = true;
            this.currentRoom = this.currentRoom.roomWest;
            theMiniMap.draw();
            theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
        }
        else{
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();
    }
    attackEnemy(){
        this.currentEnemy.currentHP = this.currentEnemy.currentHP - this.baseAttack;
        this.currentStamina =- 10;
        theController.gameConsole.innerHTML += "<p> You attack the skeleton for 2 damage!</p>";
        theController.disablePlayerBattleControls();
        theController.updateEnemyStats();
        theController.updatePlayerStats();
        setTimeout(()=>{
            if(theController.battleOverCheck() === true){
                console.log('attack enemy from player battle overCheck returned true');
                theController.endBattle();
            }else{
                console.log("enemey HP: " + this.currentEnemy.currentHP);
                this.currentEnemy.attackPlayer();
            }
        }, 2000);
    }
    moveNextRoom(){
        this.currentRoom.visited = true;
        this.currentRoom = this.nextRoom;
        theMiniMap.draw();
        theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
        theController.scrollToBottom("game-console");
    }
    generateEnemy(){
        this.currentEnemy = new Enemy();
        theController.updateEnemyStats();
    }
}


