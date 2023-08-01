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
        this.baseAttack = 2;

    }
    moveNorth(){
        if(this.currentRoom.roomNorth !== ""){
            if(this.currentRoom.roomNorth.enemy !== ""){
                this.currentEnemy = this.currentRoom.roomNorth.enemy
                theController.updateEnemyStats();
                theController.toggleBattle();
                this.nextRoom = this.currentRoom.roomNorth;
                return; 
            }
            this.currentRoom.visited = true;
            this.currentRoom = this.currentRoom.roomNorth;
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
    moveSouth(){
        if(this.currentRoom.roomSouth !== ""){
            if(this.currentRoom.roomSouth.enemy !== ""){
                this.currentEnemy = this.currentRoom.roomSouth.enemy
                theController.updateEnemyStats();
                theController.toggleBattle();
                this.nextRoom = this.currentRoom.roomSouth;
                return; 
            }
            this.currentRoom.visited = true;
            this.currentRoom = this.currentRoom.roomSouth;
            theMiniMap.draw();
            if(this.currentRoom.isExit == true){
                this.level += 1;
                theController.gameConsole.innerHTML += `<p>You find an exit! Curent level: ${this.level}</p>`;
                this.generateNewMap();
            }else{
                theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
            }
        }else{
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();
    }
    moveEast(){
        if(this.currentRoom.roomEast !== ""){
            if(this.currentRoom.roomEast.enemy !== ""){
                this.currentEnemy = this.currentRoom.roomEast.enemy
                theController.updateEnemyStats();
                theController.toggleBattle();
                this.nextRoom = this.currentRoom.roomEast;
                return; 
            }
            this.currentRoom.visited = true;
            this.currentRoom = this.currentRoom.roomEast;
            theMiniMap.draw();
            if(this.currentRoom.isExit == true){
                this.level += 1;
                theController.gameConsole.innerHTML += `<p>You find an exit! Curent level: ${this.level}</p>`;
                this.generateNewMap();
            }else{
                theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
            }
        }else{
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();
    }
    moveWest(){
        if(this.currentRoom.roomWest !== ""){
            if(this.currentRoom.roomWest.enemy !== ""){
                this.currentEnemy = this.currentRoom.roomWest.enemy
                theController.updateEnemyStats();
                theController.toggleBattle();
                this.nextRoom = this.currentRoom.roomWest;
                return; 
            }
            this.currentRoom.visited = true;
            this.currentRoom = this.currentRoom.roomWest;
            theMiniMap.draw();
            if(this.currentRoom.isExit == true){
                this.level += 1;
                theController.gameConsole.innerHTML += `<p>You find an exit! Curent level: ${this.level}</p>`;
                this.generateNewMap();
            }else{
                theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
            }
        }else{
            theController.gameConsole.innerHTML += "<p> I can't go this way...</p>";
        }
        theController.updatePlayerStats();
    }
    attackEnemy(){
        this.currentEnemy.currentHP = this.currentEnemy.currentHP - this.baseAttack;
        this.currentStamina = this.currentStamina - 2;
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
                this.currentEnemy.attackPlayer(this);
            }
        }, 2000);
    }
    moveNextRoom(){
        this.currentRoom.visited = true;
        this.currentRoom = this.nextRoom;
        this.currentRoom.enemy = "";
        theMiniMap.draw();
        theController.gameConsole.innerHTML += "<p>" + this.currentRoom.description + "</p>";
        theController.scrollToBottom("game-console");
    }
    generateNewMap(){
        this.map = new Map();
        this.currentEnemy = ""; 
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        theMiniMap.draw();
    }
}


