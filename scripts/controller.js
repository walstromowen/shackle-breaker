import {LinenShirt, LinenPants, WoodDagger, WoodSpear, WoodSword, 
        WoodSideDagger, WoodSheild, WoodFireStaff, LeatherHelmet, 
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, IronSheild, IronHelmet, IronGuantlets, IronChainmail, 
        IronGreaves, IronBoots, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedThrowingKnife, Meteorite} from "./items.js";
import {Recover, Punch, Retreat} from "./abilities.js"
import Player from "./player.js";
import Map from "./map.js";
import MiniMap from "./miniMap.js";
import Battle from "./battle.js";

export default class Controller {
    constructor(){
        this.characterCreationArray = ["name", "apperance", "background", "inventoryArray", "attributesArray", "statsArray"];
        this.map = "";
        this.miniMap = "";
        this.player = "";
        this.battle = "";
        this.mapBtnArray = [];
        this.battleBtnArray = [];
        this.initialize();
    }
    initialize(){
        this.enableTitleScreenControls();
        this.enableCharacterCreatorScreenControls();
        this.enableGameOverScreenControls();
    }
    enableTitleScreenControls(){
        document.getElementById('title-start-button').addEventListener("click", ()=>{
            document.getElementById("title-screen").style.display = "none";
            document.getElementById("character-creation-screen").style.display = "block";
            this.characterCreatorDetermineUpdateStats();
            this.characterCreatorUpdateInventory();
        });
        document.getElementById('title-exit-button').addEventListener("click", ()=>{
            window.close();
        });
    }
    enableCharacterCreatorScreenControls(){
        document.getElementById('character-creation-submit-btn').addEventListener("click", ()=>{//start game code
            document.getElementById("character-creation-screen").style.display = "none";
            this.characterCreationArray[0] = document.getElementById("name-selection").value;
            this.characterCreationArray[1] = document.getElementById("apperance-selection").value;
            this.characterCreationArray[2] = document.getElementById("background-selection").value;
            this.map = new Map(0);
            this.miniMap = new MiniMap();
            this.player = new Player(this.characterCreationArray, this.map);
            document.getElementById("app").style.display = "block";
            document.getElementById('player-name').innerText = this.player.name;
            document.getElementById('player-image').src = this.player.apperance;
            document.getElementById('location-name').innerText = this.capitalizeFirstLetter(this.map.mapEnviorment.biome);
            document.getElementById('location-image').src = this.map.mapEnviorment.imageSrc;
            this.updatePlayerStats();
            this.enableKeyControls();
            this.enablePlayerMapControls();
            this.enableInventoryControls();
            this.enableLevelUpControls();
            this.toggleMap();
        });
        document.getElementById("apperance-selection").addEventListener("change", ()=>{
            document.getElementById("character-creator-apperance-image").src = document.getElementById("apperance-selection").value; 
        });
        document.getElementById("background-selection").addEventListener("change", ()=>{
            this.characterCreatorDetermineUpdateStats();
            this.characterCreatorUpdateInventory();
        });
        document.getElementById("keepsake-selection").addEventListener("change", ()=>{
            this.characterCreatorUpdateInventory();
        });
    }
    characterCreatorDetermineUpdateStats(){
        let value = document.getElementById("background-selection").value;
        switch(value){
            case "traveler":
                this.characterCreatorUpdateStats(5, 5, 5, 5, 5, 5);
                break;
            case "blacksmith":
                this.characterCreatorUpdateStats(8, 5, 6, 4, 3, 3);
                break;
            case "ranger":
                this.characterCreatorUpdateStats(6, 6, 3, 7, 3, 5);
                break;
            case "hermit":
                this.characterCreatorUpdateStats(5, 5, 3, 4, 7, 6);
                break;
        }
    }
    characterCreatorUpdateStats(vigor, endurance, strength, dexterity, insight, focus){
        this.characterCreationArray[4] = [vigor, endurance, strength, dexterity, insight, focus];
        this.characterCreationArray[5] = this.scaleAttributes(vigor, endurance, strength, dexterity, insight, focus);
        document.getElementById("character-creation-vigor").innerText = this.characterCreationArray[4][0];
        document.getElementById("character-creation-endurance").innerText = this.characterCreationArray[4][1];
        document.getElementById("character-creation-strength").innerText = this.characterCreationArray[4][2];
        document.getElementById("character-creation-dexterity").innerText = this.characterCreationArray[4][3];
        document.getElementById("character-creation-insight").innerText = this.characterCreationArray[4][4];
        document.getElementById("character-creation-focus").innerText = this.characterCreationArray[4][5];
        document.getElementById("character-creation-health").innerText = this.characterCreationArray[5][0];
        document.getElementById("character-creation-stamina").innerText = this.characterCreationArray[5][1];
        document.getElementById("character-creation-magic").innerText = this.characterCreationArray[5][2];
        document.getElementById("character-creation-blunt-attack").innerText = this.characterCreationArray[5][3];
        document.getElementById("character-creation-pierce-attack").innerText = this.characterCreationArray[5][4];
        document.getElementById("character-creation-arcane-attack").innerText = this.characterCreationArray[5][5];
        document.getElementById("character-creation-element-attack").innerText = this.characterCreationArray[5][6];
        document.getElementById("character-creation-blunt-defense").innerText = this.characterCreationArray[5][7];
        document.getElementById("character-creation-pierce-defense").innerText = this.characterCreationArray[5][8];
        document.getElementById("character-creation-arcane-defense").innerText = this.characterCreationArray[5][9];
        document.getElementById("character-creation-element-defense").innerText = this.characterCreationArray[5][10];
    }
    characterCreatorUpdateInventory(){
        let inventoryArray = [];
        let value = document.getElementById("background-selection").value;
        inventoryArray.push(new LinenShirt, new LinenPants)
        switch(value){
            case "traveler":
                inventoryArray.push(new WoodSpear, new LeatherBoots);
                break;
            case "blacksmith":
                inventoryArray.push(new WoodSword, new IronHelmet);
                break;
            case "ranger":
                inventoryArray.push(new WoodDagger, new WoodSideDagger);
                break;
            case "hermit":
                inventoryArray.push(new WoodFireStaff);
                break;
        }
        let value2 = document.getElementById("keepsake-selection").value;
        switch(value2){
            case "none":
                break;
            case "throwing-knifes":
                inventoryArray.push(new ThrowingKnife, new ThrowingKnife, new PoisonedThrowingKnife );
                break;
            case "bag-of-potions":
                inventoryArray.push(new HealthPotion, new StaminaPotion , new MagicPotion);
                break;
            case "meteorite":
                inventoryArray.push(new Meteorite);
                break;
        }
        for(let i = -1; i < this.characterCreationArray[3].length; i++){
            let oldSlot = document.getElementById("character-creation-inventory").querySelector('p');
            if(oldSlot !== null){
                oldSlot.remove();
            } 
        }
        for(let i = 0; i < inventoryArray.length; i++){
            let inventorySlot = document.createElement('p');
            inventorySlot.classList.add('inventory-slot');
            inventorySlot.innerText = this.capitalizeFirstLetter(inventoryArray[i].name);
            document.getElementById("character-creation-inventory").appendChild(inventorySlot);
        }
        this.characterCreationArray[3] = inventoryArray;
    }
    enableGameOverScreenControls(){
        document.getElementById('gameover-to-menu-btn').addEventListener("click", ()=>{
            location.reload();
        });
        document.getElementById('gameover-exit-btn').addEventListener("click", ()=>{
            window.close();
        });
    }
    enableKeyControls(){
        window.addEventListener("keydown", (e) => {
            if(this.player.canMoveRoom == true){
                switch(e.key){
                    case 'w':
                        this.movePlayerNorth();
                        break;
                    case 'a':
                        this.movePlayerWest();
                        break;
                    case 's':
                        this.movePlayerSouth();
                        break;
                    case 'd':
                        this.movePlayerEast();
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
    enableInventoryControls(){
        document.getElementById('equipped-tab-button').addEventListener('click',()=>{
            document.getElementById('inventory-tab').style.display = "none";
            document.getElementById('equipped-tab').style.display = "block";
            document.getElementById('secondary-stats-tab').style.display = "none";
        });
        document.getElementById('inventory-tab-button').addEventListener('click',()=>{
            document.getElementById('equipped-tab').style.display = "none";
            document.getElementById('inventory-tab').style.display = "block";
            document.getElementById('secondary-stats-tab').style.display = "none";
        });
        document.getElementById('secondary-stats-tab-button').addEventListener('click',()=>{
            document.getElementById('equipped-tab').style.display = "none";
            document.getElementById('inventory-tab').style.display = "none";
            document.getElementById('secondary-stats-tab').style.display = "block";
        });
        for(let i = 0; i < this.player.equippedArray.length; i++){
            document.getElementById('unequip-btn-' + i).addEventListener('click', ()=>{
                this.unequip(i);
            });
        }
    }
    enableLevelUpControls(){
        let levelCheck = false;
        let selectedStat = "";
        document.getElementById('increase-vigor-btn').addEventListener('click', ()=>{
            selectedStat = "vigor";
            levelCheck = true;
            document.getElementById('increase-vigor-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-endurance-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-strength-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-dexterity-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-insight-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-focus-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-endurance-btn').addEventListener('click', ()=>{
            selectedStat = "endurance";
            levelCheck = true;
            document.getElementById('increase-vigor-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-endurance-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-strength-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-dexterity-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-insight-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-focus-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-strength-btn').addEventListener('click', ()=>{
            selectedStat = "strength";
            levelCheck = true;
            document.getElementById('increase-vigor-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-endurance-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-strength-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-dexterity-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-insight-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-focus-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-dexterity-btn').addEventListener('click', ()=>{
            selectedStat = "dexterity";
            levelCheck = true;
            document.getElementById('increase-vigor-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-endurance-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-strength-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-dexterity-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-insight-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-focus-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-insight-btn').addEventListener('click', ()=>{
            selectedStat = "insight";
            levelCheck = true;
            document.getElementById('increase-vigor-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-endurance-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-strength-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-dexterity-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-insight-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-focus-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-focus-btn').addEventListener('click', ()=>{
            selectedStat = "focus";
            levelCheck = true;
            document.getElementById('increase-vigor-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-endurance-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-strength-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-dexterity-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-insight-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-focus-btn').classList.add("title-screen-button-selected");
        });
        document.getElementById('submit-level-btn').addEventListener('click', ()=>{
            if(levelCheck == true){
                document.getElementById("app").style.display = "block";
                document.getElementById('level-up-screen').style.display = "none";
                switch(selectedStat){
                    case "vigor":
                        this.player.vigor = this.player.vigor + 1;
                        break;
                    case "endurance":
                        this.player.vigor = this.player.endurance + 1;
                        break;
                    case "strength":
                        this.player.vigor = this.player.strength + 1;
                        break;
                    case "dexterity":
                        this.player.vigor = this.player.dexterity + 1;
                        break;
                    case "insight":
                        this.player.vigor = this.player.insight + 1;
                        break;
                    case "focus":
                        this.player.vigor = this.player.focus + 1;
                        break;
                }
                let newStats = this.scaleAttributes(this.player.vigor, this.player.endurance, this.player.strength, this.player.dexterity, this.player.insight, this.player.focus);
                this.player.maxHP = newStats[0];
                this.player.maxStamina = newStats[1];
                this.player.maxMagic = newStats[2];
                this.player.baseBluntAttack = newStats[3];
                this.player.basePierceAttack = newStats[4];
                this.player.baseArcaneAttack = newStats[5];
                this.player.baseElementalAttack = newStats[6];
                this.player.baseBluntDefense = newStats[7];
                this.player.basePierceDefense = newStats[8];
                this.player.baseArcaneDefense = newStats[9];
                this.player.baseElementalDefense = newStats[10];
                this.player.currentHP = this.player.maxHP;
                this.player.currentStamina = this.player.maxStamina;
                this.player.currentMagic = this.player.maxMagic;
                document.getElementById('music-player').play();
                this.updatePlayerStats();
                this.player.canMoveRoom = true;
            }
        });
    }
    enablePlayerBattleControls(){
        //remove old buttons
        for(let i = 0; i < this.battleBtnArray.length; i++){
            let controls = document.getElementById('battle-button-container');
            let oldBtn = controls.querySelector('button');
                oldBtn.remove();
        }
        this.battleBtnArray = [];
        //Add New Ability Buttons
        for(let x = 0; x < this.player.abilityArray.length; x++){
            let abilityBtn = document.createElement('button');
            abilityBtn.classList.add('action-button');
            abilityBtn.innerText = this.capitalizeFirstLetter(this.player.abilityArray[x].name);
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
        document.getElementById("music-player").src = "./audio/deep-in-the-dell-126916.mp3";
        document.getElementById("music-player").play();
        this.miniMap.resizeCanvas();
        this.miniMap.draw(this.map.roomArray, this.player.currentRoom);
        this.player.isInBattle = false;
        this.player.canMoveRoom = true;
        this.updatePlayerInventoryTab(this.player.inventory);
    }
    toggleBattle(enemy){
        this.battle = new Battle(this.player, enemy);
        this.printToGameConsole("Something approaches...");
        this.scrollToBottom("game-console");
        this.player.canMoveRoom = false;
        setTimeout(()=>{
            document.getElementById('enemy-name').innerText = this.battle.enemy.name.charAt(0).toUpperCase() + this.battle.enemy.name.slice(1);
            document.getElementById('enemy-image').src = this.battle.enemy.imageSrc;
            document.getElementById("location-name-container").style.display = "none";
            document.getElementById("enemy-name-container").style.display = "block";
            document.getElementById("mini-map-container").style.display = "none";
            document.getElementById("player-image-container").style.display = "block";
            document.getElementById("location-image-container").style.display = "none";
            document.getElementById("enemy-image-container").style.display = "block";
            document.getElementById("enemy-main-stats-container").style.display = "block";
            this.enablePlayerBattleControls();
            this.printToGameConsole(`You encounter a ${this.battle.enemy.name}!`);
            this.scrollToBottom("game-console");
            document.getElementById('music-player').src = "./audio/battle-of-the-dragons-8037.mp3";
            document.getElementById('music-player').play();
            this.player.isInBattle = true;
         }, 2000);
    }
    updatePlayerInventoryTab(inventory){
        for(let i = -1; i < inventory.length; i++){
            let oldSlot = document.getElementById('inventory').querySelector('p');
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
            inventorySlot.innerText = this.capitalizeFirstLetter(inventory[i].name);
            inventorySlot.appendChild(inventorySlotMenu);
            inventorySlotMenu.appendChild(slotMenuUseBtn);//equipment specific
            document.getElementById('inventory').appendChild(inventorySlot);
            if(inventory[i].type != "consumable"){
                slotMenuUseBtn.innerText = "Equip";//equipment specific
                slotMenuUseBtn.addEventListener('click', ()=>{ //equipment specific
                    this.equip(i);
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
    updatePlayerStats(){
        document.getElementById('current-health-player').innerText = this.player.currentHP;
        document.getElementById('current-stamina-player').innerText = this.player.currentStamina;
        document.getElementById('current-magic-player').innerText = this.player.currentMagic;
        document.getElementById('health-bar-player-progress').style.width = Math.floor(this.player.currentHP/this.player.maxHP*100) + "%";
        document.getElementById('stamina-bar-player-progress').style.width = Math.floor(this.player.currentStamina/this.player.maxStamina*100) + "%";
        document.getElementById('magic-bar-player-progress').style.width = Math.floor(this.player.currentMagic/this.player.maxMagic*100) + "%";
        document.getElementById('player-level-label').innerText = "★ " + this.player.level;
        document.getElementById('current-vigor').innerText = this.player.vigor;
        document.getElementById('current-endurance').innerText = this.player.endurance;
        document.getElementById('current-strength').innerText = this.player.strength;
        document.getElementById('current-dexterity').innerText = this.player.dexterity;
        document.getElementById('current-insight').innerText = this.player.insight;
        document.getElementById('current-focus').innerText = this.player.focus;
        document.getElementById('current-experience').innerText = this.player.currentXP;
        document.getElementById('current-speed').innerText = this.player.currentSpeed;
        document.getElementById('current-blunt-attack').innerText = this.player.currentBluntAttack; 
        document.getElementById('current-pierce-attack').innerText = this.player.currentPierceAttack;
        document.getElementById('current-arcane-attack').innerText = this.player.currentArcaneAttack; 
        document.getElementById('current-element-attack').innerText = this.player.currentElementalAttack;
        document.getElementById('current-blunt-defense').innerText = this.player.currentBluntDefense; 
        document.getElementById('current-pierce-defense').innerText = this.player.currentPierceDefense;
        document.getElementById('current-arcane-defense').innerText = this.player.currentArcaneDefense; 
        document.getElementById('current-element-defense').innerText = this.player.currentElementalDefense;
    }
    updateEnemyStats(){
        document.getElementById('current-health-enemy').innerText = this.battle.enemy.currentHP;
        document.getElementById('current-stamina-enemy').innerText = this.battle.enemy.currentStamina;
        document.getElementById('current-magic-enemy').innerText = this.battle.enemy.currentMagic;
        document.getElementById('health-bar-enemy-progress').style.width = Math.floor(this.battle.enemy.currentHP/this.battle.enemy.maxHP*100) + "%";
        document.getElementById('stamina-bar-enemy-progress').style.width = Math.floor(this.battle.enemy.currentStamina/this.battle.enemy.maxStamina*100) + "%";
        document.getElementById('magic-bar-enemy-progress').style.width = Math.floor(this.battle.enemy.currentMagic/this.battle.enemy.maxMagic*100) + "%";
    }
    movePlayerNorth(){
        this.movePlayerRoom(this.player.currentRoom.roomNorth);
    }
    movePlayerEast(){
        this.movePlayerRoom(this.player.currentRoom.roomEast);
    }
    movePlayerSouth(){
        this.movePlayerRoom(this.player.currentRoom.roomSouth);
    }
    movePlayerWest(){
        this.movePlayerRoom(this.player.currentRoom.roomWest);
    }
    movePlayerRoom(nextRoom){
        if(nextRoom !== ""){
            if(nextRoom.enemy !== ""){
                this.player.nextRoom = nextRoom;
                this.toggleBattle(nextRoom.enemy);
                this.updateEnemyStats();
                return; 
            }
            this.player.currentRoom.visited = true;
            this.player.currentRoom = nextRoom;
            this.miniMap.draw(this.map.roomArray, this.player.currentRoom);
            if(this.player.currentRoom.isExit == true){
                this.levelPlayerUp();
                this.printToGameConsole("you find an exit!");
                this.generateNewMap();
            }
        }
        else{
            this.printToGameConsole("cannot go this way");
        }
        this.updatePlayerStats();           
    }
    equip(inventoryIndex){
        if(this.player.isInBattle == false){
            switch(this.player.inventory[inventoryIndex].type){
                case "weapon":
                    if(this.player.equippedArray[0] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[0]);
                    }
                    this.player.equippedArray[0] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1);
                    this.printToGameConsole(`You equip ${this.player.equippedArray[0].name}.`);
                    this.updatePlayerEquippedTab(0);
                    break;
                case "offhand":
                    if(this.player.equippedArray[1] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[1]);
                    }
                    this.player.equippedArray[1] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1);
                    this.printToGameConsole(`You equip ${this.player.equippedArray[1].name}.`);
                    this.updatePlayerEquippedTab(1);
                    break;
                case "head":
                    if(this.player.equippedArray[2] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[2]);
                    } 
                    this.player.equippedArray[2] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`You equip ${this.player.equippedArray[2].name}.`);
                    this.updatePlayerEquippedTab(2);
                    break;
                case "torso":
                    if(this.player.equippedArray[3] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[3]);
                    } 
                    this.player.equippedArray[3] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`You equip ${this.player.equippedArray[3].name}.`);
                    this.updatePlayerEquippedTab(3);
                    break;
                case "arms":
                    if(this.player.equippedArray[4] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[4]);
                    } 
                    this.player.equippedArray[4] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`You equip ${this.player.equippedArray[4].name}.`);
                    this.updatePlayerEquippedTab(4);
                    break;
                case "legs":
                    if(this.player.equippedArray[5] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[5]);
                    } 
                    this.player.equippedArray[5] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`You equip ${this.player.equippedArray[5].name}.`);
                    this.updatePlayerEquippedTab(5);
                    break;
                case "feet":
                    if(this.player.equippedArray[6] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[6]);
                    } 
                    this.player.equippedArray[6] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`You equip ${this.player.equippedArray[6].name}.`);
                    this.updatePlayerEquippedTab(6);
                    break;
                default:
                    break;
            }
            this.playSoundEffect("./audio/soundEffects/anvil-hit-2-14845.mp3");
            this.calcPlayerAbilitiesAndStats();
            this.updatePlayerInventoryTab(this.player.inventory);
            this.updatePlayerStats();
        }else{
            this.printToGameConsole("Cannot equip during combat!");
        }
    }
    unequip(equippedArrayIndex){
        if(this.player.isInBattle == false){
            if(this.player.equippedArray[equippedArrayIndex] != "Empty"){
                this.printToGameConsole(`You unequip ${this.player.equippedArray[equippedArrayIndex].name}`);
                this.player.inventory.push(this.player.equippedArray[equippedArrayIndex]);
                this.player.equippedArray[equippedArrayIndex] = "Empty";
                this.updatePlayerInventoryTab(this.player.inventory);
                this.updatePlayerEquippedTab(equippedArrayIndex);
                this.calcPlayerAbilitiesAndStats();
                this.updatePlayerStats();
            }else{
                this.printToGameConsole("Nothing equipped!");
            }
        }else{
            this.printToGameConsole("Cannot unequip during combat!");
        }
    }
    calcPlayerAbilitiesAndStats(){
        //reset stats and abilities
        this.player.currentBluntAttack = this.player.baseBluntAttack;
        this.player.currentPierceAttack = this.player.basePierceAttack;
        this.player.currentArcaneAttack = this.player.baseArcaneAttack;
        this.player.currentElementalAttack = this.player.baseElementalAttack;
        this.player.currentBluntDefense = this.player.baseBluntDefense;
        this.player.currentPierceDefense = this.player.basePierceDefense;
        this.player.currentArcaneDefense = this.player.baseArcaneDefense;
        this.player.currentElementalDefense = this.player.baseElementalDefense;
        this.player.currentSpeed = this.player.baseSpeed;
        this.player.abilityArray = [];
        //update stats
        for(let i = 0; i < this.player.equippedArray.length; i++){
            if(this.player.equippedArray[i] != "Empty"){
                this.player.currentBluntAttack = this.player.currentBluntAttack + this.player.equippedArray[i].bluntAttack;
                this.player.currentPierceAttack = this.player.currentPierceAttack + this.player.equippedArray[i].pierceAttack;
                this.player.currentArcaneAttack = this.player.currentArcaneAttack + this.player.equippedArray[i].arcaneAttack;
                this.player.currentElementalAttack = this.player.currentElementalAttack + this.player.equippedArray[i].elementalAttack;
                this.player.currentBluntDefense = this.player.currentBluntDefense + this.player.equippedArray[i].bluntDefense;
                this.player.currentPierceDefense = this.player.currentPierceDefense + this.player.equippedArray[i].pierceDefense;
                this.player.currentArcaneDefense = this.player.currentArcaneDefense + this.player.equippedArray[i].arcaneDefense;
                this.player.currentElementalDefense = this.player.currentElementalDefense + this.player.equippedArray[i].elementalDefense;
                this.player.currentSpeed = this.player.currentSpeed + this.player.equippedArray[i].speed;
            }
        }
        //punch check
        if(this.player.equippedArray[0] == "Empty"){
            this.player.abilityArray.push(new Punch);
        }
        //update abilities
        for(let x = 0; x < this.player.equippedArray.length; x ++){
            if(this.player.equippedArray[x] != "Empty"){
                for(let y = 0; y < this.player.equippedArray[x].abilityArray.length; y ++){
                    this.player.abilityArray.push(this.player.equippedArray[x].abilityArray[y]);
                }
            }
        }
        this.player.abilityArray.push(new Recover);
        this.player.abilityArray.push(new Retreat);
      }
    updatePlayerEquippedTab(equippedArrayIndex){
        if(this.player.equippedArray[equippedArrayIndex] =="Empty"){
            document.getElementById('equip-slot-' + equippedArrayIndex).innerText = "Empty";
        }else{
            document.getElementById('equip-slot-' + equippedArrayIndex).innerText = this.capitalizeFirstLetter(this.player.equippedArray[equippedArrayIndex].name);
        } 
    }
    defeatEnemy(){
        this.player.currentRoom.visited = true;
        this.player.currentRoom = this.player.nextRoom;
        this.battle.loot();
        this.player.currentRoom.enemy = "";
        this.miniMap.draw(this.map.roomArray, this.player.currentRoom);
    }
    useConsumable(inventoryIndex){
        if(this.player.isInBattle == true){
            if(this.player.inventory[inventoryIndex].abilityArray[0].canUse(this.player) != false){
                this.battle.determineFirstTurn(0, inventoryIndex);
                this.player.inventory.splice(inventoryIndex, 1);
                this.updatePlayerInventoryTab(this.player.inventory);
            }
        }else{
            if(this.player.inventory[inventoryIndex].abilityArray[0].activate(this.player)==true){
                this.player.inventory.splice(inventoryIndex, 1);
                this.updatePlayerInventoryTab(this.player.inventory);
                this.updatePlayerStats();
            }
        }
    }
    levelPlayerUp(){
        this.player.level = this.player.level + 1;
        this.printToGameConsole(`Level up! New level: ${this.player.level}.`);
        this.displayLevelUpScreen();
    }
    displayLevelUpScreen(){
        document.getElementById('level-up-screen').style.display = "block";
        document.getElementById("app").style.display = "none";
        this.player.canMoveRoom = false;
    }
    generateNewMap(){
        this.map = new Map(this.player.level);
        this.player.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.player.nextRoom = this.player.currentRoom;
        document.getElementById('location-image').src = this.map.mapEnviorment.imageSrc;
        document.getElementById('location-name').innerText = this.capitalizeFirstLetter(this.map.mapEnviorment.biome);
        this.miniMap.draw(this.map.roomArray, this.player.currentRoom);
    }
    endBattle(){
        if(this.player.currentHP <= 0){
            this.disablePlayerBattleControls();
            setTimeout(()=>{
                document.getElementById('music-player').pause();
                document.getElementById('gameover-screen').style.display = "block";
                document.getElementById("app").style.display = "none";
             }, 2000);
        }else{
            setTimeout(()=>{
                Array.from(document.getElementsByClassName('slot-menu-use-btn')).forEach(btn=>{
                    btn.style.visibility = "visible";
                });
                if(this.battle.battlePhase != "retreat"){
                    this.defeatEnemy();
                }
                this.toggleMap();
                this.updateEnemyStats();
                this.updatePlayerStats();
             }, 2000);
        }
    }
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    scrollToBottom(elementId){
        document.getElementById(elementId).scrollTop = document.getElementById(elementId).scrollHeight;
    }
    printToGameConsole(message){
        document.getElementById("game-console").innerHTML += `<p>${this.capitalizeFirstLetter(message)}</p>`;
        this.scrollToBottom("game-console");
    }
    playSoundEffect(soundEffectPath){
        document.getElementById('sound-effect-player').src = soundEffectPath;
        document.getElementById('sound-effect-player').play();  
    }
    scaleAttributes(vigor, endurance, strength, dexterity, insight, focus){
        let maxHP = (vigor * 5) + (endurance * 1) + (strength * 1) + (dexterity * 1) + (insight * 1) + (focus * 1);
        let maxStamina = (vigor * 1) + (endurance * 3) + (strength * 2) + (dexterity * 2) + (insight * 1) + (focus * 1);
        let maxMagic = (vigor * 1) + (endurance * 3) + (strength * 1) + (dexterity * 1) + (insight * 2) + (focus * 2);
        let baseBluntAttack = (vigor * 1) + (endurance * 1) + (strength * 3) + (dexterity * 1) + (insight * 1) + (focus * 1);
        let basePierceAttack = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 3) + (insight * 1) + (focus * 1);
        let baseArcaneAttack = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 1) + (insight * 3) + (focus * 1);
        let baseElementalAttack = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 1) + (insight * 1) + (focus * 3);
        let baseBluntDefense = (vigor * 1) + (endurance * 1) + (strength * 2) + (dexterity * 1) + (insight * 1) + (focus * 1);
        let basePierceDefense = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 2) + (insight * 1) + (focus * 1);
        let baseArcaneDefense = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 1) + (insight * 2) + (focus * 1);
        let baseElementalDefense = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 1) + (insight * 1) + (focus * 2);
        return [maxHP, maxStamina, maxMagic, baseBluntAttack, basePierceAttack, baseArcaneAttack, baseElementalAttack, baseBluntDefense, basePierceDefense, baseArcaneDefense, baseElementalDefense];
    }
}

