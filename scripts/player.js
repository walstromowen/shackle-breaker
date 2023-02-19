import Map from "./map.js";
import {Dagger} from "./item.js";
import {controller as theController} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";

export default class Player{
    constructor(){
        this.map = new Map();
        this.name = "The Schackle Breaker";
        this.currentEnemy = ""; 
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        this.equippedArray = [new Dagger()];
        this.level = 1;
        this.currentXp = 0;
        this.maxHP = 10;
        this.currentHP = this.maxHP;
        this.maxStamina = 12
        this.currentStamina = this.maxStamina;
        this.maxMagic = 6;
        this.currentMagic = this.maxMagic;
        this.maxMagic = 10
        this.armorLevel = 1;
        this.baseAttack = 1;

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
                this.currentHP = this.maxHP;
                this.currentStamina = this.maxStamina;
                this.currentMagic = this.maxMagic;
                theController.updatePlayerStats();
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
        let damageOutput = this.baseAttack;
        if(this.equippedArray[0] != undefined){
            damageOutput = damageOutput + Math.floor(Math.random() * (this.equippedArray[0].damage[1] - this.equippedArray[0].damage[0] + 1)) + this.equippedArray[0].damage[0];
        }
        if(this.equippedArray[1] != undefined){
            damageOutput = damageOutput + Math.floor(Math.random() * (this.equippedArray[1].damage[1] - this.equippedArray[1].damage[0] + 1)) + this.equippedArray[1].damage[0];
        }
        damageOutput = damageOutput - this.currentEnemy.armorLevel;
        if(damageOutput > 0){
            this.currentEnemy.currentHP = this.currentEnemy.currentHP - damageOutput;
            theController.gameConsole.innerHTML += `<p> You attack the ${this.currentEnemy.name} for ${damageOutput} damage!</p>`;
        }
        else{
            theController.gameConsole.innerHTML += `<p>The ${this.currentEnemy.name} evades your attatck!</p>`;
        }
        this.currentStamina = this.currentStamina - 2;
        theController.disablePlayerBattleControls();
        theController.updateEnemyStats();
        theController.updatePlayerStats();
        setTimeout(()=>{
            if(theController.battleOverCheck() === true){
                theController.endBattle();
            }else{
                this.currentEnemy.chooseAttack(this);
            }
        }, 2000);
    }
    generateNewMap(){
        this.map = new Map();
        this.currentEnemy = ""; 
        this.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.nextRoom = this.currentRoom;
        theController.locationImage.src = this.map.mapEnviorment.imageSrc;
        theController.locationName.innerText = this.map.mapEnviorment.biome;
        theMiniMap.draw();
    }
}


