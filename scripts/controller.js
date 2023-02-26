import {player as thePlayer} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";

export default class Controller {
    constructor(){
        this.battleBtnArray = [];
        this.mapBtnArray = [];
        this.gameConsole = document.getElementById("game-console");
        this.playerName = document.getElementById('player-name');
        this.playerName.innerText = thePlayer.name;
        this.enemyName = document.getElementById('enemy-name');
        this.locationName = document.getElementById('location-name');
        this.locationName.innerText = thePlayer.map.mapEnviorment.biome; //occurs twice
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
        this.equippedTabButton = document.getElementById('equipped-tab-button');
        this.inventoryTabButton = document.getElementById('inventory-tab-button');
        this.inventoryTab = document.getElementById('inventory-tab');
        this.toggleBattleCallback = this.toggleBattle.bind(this);
        this.toggleMapCallback = this.toggleMap.bind(this);
        this.playerRecoverCallback = thePlayer.recover.bind(thePlayer);
        this.updatePlayerStats();
        this.enableKeyControls();
        this.enablePlayerMapControls();
        this.enableInventoryControls();
        this.enableLevelUpControls();
        this.updatePlayerInventoryTab(thePlayer.inventory)
        this.toggleMap();
    }
    toggleMap(){
        document.getElementById('battle-button-container').style.display = "none";
        document.getElementById('map-button-container').style.display = "block";
        document.getElementById("location-name-container").style.display = "block";
        document.getElementById("enemy-name-container").style.display = "none";
        document.getElementById("player-image-container").style.display = "none";
        document.getElementById("mini-map-container").style.display = "block";
        document.getElementById("enemy-image-container").style.display = "none";
        document.getElementById("location-image-container").style.display = "block";
        document.getElementById("enemy-main-stats-container").style.display = "none";
        this.audioPlayer.pause();
        this.audioPlayer.src = "./audio/deep-in-the-dell-126916.mp3";
        this.audioPlayer.play();
        theMiniMap.resizeCanvas();
        theMiniMap.draw();
        thePlayer.isInBattle = false;
    }
    toggleBattle(){
        thePlayer.isInBattle = true;
        this.gameConsole.innerHTML += "<p>Something approaches...</p>";
        this.scrollToBottom("game-console");
        setTimeout(()=>{
            this.enemyName.innerText = thePlayer.currentEnemy.name;
            this.enemyImage.src = thePlayer.currentEnemy.imageSrc;
            document.getElementById("location-name-container").style.display = "none";
            document.getElementById("enemy-name-container").style.display = "block";
            document.getElementById("mini-map-container").style.display = "none";
            document.getElementById("player-image-container").style.display = "block";
            document.getElementById("location-image-container").style.display = "none";
            document.getElementById("enemy-image-container").style.display = "block";
            document.getElementById("enemy-main-stats-container").style.display = "block";
            this.enablePlayerBattleControls();
            this.gameConsole.innerHTML += `<p>You encounter a ${thePlayer.currentEnemy.name}!</p>`;
            this.scrollToBottom("game-console");
            this.audioPlayer.src = "./audio/battle-of-the-dragons-8037.mp3";
            this.audioPlayer.play();
         }, 2000);
    }
    scrollToBottom(elementId){
        document.getElementById(elementId).scrollTop = document.getElementById(elementId).scrollHeight;
    }
    updatePlayerStats(){
        thePlayer.boundStats();
        this.currentHealthPlayer.innerText = thePlayer.currentHP;
        this.currentStaminaPlayer.innerText = thePlayer.currentStamina;
        this.currentMagicPlayer.innerText = thePlayer.currentMagic;
        this.healthBarPlayerProgress.style.width = Math.floor(thePlayer.currentHP/thePlayer.maxHP*100) + "%";
        this.staminaBarPlayerProgress.style.width = Math.floor(thePlayer.currentStamina/thePlayer.maxStamina*100) + "%";
        this.magicBarPlayerProgress.style.width = Math.floor(thePlayer.currentMagic/thePlayer.maxMagic*100) + "%";
        document.getElementById('player-level-label').innerText = "★ " + thePlayer.level;
        this.scrollToBottom("game-console");
    }
    updateEnemyStats(){
        thePlayer.currentEnemy.boundStats();
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
    enableKeyControls(){
        window.addEventListener("keydown", (e) => {
            if(thePlayer.isInBattle == false){
                switch(e.key){
                    case 'w':
                        thePlayer.moveNorth();
                        break;
                    case 'a':
                        thePlayer.moveWest();
                        break;
                    case 's':
                        thePlayer.moveSouth();
                        break;
                    case 'd':
                        thePlayer.moveEast();
                        break;
                }
            }
        });
    }
    enablePlayerMapControls(){
        for(var i = 0; i < this.mapBtnArray.length; i++){
            let controls = document.getElementById('map-button-container');
            let oldBtn = controls.querySelector('button');
                oldBtn.remove();
        }
        this.mapBtnArray = [];
        let interactBtn = document.createElement('button');
        interactBtn.classList.add('action-button');
        interactBtn.innerText = "Interact";
        //interactBtn.addEventListener('click', this.toggleMapCallback);
        document.getElementById('map-button-container').appendChild(interactBtn);
        this.mapBtnArray.push(interactBtn);
    }
    enablePlayerBattleControls(){
        //remove old buttons
        for(var i = 0; i < this.battleBtnArray.length; i++){
            let controls = document.getElementById('battle-button-container');
            let oldBtn = controls.querySelector('button');
                oldBtn.remove();
        }
        this.battleBtnArray = [];
        //Ability Buttons
        for(let x = 0; x < thePlayer.equippedArray.length; x++){
            if(thePlayer.equippedArray[x] != "Empty"){
                if(thePlayer.equippedArray[x].abilityArray.length != 0){
                    for(let y = 0; y < thePlayer.equippedArray[x].abilityArray.length; y++){
                        let abilityBtn = document.createElement('button');
                        abilityBtn.classList.add('action-button');
                        let abilityName = thePlayer.equippedArray[x].abilityArray[y].name;
                        abilityName = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
                        abilityBtn.innerText = abilityName;
                        abilityBtn.addEventListener('click', ()=>{
                            thePlayer.useEquipment(x, y);
                        });
                        document.getElementById('battle-button-container').appendChild(abilityBtn);
                        this.battleBtnArray.push(abilityBtn);
                    }
                }
            }
        }
        //punch btn
        let punchBtn = document.createElement('button');
        punchBtn.classList.add('action-button');
        punchBtn.innerText = "Punch";
        punchBtn.addEventListener('click', thePlayer.punch.bind(thePlayer));
        document.getElementById('battle-button-container').appendChild(punchBtn);
        this.battleBtnArray.push(punchBtn);
        //recover btn
        let recoverBtn = document.createElement('button');
        recoverBtn.classList.add('action-button');
        recoverBtn.innerText = "Recover";
        recoverBtn.addEventListener('click', this.playerRecoverCallback);
        document.getElementById('battle-button-container').appendChild(recoverBtn);
        this.battleBtnArray.push(recoverBtn);
        //retreat btn
        let retreatBtn = document.createElement('button');
        retreatBtn.classList.add('action-button');
        retreatBtn.innerText = "Retreat";
        retreatBtn.addEventListener('click', this.toggleMapCallback);
        document.getElementById('battle-button-container').appendChild(retreatBtn);
        this.battleBtnArray.push(retreatBtn);

        document.getElementById('map-button-container').style.display = "none";
        document.getElementById('battle-button-container').style.display = "block";
        document.getElementById('battle-button-container').style.visibility = "visible";
    }
    disablePlayerBattleControls(){
        document.getElementById('battle-button-container').style.visibility = "hidden";
    }
    enableInventoryControls(){
        this.equippedTabButton.addEventListener('click',()=>{
            document.getElementById('inventory-tab').style.display = "none";
            document.getElementById('equipped-tab').style.display = "block";
        });
        this.inventoryTabButton.addEventListener('click',()=>{
            document.getElementById('equipped-tab').style.display = "none";
            document.getElementById('inventory-tab').style.display = "block";
        });
        for(let i = 0; i < thePlayer.equippedArray.length; i++){
            document.getElementById('unequip-btn-' + i).addEventListener('click', ()=>{
                thePlayer.unequip(i);
            });
        }
    }
    updatePlayerInventoryTab(inventory){
        for(var i = -1; i < inventory.length; i++){
            let oldSlot = this.inventoryTab.querySelector('div');
            if(oldSlot !== null){
                oldSlot.remove();
            } 
        }
        for(let i = 0; i < inventory.length; i++){
            let inventorySlot = document.createElement('div');
            let inventorySlotMenu = document.createElement('div');
            let slotMenuEquipBtn = document.createElement('div');
            inventorySlot.classList.add('inventory-slot');
            inventorySlotMenu.classList.add('inventory-slot-menu');
            slotMenuEquipBtn.classList.add('slot-menu-equip-btn');
            let itemName = inventory[i].name;
            itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
            inventorySlot.innerText = itemName;
            slotMenuEquipBtn.innerText = "Equip";
            inventorySlot.appendChild(inventorySlotMenu);
            inventorySlotMenu.appendChild(slotMenuEquipBtn);
            this.inventoryTab.appendChild(inventorySlot);
            slotMenuEquipBtn.addEventListener('click', ()=>{
                thePlayer.equip(i);
            });
        }
    }
    updatePlayerEquippedTab(equippedArrayIndex){
        if(thePlayer.equippedArray[equippedArrayIndex] =="Empty"){
            document.getElementById('equip-slot-' + equippedArrayIndex).innerText = "Empty";
        }else{
            let itemName = thePlayer.equippedArray[equippedArrayIndex].name;
            itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
            document.getElementById('equip-slot-' + equippedArrayIndex).innerText = itemName;
        } 
    }
    displayLevelUpScreen(){
        document.getElementById('level-up-screen').style.display = "block";
        document.getElementById("app").style.display = "none";
    }
    enableLevelUpControls(){
        let levelCheck = false;
        let fullHeal = () =>{
            thePlayer.currentHP =  thePlayer.maxHP;
            thePlayer.currentStamina =  thePlayer.maxStamina;
            thePlayer.currentMagic =  thePlayer.maxMagic;
        }
        document.getElementById('increase-hp-btn').addEventListener('click', ()=>{
            fullHeal();
            thePlayer.currentHP = thePlayer.maxHP + 2;
            levelCheck = true;
            document.getElementById('increase-hp-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-stamina-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-magic-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-stamina-btn').addEventListener('click', ()=>{
            fullHeal();
            thePlayer.currentStamina = thePlayer.maxStamina + 2;
            levelCheck = true;
            document.getElementById('increase-hp-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-stamina-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-magic-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-magic-btn').addEventListener('click', ()=>{
            fullHeal();
            thePlayer.currentMagic = thePlayer.maxMagic + 2;
            levelCheck = true;
            document.getElementById('increase-hp-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-stamina-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-magic-btn').classList.add("title-screen-button-selected");
        });
        document.getElementById('submit-level-btn').addEventListener('click', ()=>{
            if(levelCheck == true){
                thePlayer.maxHP = thePlayer.currentHP;
                thePlayer.maxStamina = thePlayer.currentStamina;
                thePlayer.maxMagic = thePlayer.currentMagic;
                document.getElementById("app").style.display = "block";
                document.getElementById('level-up-screen').style.display = "none";
                this.audioPlayer.play();
                this.updatePlayerStats();
            }
        });
    }
}