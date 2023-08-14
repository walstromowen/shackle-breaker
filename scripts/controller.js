import {LinenShirt, LinenPants, WoodDagger, WoodSpear, WoodSword, 
        WoodSideDagger, WoodSheild, WoodFireStaff, LeatherHelmet, 
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, IronSheild, IronHelmet, IronGuantlets, IronChainmail, 
        IronGreaves, IronBoots, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedThrowingKnife, Meteorite} from "./items.js";
import Player from "./player.js";
import Map from "./map.js";
import MiniMap from "./miniMap.js";
//import Battle from "./battle.js";

export default class Controller {
    constructor(){
        this.characterCreationArray = ["name", "apperance", "background", [], 12, 12, 12];
        this.player = "";
        this.map = "";
        this.miniMap = "";
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
            this.player = new Player(this.characterCreationArray);
            this.map = new Map(this.player.level);
            this.miniMap = new MiniMap();
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
                        this.player.moveNorth();
                        break;
                    case 'a':
                        this.player.moveWest();
                        break;
                    case 's':
                        this.player.moveSouth();
                        break;
                    case 'd':
                        this.player.moveEast();
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
                this.player.unequip(i);
            });
        }
    }
    enableLevelUpControls(){
        let levelCheck = false;
        let fullHeal = () =>{
            this.player.currentHP = this.player.maxHP;
            this.player.currentStamina = this.player.maxStamina;
            this.player.currentMagic = this.player.maxMagic;
        }
        document.getElementById('increase-hp-btn').addEventListener('click', ()=>{
            fullHeal();
            this.player.currentHP = this.player.maxHP + 2;
            levelCheck = true;
            document.getElementById('increase-hp-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-stamina-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-magic-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-stamina-btn').addEventListener('click', ()=>{
            fullHeal();
            this.player.currentStamina = this.player.maxStamina + 2;
            levelCheck = true;
            document.getElementById('increase-hp-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-stamina-btn').classList.add("title-screen-button-selected");
            document.getElementById('increase-magic-btn').classList.remove("title-screen-button-selected");
        });
        document.getElementById('increase-magic-btn').addEventListener('click', ()=>{
            fullHeal();
            this.player.currentMagic = this.player.maxMagic + 2;
            levelCheck = true;
            document.getElementById('increase-hp-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-stamina-btn').classList.remove("title-screen-button-selected");
            document.getElementById('increase-magic-btn').classList.add("title-screen-button-selected");
        });
        document.getElementById('submit-level-btn').addEventListener('click', ()=>{
            if(levelCheck == true){
                this.player.maxHP = this.player.currentHP + 1;
                this.player.maxStamina = this.player.currentStamina + 1;
                this.player.maxMagic = this.player.currentMagic + 1;
                fullHeal();
                document.getElementById("app").style.display = "block";
                document.getElementById('level-up-screen').style.display = "none";
                this.musicPlayer.play();
                this.updatePlayerStats();
                this.player.canMoveRoom = true;
            }
        });
    }
    characterCreatorDetermineUpdateStats(){
        let value = document.getElementById("background-selection").value;
        switch(value){
            case "traveler":
                this.characterCreatorUpdateStats(12, 12, 12);
                break;
            case "blacksmith":
                this.characterCreatorUpdateStats(15, 12, 8);
                break;
            case "ranger":
                this.characterCreatorUpdateStats(12, 15, 8);
                break;
            case "hermit":
                this.characterCreatorUpdateStats(12, 8, 15);
                break;
        }
    }
    characterCreatorUpdateStats(health, stamina, magic){
        this.characterCreationArray[4] = health;
        this.characterCreationArray[5] = stamina;
        this.characterCreationArray[6] = magic;
        document.getElementById("character-creation-health").innerText = this.characterCreationArray[4];
        document.getElementById("character-creation-stamina").innerText = this.characterCreationArray[5];
        document.getElementById("character-creation-magic").innerText = this.characterCreationArray[6];
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
        this.miniMap.draw(this.player);
        this.player.isInBattle = false;
        this.player.canMoveRoom = true;
        this.updatePlayerInventoryTab(this.player.inventory);
    }
    updatePlayerInventoryTab(inventory){
        for(var i = -1; i < inventory.length; i++){
            let oldSlot = document.getElementById('inventory-tab').querySelector('p');
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
            document.getElementById('inventory-tab').appendChild(inventorySlot);
            if(inventory[i].type != "consumable"){
                slotMenuUseBtn.innerText = "Equip";//equipment specific
                slotMenuUseBtn.addEventListener('click', ()=>{ //equipment specific
                    this.player.equip(i);
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
        this.scrollToBottom("game-console");
    }
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    scrollToBottom(elementId){
        document.getElementById(elementId).scrollTop = document.getElementById(elementId).scrollHeight;
    }
    printToGameConsole(message){
        document.getElementById("game-console").innerHTML += `<p>${capitalizeFirstLetter(message)}</p>`;
        scrollToBottom("game-console");
    }
}

