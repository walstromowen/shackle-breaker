import {player as thePlayer} from "./main.js";
import {miniMap as theMiniMap} from "./main.js";
import Battle from "./battle.js";

export default class Controller {
    constructor(){
        this.battleBtnArray = [];
        this.mapBtnArray = [];
        this.battleSequenceArray = [];
        this.gameConsole = document.getElementById("game-console");
        this.playerName = document.getElementById('player-name');
        this.playerName.innerText = thePlayer.name;
        this.enemyName = document.getElementById('enemy-name');
        this.locationName = document.getElementById('location-name');
        this.locationName.innerText = thePlayer.map.mapEnviorment.biome.charAt(0).toUpperCase() + thePlayer.map.mapEnviorment.biome.slice(1); //occurs twice
        this.musicPlayer = document.getElementById('music-player');
        this.soundEffectPlayer = document.getElementById('sound-effect-player');
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

        this.currentExperience = document.getElementById('current-experience');
        this.currentPhysicalAttack = document.getElementById('current-physical-attack');
        this.currentMagicAttack = document.getElementById('current-magic-attack');
        this.currentPhysicalDefense = document.getElementById('current-physical-defense');
        this.currentMagicDefense = document.getElementById('current-magic-defense');
        this.currentSpeed = document.getElementById('current-speed');

        this.currentHealthEnemy = document.getElementById('current-health-enemy');
        this.currentStaminaEnemy = document.getElementById('current-stamina-enemy');
        this.currentMagicEnemy = document.getElementById('current-magic-enemy');
        this.equippedTabButton = document.getElementById('equipped-tab-button');
        this.inventoryTabButton = document.getElementById('inventory-tab-button');
        this.secondaryStatsTabButton = document.getElementById('secondary-stats-tab-button');
        this.inventoryTab = document.getElementById('inventory-tab');
        this.battle = "";
        document.getElementById('player-image').src = thePlayer.apperance;
        this.updatePlayerStats();
        this.enableKeyControls();
        this.enablePlayerMapControls();
        this.enableInventoryControls();
        this.enableLevelUpControls();
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
        this.musicPlayer.pause();
        this.musicPlayer.src = "./audio/deep-in-the-dell-126916.mp3";
        this.musicPlayer.play();
        theMiniMap.resizeCanvas();
        theMiniMap.draw();
        thePlayer.isInBattle = false;
        thePlayer.canMoveRoom  = true;
        this.updatePlayerInventoryTab(thePlayer.inventory);
    }
    toggleBattle(enemy){
        this.battle = new Battle(thePlayer, enemy);
        this.gameConsole.innerHTML += "<p>Something approaches...</p>";
        this.scrollToBottom("game-console");
        thePlayer.canMoveRoom = false;
        setTimeout(()=>{
            this.enemyName.innerText = this.battle.enemy.name.charAt(0).toUpperCase() + this.battle.enemy.name.slice(1);
            this.enemyImage.src = this.battle.enemy.imageSrc;
            document.getElementById("location-name-container").style.display = "none";
            document.getElementById("enemy-name-container").style.display = "block";
            document.getElementById("mini-map-container").style.display = "none";
            document.getElementById("player-image-container").style.display = "block";
            document.getElementById("location-image-container").style.display = "none";
            document.getElementById("enemy-image-container").style.display = "block";
            document.getElementById("enemy-main-stats-container").style.display = "block";
            this.enablePlayerBattleControls();
            this.gameConsole.innerHTML += `<p>You encounter a ${this.battle.enemy.name}!</p>`;
            this.scrollToBottom("game-console");
            this.musicPlayer.src = "./audio/battle-of-the-dragons-8037.mp3";
            this.musicPlayer.play();
            thePlayer.isInBattle = true;
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
        document.getElementById('player-level-label').innerText = "★ " + thePlayer.level;
        this.currentExperience.innerText = thePlayer.currentXP;
        this.currentSpeed.innerText = thePlayer.currentSpeed;
        this.currentPhysicalAttack.innerText = thePlayer.currentPhysicalAttack; 
        this.currentMagicAttack.innerText = thePlayer.currentMagicAttack;
        this.currentPhysicalDefense.innerText = thePlayer.currentPhysicalDefense;
        this.currentMagicDefense.innerText = thePlayer.currentMagicDefense;
        this.scrollToBottom("game-console");
    }
    updateEnemyStats(){
        this.currentHealthEnemy.innerText = this.battle.enemy.currentHP;
        this.currentStaminaEnemy.innerText = this.battle.enemy.currentStamina;
        this.currentMagicEnemy.innerText = this.battle.enemy.currentMagic;
        this.healthBarEnemyProgress.style.width = Math.floor(this.battle.enemy.currentHP/this.battle.enemy.maxHP*100) + "%";
        this.staminaBarEnemyProgress.style.width = Math.floor(this.battle.enemy.currentStamina/this.battle.enemy.maxStamina*100) + "%";
        this.magicBarEnemyProgress.style.width = Math.floor(this.battle.enemy.currentMagic/this.battle.enemy.maxMagic*100) + "%";
        this.scrollToBottom("game-console");
    }
    endBattle(){
        if(thePlayer.currentHP <= 0){
            this.disablePlayerBattleControls();
            setTimeout(()=>{
                this.musicPlayer.pause();
                document.getElementById('gameover-screen').style.display = "block";
                document.getElementById("app").style.display = "none";
             }, 2000);
        }else{
            setTimeout(()=>{
                Array.from(document.getElementsByClassName('slot-menu-use-btn')).forEach(btn=>{
                    btn.style.visibility = "visible";
                });
                if(this.battle.battlePhase != "retreat"){
                    thePlayer.defeatEnemy();
                }
                this.toggleMap();
                this.updateEnemyStats();
                this.updatePlayerStats();
             }, 2000);
        }
    }
    enableKeyControls(){
        window.addEventListener("keydown", (e) => {
            if(thePlayer.canMoveRoom == true){
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
        //Add New Ability Buttons
        for(let x = 0; x < thePlayer.abilityArray.length; x++){
            let abilityBtn = document.createElement('button');
            abilityBtn.classList.add('action-button');
            abilityBtn.innerText = thePlayer.abilityArray[x].name.charAt(0).toUpperCase() + thePlayer.abilityArray[x].name.slice(1);
            abilityBtn.addEventListener('click', ()=>{
                this.battle.determineFirstTurn(x);
            });
            document.getElementById('battle-button-container').appendChild(abilityBtn);
            this.battleBtnArray.push(abilityBtn);
         }
        document.getElementById('map-button-container').style.display = "none";
        document.getElementById('battle-button-container').style.display = "block";
        document.getElementById('battle-button-container').style.visibility = "visible";
        Array.from(document.getElementsByClassName('slot-menu-use-btn')).forEach(btn=>{
            btn.style.visibility = "visible";
        });
    }
    disablePlayerBattleControls(){
        document.getElementById('battle-button-container').style.visibility = "hidden";
        //Array.from used to convert HTML collection to regular array so forEach can be used
        Array.from(document.getElementsByClassName('slot-menu-use-btn')).forEach(btn=>{
            btn.style.visibility = "hidden";
        });
    }
    enableInventoryControls(){
        this.equippedTabButton.addEventListener('click',()=>{
            document.getElementById('inventory-tab').style.display = "none";
            document.getElementById('equipped-tab').style.display = "block";
            document.getElementById('secondary-stats-tab').style.display = "none";
        });
        this.inventoryTabButton.addEventListener('click',()=>{
            document.getElementById('equipped-tab').style.display = "none";
            document.getElementById('inventory-tab').style.display = "block";
            document.getElementById('secondary-stats-tab').style.display = "none";
        });
        this.secondaryStatsTabButton.addEventListener('click',()=>{
            document.getElementById('equipped-tab').style.display = "none";
            document.getElementById('inventory-tab').style.display = "none";
            document.getElementById('secondary-stats-tab').style.display = "block";
        });
        for(let i = 0; i < thePlayer.equippedArray.length; i++){
            document.getElementById('unequip-btn-' + i).addEventListener('click', ()=>{
                thePlayer.unequip(i);
            });
        }
    }
    updatePlayerInventoryTab(inventory){
        for(var i = -1; i < inventory.length; i++){
            let oldSlot = this.inventoryTab.querySelector('p');
            if(oldSlot !== null){
                oldSlot.remove();
            } 
        }
        for(let i = 0; i < inventory.length; i++){
            let inventorySlot = document.createElement('p');
            let inventorySlotMenu = document.createElement('div');
            let slotMenuUseBtn = document.createElement('div');
            inventorySlot.classList.add('inventory-slot');
            inventorySlotMenu.classList.add('inventory-slot-menu');
            slotMenuUseBtn.classList.add('slot-menu-use-btn');//equipment specific
            inventorySlot.innerText = inventory[i].name.charAt(0).toUpperCase() + inventory[i].name.slice(1);
            inventorySlot.appendChild(inventorySlotMenu);
            inventorySlotMenu.appendChild(slotMenuUseBtn);//equipment specific
            this.inventoryTab.appendChild(inventorySlot);
            if(inventory[i].type != "consumable"){
                slotMenuUseBtn.innerText = "Equip";//equipment specific
                slotMenuUseBtn.addEventListener('click', ()=>{ //equipment specific
                    thePlayer.equip(i);
                });
            }
            if(inventory[i].type == "consumable"){
                slotMenuUseBtn.innerText = "Use";//equipment specific
                slotMenuUseBtn.addEventListener('click', ()=>{ //equipment specific
                    this.useConsumable(i);
                });
            }
        }
    }
    updatePlayerEquippedTab(equippedArrayIndex){
        if(thePlayer.equippedArray[equippedArrayIndex] =="Empty"){
            document.getElementById('equip-slot-' + equippedArrayIndex).innerText = "Empty";
        }else{
            document.getElementById('equip-slot-' + equippedArrayIndex).innerText = thePlayer.equippedArray[equippedArrayIndex].name.charAt(0).toUpperCase() + thePlayer.equippedArray[equippedArrayIndex].name.slice(1);
        } 
    }
    displayLevelUpScreen(){
        document.getElementById('level-up-screen').style.display = "block";
        document.getElementById("app").style.display = "none";
        thePlayer.canMoveRoom = false;
    }
    enableLevelUpControls(){
        let levelCheck = false;
        let fullHeal = () =>{
            thePlayer.currentHP =  thePlayer.maxHP;
            thePlayer.currentStamina =  thePlayer.maxStamina;
            thePlayer.currentMagic = thePlayer.maxMagic;
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
                thePlayer.maxHP = thePlayer.currentHP + 1;
                thePlayer.maxStamina = thePlayer.currentStamina + 1;
                thePlayer.maxMagic = thePlayer.currentMagic + 1;
                fullHeal();
                document.getElementById("app").style.display = "block";
                document.getElementById('level-up-screen').style.display = "none";
                this.musicPlayer.play();
                this.updatePlayerStats();
                thePlayer.canMoveRoom = true;
            }
        });
    }
    useConsumable(inventoryIndex){
        if(thePlayer.isInBattle == true){
            if(thePlayer.inventory[inventoryIndex].abilityArray[0].canUse(thePlayer) != false){
                this.battle.determineFirstTurn(0, inventoryIndex);
                thePlayer.inventory.splice(inventoryIndex, 1);
                this.updatePlayerInventoryTab(thePlayer.inventory);
            }
        }else{
            if(thePlayer.inventory[inventoryIndex].abilityArray[0].activate(thePlayer)==true){
                thePlayer.inventory.splice(inventoryIndex, 1);
                this.updatePlayerInventoryTab(thePlayer.inventory);
                this.updatePlayerStats();
            }
        }
    }
}