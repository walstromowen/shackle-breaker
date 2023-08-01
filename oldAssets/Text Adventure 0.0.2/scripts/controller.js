import {player as thePlayer} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";
import {enemy as theEnemy} from "./main.js";

export default class Controller {
    constructor(){
        this.gameConsole = document.getElementById("game-console");
        this.upArrow = document.getElementById('up-arrow');
        this.rightArrow = document.getElementById('right-arrow');
        this.downArrow = document.getElementById('down-arrow');
        this.leftArrow = document.getElementById('left-arrow');
        this.audioPlayer = document.getElementById('audio-player');
        this.interactButton = document.getElementById('interact-button');
        this.healthBarPlayerProgress = document.getElementById('health-bar-player-progress');
        this.staminaBarPlayerProgress = document.getElementById('stamina-bar-player-progress');
        this.magicBarPlayerProgress = document.getElementById('magic-bar-player-progress');
        this.healthBarEnemyProgress = document.getElementById('health-bar-enemy-progress');
        this.staminaBarEnemyProgress = document.getElementById('stamina-bar-enemy-progress');
        this.magicBarEnemyProgress = document.getElementById('magic-bar-enemy-progress');
        this.toggleBattleCallback = this.toggleBattle.bind(this);
        this.toggleMapCallback = this.toggleMap.bind(this);
        this.moveNorthCallback = thePlayer.moveNorth.bind(thePlayer);
        this.moveEastCallback = thePlayer.moveEast.bind(thePlayer);
        this.moveSouthCallback = thePlayer.moveSouth.bind(thePlayer);
        this.moveWestCallback = thePlayer.moveWest.bind(thePlayer);
        this.enemyAttackCallback = theEnemy.attackPlayer.bind(theEnemy);
        this.playerAttackCallback = thePlayer.attackEnemy.bind(thePlayer);
        this.updatePlayerStats();
        this.updateEnemyStats();
        this.toggleMap();
    }
    toggleMap(){
        $("#player-image-container").hide();
        $("#mini-map-container").show();
        $("#enemy-image-container").hide();
        $("#location-image-container").show();
        $("#enemy-stats-container").hide();
        this.disablePlayerBattleControls();
        this.enablePlayerMapControls();
        this.upArrow.innerText = "Up";
        this.downArrow.innerText = "Down";
        //Audio - TODO - needs to have an event listerner tell when to start playing
            this.audioPlayer.pause();
            // this.audioPlayer.src = "./audio/deep-in-the-dell-126916.mp3";
            //this.audioPlayer.play();
        theMiniMap.resizeCanvas();
        theMiniMap.draw();
    }
    toggleBattle(){
        //generate enemy
        $("#mini-map-container").hide();
        $("#player-image-container").show();
        $("#location-image-container").hide();
        $("#enemy-image-container").show();
        $("#enemy-stats-container").show();
        this.disablePlayerMapControls();
        this.enablePlayerBattleControls();
        this.upArrow.innerText = "Attack";
        this.downArrow.innerText = "Retreat";
        this.audioPlayer.src = "./audio/battle-of-the-dragons-8037.mp3";
        this.audioPlayer.play();
        this.gameConsole.innerHTML += "<p>You encounter a skeleton!</p>";
        this.scrollToBottom("game-console");
    }
    scrollToBottom(elementId){
        document.getElementById(elementId).scrollTop = document.getElementById(elementId).scrollHeight;
    }
    updatePlayerStats(){
        this.healthBarPlayerProgress.style.width = Math.floor(thePlayer.currentHP/thePlayer.maxHP*100) + "%";
        this.staminaBarPlayerProgress.style.width = Math.floor(thePlayer.currentStamina/thePlayer.maxStamina*100) + "%";
        this.magicBarPlayerProgress.style.width = Math.floor(thePlayer.currentMagic/thePlayer.maxMagic*100) + "%";
        this.scrollToBottom("game-console");
    }
    updateEnemyStats(){
        this.healthBarEnemyProgress.style.width = Math.floor(theEnemy.currentHP/theEnemy.maxHP*100) + "%";
        this.staminaBarEnemyProgress.style.width = Math.floor(theEnemy.currentStamina/theEnemy.maxStamina*100) + "%";
        this.magicBarEnemyProgress.style.width = Math.floor(theEnemy.currentMagic/theEnemy.maxMagic*100) + "%";
        this.scrollToBottom("game-console");
    }

    endBattle(){
        console.log('battle ended');
        thePlayer.moveNextRoom();
        this.toggleMap();
    }
    battleOverCheck(){
        if(theEnemy.currentHP <= 0 || thePlayer.currentHP <= 0){
            console.log('battle Over Check Sucessful, Enemy HP:' + theEnemy.currentHP + ' Player HP:' + thePlayer.currentHP);
            return true;     
        }
    }
    enablePlayerMapControls(){
        this.upArrow.addEventListener('click', this.moveNorthCallback);
        this.rightArrow.addEventListener('click', this.moveEastCallback);
        this.downArrow.addEventListener('click', this.moveSouthCallback);
        this.leftArrow.addEventListener('click', this.moveWestCallback);
        this.interactButton.addEventListener('click', this.toggleBattleCallback);
        $('.direction-button').removeClass('direction-button-disabled');
        $('.direction-button').removeClass('direction-button-disabled:hover');
    }
    disablePlayerMapControls(){
        this.upArrow.removeEventListener('click', this.moveNorthCallback);
        this.rightArrow.removeEventListener('click', this.moveEastCallback);
        this.downArrow.removeEventListener('click', this.moveSouthCallback);
        this.leftArrow.removeEventListener('click', this.moveWestCallback);
        this.interactButton.removeEventListener('click', this.toggleBattleCallback);
    }
    enablePlayerBattleControls(){
        this.upArrow.addEventListener('click', this.playerAttackCallback); 
        this.downArrow.addEventListener('click', this.toggleMapCallback);
        $('.direction-button').removeClass('direction-button-disabled');
        $('.direction-button').removeClass('direction-button-disabled:hover');
    }
    disablePlayerBattleControls(){
        this.downArrow.removeEventListener('click', this.toggleMapCallback);
        this.upArrow.removeEventListener('click', this.playerAttackCallback); 
        this.interactButton.removeEventListener('click', this.toggleMapCallback);
        $('.direction-button').addClass('direction-button-disabled');
        $('.direction-button').addClass('direction-button-disabled:hover');
    }
}
