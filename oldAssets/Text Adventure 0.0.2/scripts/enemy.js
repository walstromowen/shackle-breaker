import {controller as theController} from "./main.js";
import {player as thePlayer} from "./main.js";

export default class Enemy{
    constructor(){
        this.currentHP = 10;
        this.maxHP = 10;
        this.currentStamina = 5;
        this.maxStamina = 12
        this.currentMagic = 5;
        this.maxMagic = 6
        this.baseAttack = 2;
    }
    generateEnemy(){
        
    }
    attackPlayer(){
        thePlayer.currentHP = thePlayer.currentHP - this.baseAttack;
        console.log("Player HP: " + thePlayer.currentHP);
        this.currentStamina =- 10;
        theController.gameConsole.innerHTML += "<p> The skeleton attacks for 2 damage!</p>";
        theController.updatePlayerStats();
        theController.enablePlayerBattleControls();
        theController.scrollToBottom("game-console");
        if(theController.battleOverCheck() === true){
            theController.endBattle();
        }
    }
}