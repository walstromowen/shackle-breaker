import {LinenShirt, LinenPants, Dagger, BlacksmithHammer, Spear, Shortsword, 
        Shiv, Buckler, FireStaff, LightningStaff, IceStaff, ArcaneStaff, LightStaff, DarkStaff, LeatherHelmet, 
        LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
        LeatherBoots, KiteSheild, IronHelmet, IronGuantlets, IronChainmail, 
        IronGreaves, IronBoots, CrystalBall, HealthPotion, StaminaPotion, MagicPotion, 
        ThrowingKnife, PoisonedKnife, Meteorite, Antidote, AloeRemedy, Net,
} from "./items.js";
import {Recover, Punch, Retreat} from "./abilities.js"
import Player from "./player.js";
import Map from "./map.js";
import MiniMap from "./miniMap.js";
import Battle from "./battle.js";

export default class Controller {
    constructor(){
        this.characterCreationArray = ["name", "apperance", "background", "inventoryArray", "attributesArray", "statsArray", "gold"];
        this.map = "";
        this.miniMap = "";
        this.player = "";
        this.battle = "";
        this.encounter = "";
        this.mapBtnArray = [];
        this.battleBtnArray = [];
        this.encounterBtnArray = [];
        this.initialize();
    }
    initialize(){
        this.enableTitleScreenControls();
        this.enableCharacterCreatorScreenControls();
        this.enableGameOverScreenControls();
        this.enableMapTransitionControls();
    }
    enableTitleScreenControls(){
        document.getElementById('title-start-button').addEventListener("click", ()=>{
            document.getElementById("title-screen").style.display = "none";
            document.getElementById("character-creation-screen").style.display = "block";
            this.characterCreatorDetermineUpdateStats();
            this.characterCreatorUpdateInventory();
            document.getElementById("music-player").src = "./audio/Alex-Productions - Epic Cinematic Adventure Vlog _ Eglair.mp3";
            document.getElementById("music-player").play();
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
            this.map = new Map(0, "basic");
            this.miniMap = new MiniMap();
            this.player = new Player(this.characterCreationArray, this.map);
            document.getElementById("app").style.display = "block";
            document.getElementById('player-name').innerText = this.player.name;
            document.getElementById('player-image').src = this.player.apperance;
            document.getElementById('location-name').innerText = this.capitalizeFirstLetter(this.map.mapEnviorment.biome);
            document.getElementById('location-image').src = this.map.mapEnviorment.imageSrc;
            document.getElementById("music-player").src = this.map.mapEnviorment.backgroundMusicSrc;
            document.getElementById("music-player").play();
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
            case "theif":
                this.characterCreatorUpdateStats(6, 6, 3, 7, 5, 3);
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
        document.getElementById("character-creation-speed").innerText = 25;
    }
    characterCreatorUpdateInventory(){
        let inventoryArray = [];
        let value = document.getElementById("background-selection").value;
        switch(value){
            case "traveler":
                inventoryArray.push(new Shortsword, new Buckler, new LinenShirt, new LinenPants, new LeatherBoots);
                this.characterCreationArray[6] = 40;
                break;
            case "blacksmith":
                inventoryArray.push(new BlacksmithHammer, new KiteSheild, new LinenShirt, new LinenPants, new LeatherBoots);
                this.characterCreationArray[6] = 30;
                break;
            case "theif":
                inventoryArray.push(new Dagger, new Shiv, new LinenShirt, new LinenPants, new LeatherBoots);
                this.characterCreationArray[6] = 25;
                break;
            case "hermit":
                inventoryArray.push(new ArcaneStaff, new CrystalBall, new LinenShirt, new LinenPants, new LeatherBoots);
                this.characterCreationArray[6] = 20;
                break;
        }
        let value2 = document.getElementById("keepsake-selection").value;
        switch(value2){
            case "none":
                break;
            case "hunters-tools":
                inventoryArray.push(new ThrowingKnife, new ThrowingKnife, new Net);
                break;
            case "bag-of-potions":
                inventoryArray.push(new HealthPotion, new StaminaPotion , new MagicPotion);
                break;
            case "meteorite":
                inventoryArray.push(new Meteorite);
                break;
            case "herbal-medicine":
                inventoryArray.push(new Antidote, new AloeRemedy);
                break;
            case "assasians-belt":
                inventoryArray.push(new PoisonedKnife, new PoisonedKnife);
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
        document.getElementById("character-creation-gold").innerText = this.characterCreationArray[6];
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
    enableMapTransitionControls(){
        document.getElementById('map-transition-continue-btn').addEventListener("click", ()=>{
            this.generateNewMap("basic");
            document.getElementById('map-transition-screen').style.display = "none";
            document.getElementById("app").style.display = "block";
            this.player.canMoveRoom = true;
        });
        document.getElementById('map-transition-town-btn').addEventListener("click", ()=>{
            //to town
            alert("not ready yet!");
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

        let moveNorthBtn = document.createElement('button');
        let moveSouthBtn = document.createElement('button');
        let moveEastBtn = document.createElement('button');
        let moveWestBtn = document.createElement('button');
        moveNorthBtn.classList.add('action-button');
        moveSouthBtn.classList.add('action-button');
        moveEastBtn.classList.add('action-button');
        moveWestBtn.classList.add('action-button');
        moveNorthBtn.innerText = "Move North";
        moveSouthBtn.innerText = "Move South";
        moveEastBtn.innerText = "Move East";
        moveWestBtn.innerText = "Move West";
        moveNorthBtn.addEventListener('click',()=>{
            if(this.player.canMoveRoom == true){
                this.movePlayerNorth();
            }
        });
        moveSouthBtn.addEventListener('click',()=>{
            if(this.player.canMoveRoom == true){
                this.movePlayerSouth();
            }
        });
        moveEastBtn.addEventListener('click',()=>{
            if(this.player.canMoveRoom == true){
                this.movePlayerEast();
            }
        });
        moveWestBtn.addEventListener('click',()=>{
            if(this.player.canMoveRoom == true){
                this.movePlayerWest();
            }
        });
        document.getElementById('map-button-container').appendChild(moveNorthBtn);
        document.getElementById('map-button-container').appendChild(moveSouthBtn);
        document.getElementById('map-button-container').appendChild(moveEastBtn);
        document.getElementById('map-button-container').appendChild(moveWestBtn);
        this.mapBtnArray.push(moveNorthBtn, moveSouthBtn, moveEastBtn, moveWestBtn);
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
                switch(selectedStat){
                    case "vigor":
                        this.player.vigor = this.player.vigor + 1;
                        break;
                    case "endurance":
                        this.player.endurance = this.player.endurance + 1;
                        break;
                    case "strength":
                        this.player.strength = this.player.strength + 1;
                        break;
                    case "dexterity":
                        this.player.dexterity = this.player.dexterity + 1;
                        break;
                    case "insight":
                        this.player.insight = this.player.insight + 1;
                        break;
                    case "focus":
                        this.player.focus = this.player.focus + 1;
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
                this.calcPlayerAbilitiesAndStats();
                this.updatePlayerStats();
                document.getElementById("app").style.display = "block";
                document.getElementById('level-up-screen').style.display = "none";
                this.player.canMoveRoom = true;
            }
        });
    }
    enablePlayerBattleControls(){
        //remove old buttons
        for(let i = 0; i < this.battleBtnArray.length; i++){
            let oldBtn = document.getElementById('battle-button-container').querySelector('button');
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
        document.getElementById('battle-button-container').style.display = "flex";
        document.getElementById('battle-button-container').style.visibility = "visible";// can remove?
        Array.from(document.getElementsByClassName('slot-menu-btn')).forEach(btn=>{
            btn.style.visibility = "visible";
        });
    }
    disablePlayerBattleControls(){
        document.getElementById('battle-button-container').style.visibility = "hidden";
        //Array.from used to convert HTML collection to regular array so forEach can be used -> hides use btns on items
        Array.from(document.getElementsByClassName('slot-menu-btn')).forEach(btn=>{
            btn.style.visibility = "hidden";
        });
    }
    enablePlayerEncounterControls(){
        for(let i = 0; i < this.encounterBtnArray.length; i++){
            let oldBtn = document.getElementById('encounter-button-container').querySelector('button');
                oldBtn.remove();
        }
        this.encounterBtnArray = [];
        for(let x = 0; x < this.encounter.decisionArray.length; x++){
            let decisionBtn = document.createElement('button');
            decisionBtn.classList.add('action-button');
            decisionBtn.innerText = this.capitalizeFirstLetter(this.encounter.decisionArray[x].name);
            decisionBtn.addEventListener('click', ()=>{
                this.encounter.makeDecision(this.player, x);
            });
            document.getElementById('encounter-button-container').appendChild(decisionBtn);
            this.encounterBtnArray.push(decisionBtn);
         }
         document.getElementById('map-button-container').style.display = "none";
         document.getElementById('encounter-button-container').style.display = "flex";
         document.getElementById('encounter-button-container').style.visibility = "visible";// can remove?
         Array.from(document.getElementsByClassName('slot-menu-btn')).forEach(btn=>{
             btn.style.visibility = "visible";
         });
    }
    disablePlayerEncounterControls(){
        document.getElementById('encounter-button-container').style.visibility = "hidden";
        //Array.from used to convert HTML collection to regular array so forEach can be used -> hides use btns on items
        Array.from(document.getElementsByClassName('slot-menu-btn')).forEach(btn=>{
            btn.style.visibility = "hidden";
        });
    }
    toggleMap(){
        document.getElementById('map-button-container').style.display = "flex";
        document.getElementById('battle-button-container').style.display = "none";
        document.getElementById('encounter-button-container').style.display = "none";
        document.getElementById("location-name-container").style.display = "block";
        document.getElementById("enemy-name-container").style.display = "none";
        document.getElementById("encounter-name-container").style.display = "none";
        document.getElementById("mini-map-container").style.display = "block";
        document.getElementById("player-image-container").style.display = "none";
        document.getElementById("enemy-image-container").style.display = "none";
        document.getElementById("location-image-container").style.display = "block";
        document.getElementById("enemy-main-stats-container").style.display = "none";
        document.getElementById("encounter-image-container").style.display = "none";
        document.getElementById("merchant-inventory-container").style.display = "none";
        this.miniMap.resizeCanvas();
        this.miniMap.draw(this.map.roomArray, this.player.currentRoom);
        this.player.isInBattle = false;
        this.player.canMoveRoom = true;
        this.updatePlayerInventoryTab(this.player.inventory);
    }
    toggleBattle(enemy){
        this.battle = new Battle(this.player, enemy);
        this.player.canMoveRoom = false;
        this.updateEnemyStats();
        setTimeout(()=>{
            document.getElementById('enemy-name').innerText = this.capitalizeFirstLetter(this.battle.enemy.name);
            document.getElementById('enemy-image').src = this.battle.enemy.imageSrc;
            document.getElementById('map-button-container').style.display = "none";
            document.getElementById('battle-button-container').style.display = "flex";
            document.getElementById('encounter-button-container').style.display = "none";
            document.getElementById("location-name-container").style.display = "none";
            document.getElementById("enemy-name-container").style.display = "block";
            document.getElementById("encounter-name-container").style.display = "none";
            document.getElementById("mini-map-container").style.display = "none";
            document.getElementById("player-image-container").style.display = "block";
            document.getElementById("enemy-image-container").style.display = "block";
            document.getElementById("location-image-container").style.display = "none";
            document.getElementById("enemy-main-stats-container").style.display = "block";
            document.getElementById("encounter-image-container").style.display = "none";
            this.enablePlayerBattleControls();
            if(this.battle.enemy.name.charAt(0) == "a" || this.battle.enemy.name.charAt(0) == "e" || this.battle.enemy.name.charAt(0) == "i" || this.battle.enemy.name.charAt(0) == "o" || this.battle.enemy.name.charAt(0) == "u"){
                this.printToGameConsole(`${this.player.name} encounters an ${this.battle.enemy.name}!`);
            }else{
                this.printToGameConsole(`${this.player.name} encounters a ${this.battle.enemy.name}!`);
            }
            document.getElementById('music-player').pause();
            document.getElementById('music-player').src = "./audio/battle-of-the-dragons-8037.mp3";
            document.getElementById('music-player').play();
            this.player.isInBattle = true;
        }, 2000);
    }
    toggleEncounter(encounter){
        this.encounter = encounter;
        this.player.canMoveRoom = false;
        setTimeout(()=>{
            document.getElementById('encounter-name').innerText = this.capitalizeFirstLetter(this.encounter.name);
            document.getElementById('encounter-image').src = this.encounter.imageSrc;
            document.getElementById("location-name-container").style.display = "none";
            document.getElementById("encounter-name-container").style.display = "block";
            document.getElementById("mini-map-container").style.display = "none";
            document.getElementById("player-image-container").style.display = "block";
            document.getElementById("location-image-container").style.display = "none";
            document.getElementById("encounter-image-container").style.display = "block";
            this.enablePlayerEncounterControls();
            this.printToGameConsole(this.encounter.message);
        }, 2000);
    }
    toggleMapTransitionScreen(){
        this.player.canMoveRoom = false;
        setTimeout(()=>{
            document.getElementById('music-player').pause();
            document.getElementById('map-transition-screen').style.display = "block";
            document.getElementById("app").style.display = "none";
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
            slotMenuUseBtn.classList.add('slot-menu-btn');//equipment specific
            if(this.player.isInBattle == true){
                slotMenuUseBtn.style.visibility = "hidden";
            }
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
        document.getElementById("current-gold").innerText = this.player.currentGold;
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
        for(let i = -1; i < this.player.statusArray.length; i++){
            let oldIcon = document.getElementById('player-status-icon-container').querySelector('img');
            if(oldIcon !== null){
                oldIcon.remove();
            } 
        }
        for(let i = 0; i < this.player.statusArray.length; i++){
            if(this.player.statusArray[i].iconSrc != ""){
                let statusIcon = document.createElement('img');
                statusIcon.classList.add('status-icon');
                statusIcon.src = this.player.statusArray[i].iconSrc;
                document.getElementById('player-status-icon-container').appendChild(statusIcon);
            }
        }
        if(this.player.currentXP >= Math.floor(((this.player.level + 10)**2)*0.5)){
            this.player.currentXP = this.player.currentXP - Math.floor(((this.player.level + 10)**2)*0.5);
            this.levelPlayerUp();
        }
    }
    updateEnemyStats(){
        document.getElementById('current-health-enemy').innerText = this.battle.enemy.currentHP;
        document.getElementById('current-stamina-enemy').innerText = this.battle.enemy.currentStamina;
        document.getElementById('current-magic-enemy').innerText = this.battle.enemy.currentMagic;
        document.getElementById('health-bar-enemy-progress').style.width = Math.floor(this.battle.enemy.currentHP/this.battle.enemy.maxHP*100) + "%";
        document.getElementById('stamina-bar-enemy-progress').style.width = Math.floor(this.battle.enemy.currentStamina/this.battle.enemy.maxStamina*100) + "%";
        document.getElementById('magic-bar-enemy-progress').style.width = Math.floor(this.battle.enemy.currentMagic/this.battle.enemy.maxMagic*100) + "%";
        for(let i = -1; i < this.battle.enemy.statusArray.length; i++){
            let oldIcon = document.getElementById('enemy-status-icon-container').querySelector('img');
            if(oldIcon !== null){
                oldIcon.remove();
            } 
        }
        for(let i = 0; i < this.battle.enemy.statusArray.length; i++){
            if(this.battle.enemy.statusArray[i].iconSrc != ""){
                let statusIcon = document.createElement('img');
                statusIcon.classList.add('status-icon');
                statusIcon.src = this.battle.enemy.statusArray[i].iconSrc;
                document.getElementById('enemy-status-icon-container').appendChild(statusIcon);
            }
        }
    }
    animateVitalBar(entity, vitalBarType){
        if(entity === this.player){
            document.getElementById(`${vitalBarType}-bar-player-progress`).classList.toggle("is-flashing");
            setTimeout(()=>{
                document.getElementById(`${vitalBarType}-bar-player-progress`).classList.toggle("is-flashing");
            }, 500);
        }
        else{
            document.getElementById(`${vitalBarType}-bar-enemy-progress`).classList.toggle("is-flashing");
            setTimeout(()=>{
                document.getElementById(`${vitalBarType}-bar-enemy-progress`).classList.toggle("is-flashing");
            }, 500);
        }
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
                this.printToGameConsole("something approaches...");
                this.toggleBattle(nextRoom.enemy);
                return; 
            }
            if(nextRoom.encounter !== ""){
                this.player.nextRoom = nextRoom;
                this.printToGameConsole("something is ahead...");
                this.toggleEncounter(nextRoom.encounter);
                return; 
            }
            if(nextRoom.status == "visited"){
                if(Math.floor(Math.random()*20) <= 2){
                    this.player.nextRoom = nextRoom;
                    this.printToGameConsole("something approaches...");
                    nextRoom.enemy = this.map.mapEnviorment.generateEnemy(this.player.level);
                    this.toggleBattle(nextRoom.enemy);
                    return;
                }
            }
            this.player.currentRoom.status = "visited";
            this.player.currentRoom = nextRoom;
            let stamina = Math.floor(this.player.maxStamina * 0.1);
            let magic = Math.floor(this.player.maxMagic * 0.1);
            if(this.player.currentStamina + stamina > this.player.maxStamina){stamina = this.player.maxStamina - this.player.currentStamina;}
            if(this.player.currentMagic + magic > this.player.maxMagic){magic = this.player.maxMagic - this.player.currentMagic;}
            this.player.currentStamina = this.player.currentStamina + stamina;
            this.player.currentMagic = this.player.currentMagic + magic;
            this.miniMap.draw(this.map.roomArray, this.player.currentRoom);
            if(this.player.currentRoom.isExit == true){
                this.printToGameConsole(`${this.player.name} finds an exit!`);
                this.toggleMapTransitionScreen();
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
                    this.printToGameConsole(`${this.player.name} equips ${this.player.equippedArray[0].name}.`);
                    this.updatePlayerEquippedTab(0);
                    break;
                case "offhand":
                    if(this.player.equippedArray[1] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[1]);
                    }
                    this.player.equippedArray[1] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1);
                    this.printToGameConsole(`${this.player.name} equips ${this.player.equippedArray[1].name}.`);
                    this.updatePlayerEquippedTab(1);
                    break;
                case "head":
                    if(this.player.equippedArray[2] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[2]);
                    } 
                    this.player.equippedArray[2] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.player.name} equips ${this.player.equippedArray[2].name}.`);
                    this.updatePlayerEquippedTab(2);
                    break;
                case "torso":
                    if(this.player.equippedArray[3] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[3]);
                    } 
                    this.player.equippedArray[3] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.player.name} equips ${this.player.equippedArray[3].name}.`);
                    this.updatePlayerEquippedTab(3);
                    break;
                case "arms":
                    if(this.player.equippedArray[4] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[4]);
                    } 
                    this.player.equippedArray[4] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.player.name} equips ${this.player.equippedArray[4].name}.`);
                    this.updatePlayerEquippedTab(4);
                    break;
                case "legs":
                    if(this.player.equippedArray[5] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[5]);
                    } 
                    this.player.equippedArray[5] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.player.name} equips ${this.player.equippedArray[5].name}.`);
                    this.updatePlayerEquippedTab(5);
                    break;
                case "feet":
                    if(this.player.equippedArray[6] !== "Empty"){
                        this.player.inventory.push(this.player.equippedArray[6]);
                    } 
                    this.player.equippedArray[6] = this.player.inventory[inventoryIndex];
                    this.player.inventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.player.name} equips ${this.player.equippedArray[6].name}.`);
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
                this.printToGameConsole(`${this.player.name} unequips ${this.player.equippedArray[equippedArrayIndex].name}`);
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
    completeRoom(){
        this.player.currentRoom.status = "visited";
        this.player.currentRoom = this.player.nextRoom;
        this.player.currentRoom.enemy = "";
        this.player.currentRoom.encounter = "";
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
            if(this.player.inventory[inventoryIndex].abilityArray[0].canUse(this.player) != false){
                this.player.inventory[inventoryIndex].abilityArray[0].activate(this.player)
                this.player.inventory.splice(inventoryIndex, 1);
                this.updatePlayerInventoryTab(this.player.inventory);
                this.updatePlayerStats();
            }
        }
    }
    levelPlayerUp(){
        this.player.level = this.player.level + 1;
        this.map.increaseAllEnemyLevels(this.player.level);
        this.printToGameConsole(`Level up! New level: ${this.player.level}.`);
        this.displayLevelUpScreen();
    }
    displayLevelUpScreen(){
        document.getElementById('level-up-screen').style.display = "block";
        document.getElementById("app").style.display = "none";

        this.player.canMoveRoom = false;
    }
    generateNewMap(biome){
        this.map = new Map(this.player.level, biome);
        this.player.currentRoom = this.map.roomArray[this.map.playerSpawnIndex];
        this.player.nextRoom = this.player.currentRoom;
        document.getElementById('location-image').src = this.map.mapEnviorment.imageSrc;
        document.getElementById('location-name').innerText = this.capitalizeFirstLetter(this.map.mapEnviorment.biome);
        this.miniMap.draw(this.map.roomArray, this.player.currentRoom);
        document.getElementById("music-player").src = this.map.mapEnviorment.backgroundMusicSrc;
        document.getElementById('music-player').play();
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
                Array.from(document.getElementsByClassName('slot-menu-btn')).forEach(btn=>{
                    btn.style.visibility = "visible";
                });
                if(this.battle.battlePhase != "retreat"){
                    this.battle.loot();
                    this.completeRoom();
                }else{
                    this.player.nextRoom.status = "retreated";
                }
                document.getElementById("music-player").src = this.map.mapEnviorment.backgroundMusicSrc;
                document.getElementById("music-player").play();
                this.toggleMap();
                this.updateEnemyStats();
                this.updatePlayerStats();
             }, 2000);
        }
    }
    endEncounter(battleFlag){
        this.updatePlayerStats();
        this.disablePlayerEncounterControls();
        if(this.player.currentHP <= 0){
            setTimeout(()=>{
                document.getElementById('music-player').pause();
                document.getElementById('gameover-screen').style.display = "block";
                document.getElementById("app").style.display = "none";
             }, 2000);
        }else{
            if(battleFlag == true){
                this.player.nextRoom.encounter = "";
                return;
            }
            else{
                setTimeout(()=>{
                    Array.from(document.getElementsByClassName('slot-menu-btn')).forEach(btn=>{
                        btn.style.visibility = "visible";
                    });
                    this.toggleMap();
                    this.completeRoom();
                    //this.updateEnemyStats();   MAYBE ADD?
                    this.updatePlayerStats();
                }, 2000);
            }
        }
    }
    toggleTrading(merchantInventory){
         for(let i = -1; i < merchantInventory.length; i++){
                let oldSlot = document.getElementById('inventory-merchant').querySelector('p');
                if(oldSlot !== null){
                    oldSlot.remove();
                } 
            }
            for(let i = 0; i < merchantInventory.length; i++){
                let inventorySlot = document.createElement('p');
                let inventorySlotMenu = document.createElement('div');
                let slotMenuBuyBtn = document.createElement('div');
                inventorySlot.classList.add('inventory-slot');
                inventorySlotMenu.classList.add('inventory-slot-menu');
                slotMenuBuyBtn.classList.add('slot-menu-btn');
                
                inventorySlot.innerText = `${merchantInventory[i].price} G: ${this.capitalizeFirstLetter(merchantInventory[i].name)}`;
                inventorySlot.appendChild(inventorySlotMenu);
                inventorySlotMenu.appendChild(slotMenuBuyBtn);
                document.getElementById('inventory-merchant').appendChild(inventorySlot);
                slotMenuBuyBtn.innerText = "Buy";
                slotMenuBuyBtn.addEventListener('click', ()=>{ 
                    this.buyFromMerchant(merchantInventory, i);
                });
            }
    }
    buyFromMerchant(remainingInventory, index){
        if(this.player.currentGold >= remainingInventory[index].price){
            this.player.inventory.push(remainingInventory[index]);
            this.player.currentGold -= remainingInventory[index].price;
            this.printToGameConsole(`${this.player.name} buys ${this.capitalizeFirstLetter(remainingInventory[index].name)}`)
            remainingInventory.splice(index, 1);
            this.updatePlayerInventoryTab(this.player.inventory);
            this.toggleTrading(remainingInventory);
        }else{
            this.printToGameConsole(`Not enough gold to buy ${this.capitalizeFirstLetter(remainingInventory[index].name)}`)
        }
    }
    toggleElementClass(elementId, cssClass){
        document.getElementById(elementId).classList.toggle(cssClass);
    }
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    scrollToBottom(elementId){
        document.getElementById(elementId).scrollTop = document.getElementById(elementId).scrollHeight;
    }
    printToGameConsole(message){
        document.getElementById("game-console").innerHTML += `<p class='console-message'>${this.capitalizeFirstLetter(message)}</p>`;
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

