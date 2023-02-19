import {player as thePlayer} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";

export default class Controller {
    constructor(){
        this.gameConsole = document.getElementById("game-console");
        this.playerName = document.getElementById('player-name');
        this.playerName.innerText = thePlayer.name;
        this.enemyName = document.getElementById('enemy-name');
        this.locationName = document.getElementById('location-name');
        this.locationName.innerText = thePlayer.map.mapEnviorment.biome; //occurs twice
        this.upArrow = document.getElementById('up-arrow');
        this.rightArrow = document.getElementById('right-arrow');
        this.downArrow = document.getElementById('down-arrow');
        this.leftArrow = document.getElementById('left-arrow');
        this.audioPlayer = document.getElementById('audio-player');
        this.enemyImage = document.getElementById('enemy-image');
        this.locationImage = document.getElementById('location-image');
        this.locationImage.src = thePlayer.map.mapEnviorment.imageSrc; //occurs twice
        this.healthBarPlayerProgress = document.getElementById('health-bar-player-progress');
        this.staminaBarPlayerProgress = document.getElementById('stamina-bar-player-progress');
        this.magicBarPlayerProgress = document.getElementById('magic-bar-player-progress');
        this.healthBarEnemyProgress = document.getElementById('health-bar-enemy-progress');
        this.staminaBarEnemyProgress = document.getElementById('stamina-bar-enemy-progress');
        this.magicBarEnemyProgress = document.getElementById('magic-bar-enemy-progress');
        this.currentHealthPlayer = document.getElementById('current-health-player');
        this.currentStaminaPlayer = document.getElementById('current-stamina-player');
        this.currentMagicPlayer = document.getElementById('current-magic-player');
        this.currentHealthEnemy = document.getElementById('current-health-enemy');
        this.currentStaminaEnemy = document.getElementById('current-stamina-enemy');
        this.currentMagicEnemy = document.getElementById('current-magic-enemy');
        this.toggleBattleCallback = this.toggleBattle.bind(this);
        this.toggleMapCallback = this.toggleMap.bind(this);
        this.moveNorthCallback = thePlayer.moveNorth.bind(thePlayer);
        this.moveEastCallback = thePlayer.moveEast.bind(thePlayer);
        this.moveSouthCallback = thePlayer.moveSouth.bind(thePlayer);
        this.moveWestCallback = thePlayer.moveWest.bind(thePlayer);
        this.playerAttackCallback = thePlayer.attackEnemy.bind(thePlayer);
        this.updatePlayerStats();
        this.updateEnemyStats();
        this.toggleMap();
    }
    toggleMap(){
        $("#location-name-container").show();
        $("#enemy-name-container").hide();
        $("#player-image-container").hide();
        $("#mini-map-container").show();
        $("#enemy-image-container").hide();
        $("#location-image-container").show();
        $("#enemy-main-stats-container").hide();
        this.disablePlayerBattleControls();
        this.enablePlayerMapControls();
        this.upArrow.innerText = "Up";
        this.downArrow.innerText = "Down";
        this.audioPlayer.pause();
        this.audioPlayer.src = "./audio/deep-in-the-dell-126916.mp3";
        this.audioPlayer.play();
        theMiniMap.resizeCanvas();
        theMiniMap.draw();
    }
    toggleBattle(){
        this.disablePlayerMapControls();
        this.gameConsole.innerHTML += "<p>Something approaches...</p>";
        this.scrollToBottom("game-console");
        $('.direction-button').addClass('direction-button-disabled');
        $('.direction-button').addClass('direction-button-disabled:hover');
        setTimeout(()=>{
            this.enemyName.innerText = thePlayer.currentEnemy.name;
            this.enemyImage.src = thePlayer.currentEnemy.imageSrc;
            $("#location-name-container").hide();
            $("#enemy-name-container").show();
            $("#mini-map-container").hide();
            $("#player-image-container").show();
            $("#location-image-container").hide();
            $("#enemy-image-container").show();
            $("#enemy-main-stats-container").show();
            this.upArrow.innerText = "Attack";
            this.downArrow.innerText = "Retreat";
            this.gameConsole.innerHTML += `<p>You encounter a ${thePlayer.currentEnemy.name}!</p>`;
            this.scrollToBottom("game-console");
            this.enablePlayerBattleControls();
            this.audioPlayer.src = "./audio/battle-of-the-dragons-8037.mp3";
            this.audioPlayer.play();
         }, 2000);
    }
    scrollToBottom(elementId){
        document.getElementById(elementId).scrollTop = document.getElementById(elementId).scrollHeight;
    }
    updatePlayerStats(){
        this.currentHealthPlayer.innerText = thePlayer.currentHP;
        this.currentStaminaPlayer.innerText = thePlayer.currentStamina;
        this.currentMagicPlayer.innerText = thePlayer.currentMagic;
        this.healthBarPlayerProgress.style.width = Math.floor(thePlayer.currentHP/thePlayer.maxHP*100) + "%";
        this.staminaBarPlayerProgress.style.width = Math.floor(thePlayer.currentStamina/thePlayer.maxStamina*100) + "%";
        this.magicBarPlayerProgress.style.width = Math.floor(thePlayer.currentMagic/thePlayer.maxMagic*100) + "%";
        this.scrollToBottom("game-console");
    }
    updateEnemyStats(){
        this.currentHealthEnemy.innerText = thePlayer.currentEnemy.currentHP;
        this.currentStaminaEnemy.innerText = thePlayer.currentEnemy.currentStamina;
        this.currentMagicEnemy.innerText = thePlayer.currentEnemy.currentMagic;
        this.healthBarEnemyProgress.style.width = Math.floor(thePlayer.currentEnemy.currentHP/thePlayer.currentEnemy.maxHP*100) + "%";
        this.staminaBarEnemyProgress.style.width = Math.floor(thePlayer.currentEnemy.currentStamina/thePlayer.currentEnemy.maxStamina*100) + "%";
        this.magicBarEnemyProgress.style.width = Math.floor(thePlayer.currentEnemy.currentMagic/thePlayer.currentEnemy.maxMagic*100) + "%";
        this.scrollToBottom("game-console");
    }
    endBattle(){
        if(thePlayer.currentHP <= 0){
            this.disablePlayerBattleControls();
            setTimeout(()=>{
                alert("Game Over Please refresh!");
             }, 2000);
        }else{
            thePlayer.defeatEnemy();
            this.toggleMap();
        }
    }
    battleOverCheck(){
        if(thePlayer.currentEnemy.currentHP <= 0 || thePlayer.currentHP <= 0){
            return true;     
        }
    }
    enablePlayerMapControls(){
        this.upArrow.addEventListener('click', this.moveNorthCallback);
        this.rightArrow.addEventListener('click', this.moveEastCallback);
        this.downArrow.addEventListener('click', this.moveSouthCallback);
        this.leftArrow.addEventListener('click', this.moveWestCallback);
        $('.direction-button').removeClass('direction-button-disabled');
        $('.direction-button').removeClass('direction-button-disabled:hover');
    }
    disablePlayerMapControls(){
        this.upArrow.removeEventListener('click', this.moveNorthCallback);
        this.rightArrow.removeEventListener('click', this.moveEastCallback);
        this.downArrow.removeEventListener('click', this.moveSouthCallback);
        this.leftArrow.removeEventListener('click', this.moveWestCallback);
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
        $('.direction-button').addClass('direction-button-disabled');
        $('.direction-button').addClass('direction-button-disabled:hover');
    }
}
