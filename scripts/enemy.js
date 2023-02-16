import {controller as theController} from "./main.js";

export default class Enemy{
    constructor(){
        this.name = "skeleton"
        this.currentHP = 4;
        this.maxHP = 10;
        this.currentStamina = 5;
        this.maxStamina = 12
        this.currentMagic = 5;
        this.maxMagic = 6
        this.baseAttack = 2;
    }
    attackPlayer(target){
        target.currentHP = target.currentHP - this.baseAttack;
        console.log("Player HP: " + target.currentHP);
        this.currentStamina = this.currentStamina - 2;
        theController.gameConsole.innerHTML += "<p> The skeleton attacks for 2 damage!</p>";
        theController.updatePlayerStats();
        theController.enablePlayerBattleControls();
        theController.scrollToBottom("game-console");
        if(theController.battleOverCheck() === true){
            theController.endBattle();
        }
    }
}