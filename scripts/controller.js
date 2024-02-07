import {LinenShirt, LinenPants, Dagger, BlacksmithHammer, Spear, Shortsword, Longsword, Handaxe, WarHammer, NightbladeSword,
    Shiv, Buckler, FireStaff, LightningStaff, IceStaff, ArcaneStaff, LightStaff, DarkStaff, LeatherHelmet, NightbladeHelm, NightbladeChestplate,
    LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
    LeatherBoots, KiteShield, IronHelmet, IronGauntlets, IronChainmail, Shortbow, ForestStaff,
    IronGreaves, IronBoots, PanzerianGuantlets, CrystalBall, ClothHood, ClothRobe, HealthPotion, StaminaPotion, MagicPotion, 
    ThrowingKnife, PoisonedKnife, Meteorite, Antidote, AloeRemedy, Net, SmokeBomb, Hide, Bandage, FrostbiteTonic, ParalysisTonic, PineWood, TigerClaw, DogPaw, HawkTalons
    } from "./items.js";
import {Recover, Punch, Retreat, Dodge} from "./abilities.js"
import Character from "./character.js";
import Map from "./map.js";
import MiniMap from "./miniMap.js";
import Battle from "./battle.js";

export default class Controller {
    constructor(){
        this.wanderingCompanions = [
            new Character(["Gadrum Glorysun", "./media/companion-warrior-male-2.jpg", "mercenary", [5,5,5,5,5,5], [new Shortsword, new Buckler, "Empty", new LinenShirt, "Empty", new LinenPants, new LeatherBoots]]),
            new Character(["William Stillstar", "./media/mage-1.jpg", "mercenary", [5,5,5,5,5,5],  [new Longsword, "Empty", "Empty", new LinenShirt, "Empty", new LinenPants, new LeatherBoots]]),
            new Character(["Solair Sulabras", "./media/companion-knight-male-1.jpg", "mercenary", [5,5,5,5,5,5],  [new Shortsword, new KiteShield, new LeatherHelmet, new LinenShirt, "Empty", new LinenPants, new LeatherBoots]]),
            new Character(["Julian Memira", "./media/companion-mage-male-1.jpg", "mercenary", [5,5,5,5,5,5],  [new DarkStaff, "Empty", new ClothHood, new ClothRobe, "Empty", new LinenPants, new LeatherBoots]]),
            new Character(["Nicholi Ninarsk", "./media/companion-warrior-male-1.jpg", "mercenary", [5,5,5,5,5,5],  [new Handaxe, new Handaxe, new LeatherHelmet, new LinenShirt, "Empty", new LinenPants, new LeatherBoots]]),
            new Character(["Ragnar Ninarsk", "./media/companion-warrior-male-1.jpg", "mercenary", [5,5,5,5,5,5],  [new IceStaff, "Empty", new LeatherHelmet, new LinenShirt, "Empty", new LinenPants, new LeatherBoots]]),
            new Character(["Revan Sekrav", "./media/companion-rogue-male-1.jpg", "mercenary", [5,5,5,5,5,5],  [new Dagger, new Shiv, new LeatherHood, new LinenShirt, new LeatherGloves, new LinenPants, new LeatherBoots]]),
            new Character(["Alina Sulabras", "./media/companion-knight-female-1.jpg", "mercenary", [5,5,5,5,5,5], [new Shortsword, new KiteShield, new LeatherHelmet, new LinenShirt, "Empty", new LinenPants, new LeatherBoots]]),
            new Character(["Ariannel Memira", "./media/companion-mage-female-1.jpg", "mercenary", [5,5,5,5,5,5], [new LightStaff, "Empty", new ClothHood, new ClothRobe, "Empty", new LinenPants, new LeatherBoots]]),
            new Character(["Gwen Swallowtail", "./media/companion-rogue-female-1.jpg", "mercenary", [5,5,5,5,5,5], [new Shortbow, "Empty", new LeatherHood, new LinenShirt, "Empty", new LinenPants, new LeatherBoots]])
        ];
        this.characterCreationArray = ["name", "apperance", "background", "attributesArray", "equippedArray"];
        this.tempCompanionValue = "none";
        this.map = "";
        this.miniMap = "";
        this.battle = "";
        this.party = []
        this.partyInventory = [];
        this.partyGold = 0;
        this.encounter = "";
        this.mapBtnArray = [];
        this.battleBtnArray = [];
        this.encounterBtnArray = [];
        this.isInBattle = false;
        this.isInEncounter = false;
        this.isInTrade = false;
        this.canMoveRoom = true;
        this.currentRoom = "";
        this.nextRoom = "";
        this.gameStage = 0;
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
            this.characterCreatorUpdateBackgroundLore();
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
            if(document.getElementById("name-selection").value == ""){
                this.characterCreationArray[0] = "Shackle Breaker";
            }
            this.characterCreationArray[1] = document.getElementById("apperance-selection").value;
            this.characterCreationArray[2] = document.getElementById("background-selection").value;
            this.party[0] = new Character(this.characterCreationArray);
            if(this.tempCompanionValue != "none"){
                this.party.push(this.tempCompanionValue);
            }
            //this.party.push(new Character(["kurtus", "media/kurty.jpg", "traveler", [100, 100, 100, 100, 100, 100], [new Shortsword, "Empty", "Empty", new LinenShirt, "Empty", new LinenPants, new LeatherBoots]]));
            this.map = new Map("mysterious dungeon", "small dungeon");
            //this.map = new Map("altus castle", "boss1");
            //this.map = new Map("basic", "random");
            this.miniMap = new MiniMap();
            this.map.mapEnviorment.terrain.onload = ()=>{
                this.initializeRooms(this.map);
                document.getElementById('location-name').innerText = this.capitalizeFirstLetter(this.map.mapEnviorment.biome);
                document.getElementById('location-image').src = this.map.mapEnviorment.imageSrc;
                this.updateCharacterStats();
                this.updateParty();
                this.enableKeyControls();
                this.enablePartyMapControls();
                this.enableInventoryControls();
                this.enableLevelUpControls();
                this.updatePartyInventoryTab(this.partyInventory);
                document.getElementById("music-player").src = this.map.mapEnviorment.backgroundMusicSrc;
                document.getElementById("music-player").play();
                document.getElementById("app").style.display = "block";
                this.toggleMap();
            }
        });
        document.getElementById("apperance-selection").addEventListener("change", ()=>{
            document.getElementById("character-creator-apperance-image").src = document.getElementById("apperance-selection").value; 
        });
        document.getElementById("background-selection").addEventListener("change", ()=>{
            this.characterCreatorDetermineUpdateStats();
            this.characterCreatorUpdateInventory();
            this.characterCreatorUpdateBackgroundLore();
        });
        document.getElementById("keepsake-selection").addEventListener("change", ()=>{
            this.characterCreatorUpdateInventory();
        });
        document.getElementById("companion-selection").addEventListener("change", ()=>{
            if(this.tempCompanionValue.origin == 'mercenary'){
                this.wanderingCompanions.push(this.tempCompanionValue);
            }
            this.characterCreatorUpdateCompanion();
        });
    }
    characterCreatorDetermineUpdateStats(){
        let value = document.getElementById("background-selection").value;
        switch(value){
            case "traveler":
                this.characterCreatorUpdateStats(5, 5, 5, 5, 5, 5);
                break;
            case "blacksmith":
                this.characterCreatorUpdateStats(8, 5, 5, 3, 4, 5);
                break;
            case "ranger":
                this.characterCreatorUpdateStats(5, 8, 5, 5, 3, 4);
                break;
            case "scholar":
                this.characterCreatorUpdateStats(5, 5, 3, 4, 8, 5);
                break;
            case "warrior":
                this.characterCreatorUpdateStats(5, 5, 8, 5, 3, 4);
                break;
            case "thief":
                this.characterCreatorUpdateStats(5, 5, 4, 8, 5, 3);
                break;
            case "hermit":
                this.characterCreatorUpdateStats(5, 5, 3, 4, 5, 8);
                break;
        }
    }
    characterCreatorUpdateStats(vigor, endurance, strength, dexterity, insight, focus){
        this.characterCreationArray[3] = [vigor, endurance, strength, dexterity, insight, focus];
        document.getElementById("character-creation-vigor").innerText = this.characterCreationArray[3][0];
        document.getElementById("character-creation-endurance").innerText = this.characterCreationArray[3][1];
        document.getElementById("character-creation-strength").innerText = this.characterCreationArray[3][2];
        document.getElementById("character-creation-dexterity").innerText = this.characterCreationArray[3][3];
        document.getElementById("character-creation-insight").innerText = this.characterCreationArray[3][4];
        document.getElementById("character-creation-focus").innerText = this.characterCreationArray[3][5];
        document.getElementById("character-creation-health").innerText = (vigor * 10) + (endurance * 2) + (strength * 2) + (dexterity * 2) + (insight * 2) + (focus * 2);
        document.getElementById("character-creation-stamina").innerText = (vigor * 2) + (endurance * 5) + (strength * 3) + (dexterity * 3) + (insight * 1) + (focus * 1);
        document.getElementById("character-creation-magic").innerText = (vigor * 2) + (endurance * 5) + (strength * 1) + (dexterity * 1) + (insight * 3) + (focus * 3);
        document.getElementById("character-creation-blunt-attack").innerText = (vigor * 1) + (endurance * 1) + (strength * 3) + (dexterity * 2) + (insight * 2) + (focus * 2);
        document.getElementById("character-creation-pierce-attack").innerText = (vigor * 1) + (endurance * 1) + (strength * 2) + (dexterity * 3) + (insight * 2) + (focus * 2);
        document.getElementById("character-creation-arcane-attack").innerText = (vigor * 1) + (endurance * 1) + (strength * 2) + (dexterity * 2) + (insight * 3) + (focus * 2);
        document.getElementById("character-creation-element-attack").innerText = (vigor * 1) + (endurance * 1) + (strength * 2) + (dexterity * 2) + (insight * 2) + (focus * 3);
        document.getElementById("character-creation-blunt-defense").innerText = (vigor * 1) + (endurance * 1) + (strength * 2) + (dexterity * 1) + (insight * 1) + (focus * 1);
        document.getElementById("character-creation-pierce-defense").innerText = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 2) + (insight * 1) + (focus * 1);
        document.getElementById("character-creation-arcane-defense").innerText = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 1) + (insight * 2) + (focus * 1);
        document.getElementById("character-creation-element-defense").innerText = (vigor * 1) + (endurance * 1) + (strength * 1) + (dexterity * 1) + (insight * 1) + (focus * 2);
        document.getElementById("character-creation-speed").innerText = (vigor * 0) + (endurance * 0) + (strength * 0) + (dexterity * 0) + (insight * 0) + (focus * 0) + 25;
        document.getElementById("character-creation-evasion").innerText = (vigor * 0) + (endurance * 0) + (strength * 0) + (dexterity * 0) + (insight * 0) + (focus * 0) + 10;
    }
    characterCreatorUpdateInventory(){
        let equippedArray = [];
        let inventoryArray = [];
        let value = document.getElementById("background-selection").value;
        switch(value){
            case "traveler":
                equippedArray.push(new Shortsword, "Empty", new LeatherHood, new LinenShirt, "Empty", new LinenPants, new LeatherBoots);
                this.partyGold = 350;
                break;
            case "blacksmith":
                equippedArray.push(new BlacksmithHammer, "Empty", new IronHelmet, new LinenShirt, "Empty", new LinenPants, new LeatherBoots);
                this.partyGold = 250;
                break;
            case "ranger":
                equippedArray.push(new Shortbow, "Empty", new LeatherHood, new LinenShirt, "Empty", new LinenPants, new LeatherBoots);
                this.partyGold = 250;
                break;
            case "scholar":
                equippedArray.push(new ArcaneStaff, "Empty", new ClothHood, new LinenShirt, "Empty", new LinenPants, new LeatherBoots);
                this.partyGold = 250;
                break;
            case "warrior":
                equippedArray.push(new Handaxe, "Empty", new LeatherHelmet, new LinenShirt, "Empty", new LinenPants, new LeatherBoots);
                this.partyGold = 250;
                break;
            case "thief":
                equippedArray.push(new Dagger, new Shiv, new LeatherHood, new LinenShirt, "Empty", new LinenPants, new LeatherBoots);
                this.partyGold = 250;
                break;
            case "hermit":
                equippedArray.push(new FireStaff, "Empty", new ClothHood, new LinenShirt, "Empty",  new LinenPants, new LeatherBoots);
                this.partyGold = 250;
                break;
        }
        let value2 = document.getElementById("keepsake-selection").value;
        switch(value2){
            case "none":
                break;
            case "hunters-tools":
                inventoryArray.push(new HealthPotion, new ThrowingKnife, new Net);
                break;
            case "bag-of-potions":
                inventoryArray.push(new HealthPotion, new StaminaPotion , new MagicPotion);
                break;
            case "meteorite":
                inventoryArray.push(new Meteorite);
                break;
            case "herbal-medicine":
                inventoryArray.push(new HealthPotion, new Antidote, new AloeRemedy);
                break;
            case "assasians-belt":
                inventoryArray.push(new HealthPotion, new PoisonedKnife, new SmokeBomb);
                break;
            case "artisans-tools":
                inventoryArray.push(new HealthPotion, new PineWood, new Hide);
                break;
            case "alchemists-vials":
                inventoryArray.push(new HealthPotion, new ParalysisTonic, new FrostbiteTonic);
                break;
            case "first-aid-kit":
                inventoryArray.push(new HealthPotion, new Bandage);
                break;
              
            
        }
        Array.from(document.getElementById("character-creation-inventory").getElementsByClassName("inventory-slot-long")).forEach(slot=>{
            slot.remove();
        });
        for(let i = 0; i < equippedArray.length; i++){
            if(equippedArray[i] != "Empty"){
                let inventorySlot = document.createElement('div');
                inventorySlot.classList.add('inventory-slot-long');
                inventorySlot.innerText = this.capitalizeFirstLetter(equippedArray[i].name);
                document.getElementById("character-creation-inventory").appendChild(inventorySlot);
            }
        }
        for(let i = 0; i < inventoryArray.length; i++){
            let inventorySlot = document.createElement('div');
            inventorySlot.classList.add('inventory-slot-long');
            inventorySlot.innerText = this.capitalizeFirstLetter(inventoryArray[i].name);
            document.getElementById("character-creation-inventory").appendChild(inventorySlot);
        }
        document.getElementById("character-creation-gold").innerText = this.partyGold;
        this.characterCreationArray[4] = equippedArray;
        this.partyInventory = inventoryArray;
    }
    characterCreatorUpdateCompanion(){
        let value = document.getElementById("companion-selection").value;
        switch(value){
            case "none":
                this.tempCompanionValue = "none";
                document.getElementById("character-creator-companion-image").src = "./media/icons/cancel.png";
                break;
            case "dog":
                this.tempCompanionValue = new Character(["Dog", "./media/dog.jpg", "animal", [0,6,6,6,6,6], [new DogPaw, new DogPaw, "N/A", "N/A", "N/A", "N/A", "N/A"]]);
                document.getElementById("character-creator-companion-image").src = this.tempCompanionValue.apperance; 
                break;
            case "hawk":
                this.tempCompanionValue = new Character(["Hawk", "./media/hawk.jpg", "animal", [0,6,6,6,6,6], [new HawkTalons, new HawkTalons, "N/A", "N/A", "N/A", "N/A", "N/A"]]);
                document.getElementById("character-creator-companion-image").src = this.tempCompanionValue.apperance; 
                break;
            case "mercenary":
                this.tempCompanionValue = this.getWanderingCompanion();
                document.getElementById("character-creator-companion-image").src = this.tempCompanionValue.apperance; 
                break;
        }
    }
    characterCreatorUpdateBackgroundLore(){
        let value = document.getElementById("background-selection").value;
        let backgroundLore = '';
        switch(value){
            case "traveler":
                backgroundLore = 'After discovery of magic, travelers from all over came to the Altus kingdom. Few ever left.'
                break;
            case "blacksmith":
                backgroundLore = 'With the discovery of magic, many lost interest in the wares of smiths. Ironically, smiths faired quite well during the fall of the Altus Kingdom, and in the chaos that followed. '
                break;
            case "ranger":
                backgroundLore = 'Farmers, hunters, and countrymen who went into hiding during the fall of the Altus kingdom often took up the nomadic life of a ranger, some by choice, others by necessity.';
                break;
            case "scholar":
                backgroundLore = 'Scholars from far and wide eagerly flocked to the the Altus kngdom to learn about the magical properties of the artifact. Many scholars were so engrossed in their ressearch that they ignored their family obligations.'
                break;
            case "warrior":
                backgroundLore = "Warriors were always needed in the Altus kingdom. However, it was not lack of military strength that led to its demise, but rather an internal affair."
                break;
            case "thief":
                backgroundLore = 'Many resorted to thievery in the years following the discovery of magic. Surprisingly, many did so not because of poverty but because of the thrill of it.'
                break;
            case "hermit":
                backgroundLore = 'There were few in the Altus Kingdom who truly understood magic for what it was. Most still do not. Still, some choose to continue their research away from the artifact and its effects on the populance. '
                break;
        }
       document.getElementById('background-description-message').innerText = backgroundLore;
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
            this.generateNewMap("basic", "random");
            if(this.calculateAveragePartyLevel() >= 10 && this.gameStage == 0){
                this.generateNewMap("altus castle", "boss1");
                this.gameStage = 1;
            }
            if(this.calculateAveragePartyLevel() >= 15 && this.gameStage == 1){
                this.generateNewMap("altus castle", "boss1");
                this.gameStage = 2;
            }
            this.canMoveRoom = true;
            this.map.mapEnviorment.terrain.onload = ()=>{
                this.miniMap.draw(this.map, this.currentRoom);
                document.getElementById('map-transition-screen').style.display = "none";
                document.getElementById("app").style.display = "block";
            }
        });
        document.getElementById('map-transition-town-btn').addEventListener("click", ()=>{
            //to town
            alert("not ready yet!");
        });
    }
    enableKeyControls(){
        window.addEventListener("keydown", (e) => {
            if(this.canMoveRoom == true){
                switch(e.key){
                    case 'w':
                        this.movePartyNorth();
                        break;
                    case 'a':
                        this.movePartyWest();
                        break;
                    case 's':
                        this.movePartySouth();
                        break;
                    case 'd':
                        this.movePartyEast();
                        break;
                }
            }
        });
    }
    enablePartyMapControls(){
        for(var i = 0; i < this.mapBtnArray.length; i++){
            let controls = document.getElementById('map-button-container');
            let oldBtn = controls.querySelector('div');
                oldBtn.remove();
        }
        this.mapBtnArray = [];

        let moveNorthBtn = document.createElement('button');
        let moveSouthBtn = document.createElement('button');
        let moveEastBtn = document.createElement('button');
        let moveWestBtn = document.createElement('button');
        let directionBtnContainer = document.createElement('div'); 
        directionBtnContainer.id = "direction-button-container";
        moveNorthBtn.classList.add('action-button');
        moveSouthBtn.classList.add('action-button');
        moveEastBtn.classList.add('action-button');
        moveWestBtn.classList.add('action-button');

        moveNorthBtn.style.gridRowStart="1";
        moveNorthBtn.style.gridRowEnd="1";
        moveNorthBtn.style.gridColumnStart="2";
        moveNorthBtn.style.gridColumnEnd="2";
        moveNorthBtn.style.gridColumnEnd="2";
        moveSouthBtn.style.gridRowStart="3";
        moveSouthBtn.style.gridColumnStart="2";
        moveEastBtn.style.gridRowStart="2";
        moveEastBtn.style.gridColumnStart="3";
        moveWestBtn.style.gridRowStart="2";
        moveWestBtn.style.gridColumnStart="1";

        moveNorthBtn.innerText = "Move North";
        moveSouthBtn.innerText = "Move South";
        moveEastBtn.innerText = "Move East";
        moveWestBtn.innerText = "Move West";
        moveNorthBtn.addEventListener('click',()=>{
            if(this.canMoveRoom == true){
                this.movePartyNorth();
            }
        });
        moveSouthBtn.addEventListener('click',()=>{
            if(this.canMoveRoom == true){
                this.movePartySouth();
            }
        });
        moveEastBtn.addEventListener('click',()=>{
            if(this.canMoveRoom == true){
                this.movePartyEast();
            }
        });
        moveWestBtn.addEventListener('click',()=>{
            if(this.canMoveRoom == true){
                this.movePartyWest();
            }
        });
        directionBtnContainer.appendChild(moveNorthBtn);
        directionBtnContainer.appendChild(moveSouthBtn);
        directionBtnContainer.appendChild(moveWestBtn);
        directionBtnContainer.appendChild(moveEastBtn);
        document.getElementById('map-button-container').appendChild(directionBtnContainer);
        this.mapBtnArray.push(moveNorthBtn, moveSouthBtn, moveEastBtn, moveWestBtn);
    }
    enableInventoryControls(){
        document.getElementById('equipped-tab-button').addEventListener('click',()=>{
            document.getElementById('inventory-tab').style.display = "none";
            document.getElementById('equipped-tab').style.display = "block";
            document.getElementById('secondary-stats-tab').style.display = "none";
            document.getElementById('party-tab').style.display = "none";
        });
        document.getElementById('inventory-tab-button').addEventListener('click',()=>{
            document.getElementById('equipped-tab').style.display = "none";
            document.getElementById('inventory-tab').style.display = "block";
            document.getElementById('secondary-stats-tab').style.display = "none";
            document.getElementById('party-tab').style.display = "none";
        });
        document.getElementById('secondary-stats-tab-button').addEventListener('click',()=>{
            document.getElementById('equipped-tab').style.display = "none";
            document.getElementById('inventory-tab').style.display = "none";
            document.getElementById('secondary-stats-tab').style.display = "block";
            document.getElementById('party-tab').style.display = "none";
        });
        document.getElementById('party-tab-button').addEventListener('click',()=>{
            document.getElementById('equipped-tab').style.display = "none";
            document.getElementById('inventory-tab').style.display = "none";
            document.getElementById('secondary-stats-tab').style.display = "none";
            document.getElementById('party-tab').style.display = "block";
        });
        for(let i = 0; i < this.party[0].equippedArray.length; i++){
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
                        this.party[0].vigor = this.party[0].vigor + 1;
                        break;
                    case "endurance":
                        this.party[0].endurance = this.party[0].endurance + 1;
                        break;
                    case "strength":
                        this.party[0].strength = this.party[0].strength + 1;
                        break;
                    case "dexterity":
                        this.party[0].dexterity = this.party[0].dexterity + 1;
                        break;
                    case "insight":
                        this.party[0].insight = this.party[0].insight + 1;
                        break;
                    case "focus":
                        this.party[0].focus = this.party[0].focus + 1;
                        break;
                }
                this.party[0].scaleAttributes();
                for(let j = 0; j < this.party[0].statusArray.length; j++){
                    this.party[0].statusArray[0].onRemove();
                    this.party[0].statusArray.splice(0,1);
                }
                this.party[0].currentHP = this.party[0].maxHP;
                this.party[0].currentStamina = this.party[0].maxStamina;
                this.party[0].currentMagic = this.party[0].maxMagic;
                this.calcCharacterAbilitiesAndStats(0);
                this.updateCharacterStats();
                document.getElementById("app").style.display = "block";
                document.getElementById('level-up-screen').style.display = "none";
                this.canMoveRoom = true;
            }
        });
    }
    enableCharacterBattleControls(){
        //remove old buttons
        for(let i = 0; i < this.battleBtnArray.length; i++){
            let oldBtn = document.getElementById('battle-button-container').querySelector('button');
                oldBtn.remove();
        }
        this.battleBtnArray = [];
        //Add New Ability Buttons
        for(let x = 0; x < this.party[0].abilityArray.length; x++){
            let abilityBtn = document.createElement('button');
            abilityBtn.classList.add('action-button');
            abilityBtn.innerText = this.capitalizeFirstLetter(this.party[0].abilityArray[x].name);
            abilityBtn.addEventListener('click', ()=>{
                this.battle.determineFirstTurn(x);
            });
            document.getElementById('battle-button-container').appendChild(abilityBtn);
            this.battleBtnArray.push(abilityBtn);
        }
        document.getElementById('map-button-container').style.display = "none";
        document.getElementById('battle-button-container').style.display = "flex";
        document.getElementById('battle-button-container').style.visibility = "visible";// can remove?
        Array.from(document.getElementsByClassName('mini-menu-btn')).forEach(btn=>{
            btn.style.visibility = "visible";
        });
    }
    disableCharacterBattleControls(){
        document.getElementById('battle-button-container').style.visibility = "hidden";
        //Array.from used to convert HTML collection to regular array so forEach can be used -> hides use btns on items
        Array.from(document.getElementsByClassName('mini-menu-btn')).forEach(btn=>{
            btn.style.visibility = "hidden";
        });
    }
    enableCharacterEncounterControls(){
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
                this.disableCharacterEncounterControls();
                this.encounter.decisionArray[x].activate(this.party[0]);
            });
            document.getElementById('encounter-button-container').appendChild(decisionBtn);
            this.encounterBtnArray.push(decisionBtn);
        }
        document.getElementById('map-button-container').style.display = "none";
        document.getElementById('encounter-button-container').style.display = "flex";
        document.getElementById('encounter-button-container').style.visibility = "visible";// can remove?
        Array.from(document.getElementsByClassName('mini-menu-btn')).forEach(btn=>{
            btn.style.visibility = "visible";
        });
        Array.from(document.getElementsByClassName('party-direction-btn')).forEach(btn=>{
            btn.style.visibility = "visible";
        });
    }
    disableCharacterEncounterControls(){
        document.getElementById('encounter-button-container').style.visibility = "hidden";
        //Array.from used to convert HTML collection to regular array so forEach can be used -> hides use btns on items
        Array.from(document.getElementsByClassName('mini-menu-btn')).forEach(btn=>{
            btn.style.visibility = "hidden";
        });
        Array.from(document.getElementsByClassName('party-direction-btn')).forEach(btn=>{
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
        document.getElementById("current-character-image-container").style.display = "none";
        document.getElementById("enemy-image-container").style.display = "none";
        document.getElementById("location-image-container").style.display = "block";
        document.getElementById("enemy-main-stats-container").style.display = "none";
        document.getElementById("encounter-image-container").style.display = "none";
        document.getElementById("merchant-inventory-container").style.display = "none";
        this.miniMap.resizeCanvas();
        this.miniMap.draw(this.map, this.currentRoom);
        this.isInEncounter = false;
        this.isInBattle = false;
        this.isInTrade = false;
        this.canMoveRoom = true;
        this.updatePartyInventoryTab(this.partyInventory);
    }
    toggleBattle(enemyArray, canRetreat){
        this.battle = new Battle(this.party, enemyArray, canRetreat);
        this.canMoveRoom = false;
        this.disableCharacterBattleControls();
        Array.from(document.getElementsByClassName('party-direction-btn')).forEach(btn=>{
            btn.style.visibility = "hidden";
        });
        this.updateCharacterStats();
        this.updateEnemyStats();
        setTimeout(()=>{
            document.getElementById('enemy-name').innerText = this.capitalizeFirstLetter(this.battle.hostileParty[0].name);
            document.getElementById('enemy-image').src = this.battle.hostileParty[0].apperance;
            document.getElementById('map-button-container').style.display = "none";
            document.getElementById('battle-button-container').style.display = "flex";
            document.getElementById('encounter-button-container').style.display = "none";
            document.getElementById("location-name-container").style.display = "none";
            document.getElementById("enemy-name-container").style.display = "block";
            document.getElementById("encounter-name-container").style.display = "none";
            document.getElementById("mini-map-container").style.display = "none";
            document.getElementById("current-character-image-container").style.display = "block";
            document.getElementById("enemy-image-container").style.display = "block";
            document.getElementById("location-image-container").style.display = "none";
            document.getElementById("enemy-main-stats-container").style.display = "block";
            document.getElementById("encounter-image-container").style.display = "none";
            this.enableCharacterBattleControls();
            if(this.battle.hostileParty[0].isBoss == true){
                this.printToGameConsole(`${this.party[0].name} faces ${this.battle.hostileParty[0].name}!`);
            }else{
                if(this.battle.hostileParty[0].name.charAt(0) == "a" || this.battle.hostileParty[0].name.charAt(0) == "e" || this.battle.hostileParty[0].name.charAt(0) == "i" || this.battle.hostileParty[0].name.charAt(0) == "o" || this.battle.hostileParty[0].name.charAt(0) == "u"){
                    this.printToGameConsole(`${this.party[0].name} encounters an ${this.battle.hostileParty[0].name}!`);
                }else{
                    this.printToGameConsole(`${this.party[0].name} encounters a ${this.battle.hostileParty[0].name}!`);
                }
            }
            document.getElementById('music-player').pause();
            if(enemyArray[0].isBoss == true){
                document.getElementById('music-player').src = this.battle.hostileParty[0].battleMusicSrc;
            }else{
                document.getElementById('music-player').src = this.map.mapEnviorment.battleMusicSrc;
            }
            document.getElementById('music-player').play();
            this.isInBattle = true;
        }, 2000);
    }
    toggleEncounter(encounter){
        this.encounter = encounter;
        this.isInEncounter = true;
        this.canMoveRoom = false;
        this.disableCharacterEncounterControls();
        Array.from(document.getElementsByClassName('party-direction-btn')).forEach(btn=>{
            btn.style.visibility = "hidden";
        });
        setTimeout(()=>{
            document.getElementById('encounter-name').innerText = this.capitalizeFirstLetter(this.encounter.name);
            document.getElementById('encounter-image').src = this.encounter.imageSrc;
            document.getElementById("location-name-container").style.display = "none";
            document.getElementById("encounter-name-container").style.display = "block";
            document.getElementById("mini-map-container").style.display = "none";
            document.getElementById("current-character-image-container").style.display = "block";
            document.getElementById("location-image-container").style.display = "none";
            document.getElementById("encounter-image-container").style.display = "block";
            this.enableCharacterEncounterControls();
            this.encounter.messageFunction();
        }, 2000);
    }
    toggleMapTransitionScreen(){
        this.canMoveRoom = false;
        setTimeout(()=>{
            for(let i = 0; i < this.party.length; i++){
                this.party[i].currentHP =  this.party[i].maxHP;
                this.party[i].currentStamina =  this.party[i].maxStamina;
                this.party[i].currentMagic =  this.party[i].maxMagic;
                let statusLength = this.party[i].statusArray.length
                for(let j = 0; j < statusLength; j++){
                    this.party[i].statusArray[0].onRemove();
                    this.party[i].statusArray.splice(0,1);
                }
            }
            this.updateCharacterStats();
            document.getElementById('music-player').pause();
            document.getElementById('map-transition-screen').style.display = "block";
            document.getElementById("app").style.display = "none";
        }, 2000);
    }
    updatePartyInventoryTab(inventory){
        Array.from(document.getElementById("inventory").getElementsByClassName("inventory-slot")).forEach(slot=>{
            slot.remove();
        });
        Array.from(document.querySelector("body").getElementsByClassName("mini-menu")).forEach(miniMenu=>{
            miniMenu.remove();
        });
        let currentRow = "";
        for(let i = 0; i < inventory.length; i++){
            if(i%5 == 0){
                let slotsRow = document.createElement("div");
                currentRow = slotsRow;
                document.getElementById("inventory").appendChild(slotsRow);
            }

            let slot = document.createElement("img");
            slot.src = inventory[i].imageSrc;
            slot.classList.add("inventory-slot");
            currentRow.appendChild(slot);
    
            let miniMenu = document.createElement("div");
            let col1 = document.createElement("div");
            let col2 = document.createElement("div");
            let statContainer = document.createElement("div");
            let itemHeaderRow = document.createElement("div");
            let row0 = document.createElement("div");
            let row1 = document.createElement("div");
            let row2 = document.createElement("div");
            let row3 = document.createElement("div");
            let row4 = document.createElement("div");
            let row5 = document.createElement("div");
            let row6 = document.createElement("div");
            let row7 = document.createElement("div");
            let row8 = document.createElement("div");
            let statCell1 = document.createElement("div");
            let statCell2 = document.createElement("div");
            let statCell3 = document.createElement("div");
            let statCell4 = document.createElement("div");
            let statCell5 = document.createElement("div");
            let statCell6 = document.createElement("div");
            let statCell7 = document.createElement("div");
            let statCell8 = document.createElement("div");
            let statCell9 = document.createElement("div");
            let statCell10 = document.createElement("div");
    
            let closeBtn = document.createElement("div");
            let img = document.createElement("img");
            let name = document.createElement("p");
            let description = document.createElement("p");
    
            let typeLabel = document.createElement("p");
            let priceLabel = document.createElement("p");
            let speedLabel = document.createElement("p");
            let evasionLabel = document.createElement("p");
            let bluntAttackLabel = document.createElement("p");
            let bluntDefenseLabel = document.createElement("p");
            let pierceAttackLabel = document.createElement("p");
            let pierceDefenseLabel = document.createElement("p");
            let arcaneAttackLabel = document.createElement("p");
            let arcaneDefenseLabel = document.createElement("p");
            let elementalAttackLabel = document.createElement("p");
            let elementalDefenseLabel = document.createElement("p");
    
            let itemType = document.createElement("p");
            let itemPrice = document.createElement("p");
            let itemSpeed = document.createElement("p");
            let itemEvasion = document.createElement("p");
            let itemBluntAttack = document.createElement("p");
            let itemBluntDefense = document.createElement("p");
            let itemPierceAttack = document.createElement("p");
            let itemPierceDefense = document.createElement("p");
            let itemArcaneAttack = document.createElement("p");
            let itemArcaneDefense = document.createElement("p");
            let itemElementalAttack = document.createElement("p");
            let itemElementalDefense = document.createElement("p");
    
            let useBtn = document.createElement("div");
            let dropSellBtn = document.createElement("div"); 
    
            miniMenu.classList.add("mini-menu");
            col1.classList.add("mini-menu-col");
            col2.classList.add("mini-menu-col2");
            statContainer.classList.add("mini-menu-stats-container");
            itemHeaderRow.classList.add("flex");
            row0.classList.add("flex");
            row1.classList.add("flex");
            row2.classList.add("flex");
            row3.classList.add("stat-row");
            row4.classList.add("stat-row");
            row5.classList.add("stat-row");
            row6.classList.add("stat-row");
            row7.classList.add("stat-row");
            row8.classList.add("stat-row", "mini-menu-actions");
            statCell1.classList.add("stat-cell");
            statCell2.classList.add("stat-cell");
            statCell3.classList.add("stat-cell");
            statCell4.classList.add("stat-cell");
            statCell5.classList.add("stat-cell");
            statCell6.classList.add("stat-cell");
            statCell7.classList.add("stat-cell");
            statCell8.classList.add("stat-cell");
            statCell9.classList.add("stat-cell");
            statCell10.classList.add("stat-cell");
            img.classList.add("mini-menu-img");
            description.classList.add("mini-menu-description");
            useBtn.classList.add("mini-menu-btn");
            dropSellBtn.classList.add("mini-menu-btn");
            closeBtn.classList.add("mini-menu-close-btn");
    
            img.src= inventory[i].imageSrc;

            closeBtn.innerText = "x";
            name.innerText = this.capitalizeFirstLetter(inventory[i].name);
            description.innerText = this.capitalizeFirstLetter(inventory[i].description);
            typeLabel.innerText = "TYPE:";
            priceLabel.innerText = "PRICE:";
            speedLabel.innerText = "SPD:";
            evasionLabel.innerText = "EVA:";
            bluntAttackLabel.innerText = "BLT ATK:";
            bluntDefenseLabel.innerText = "BLT DEF:";
            pierceAttackLabel.innerText = "PIR ATK:";
            pierceDefenseLabel.innerText = "PIR DEF:";
            arcaneAttackLabel.innerText = "ARC ATK:";
            arcaneDefenseLabel.innerText = "ARC DEF:";
            elementalAttackLabel.innerText = "ELM ATCK:";
            elementalDefenseLabel.innerText = "ELM DEF:";
    
            itemType.innerText = this.capitalizeFirstLetter(inventory[i].type);
            itemPrice.innerText = Math.floor(inventory[i].price/4) + " G";
            itemSpeed.innerText = inventory[i].speed;
            itemEvasion.innerText = inventory[i].evasion;
            itemBluntAttack.innerText = inventory[i].bluntAttack;
            itemBluntDefense.innerText = inventory[i].bluntDefense;
            itemPierceAttack.innerText = inventory[i].pierceAttack;
            itemPierceDefense.innerText = inventory[i].pierceDefense;
            itemArcaneAttack.innerText = inventory[i].arcaneAttack;
            itemArcaneDefense.innerText = inventory[i].arcaneDefense;
            itemElementalAttack.innerText = inventory[i].elementalAttack;
            itemElementalDefense.innerText = inventory[i].elementalDefense;
    
            miniMenu.appendChild(col1);
            col1.appendChild(itemHeaderRow);
            col1.appendChild(statContainer);
            statContainer.appendChild(row3);
            statContainer.appendChild(row4)
            statContainer.appendChild(row5)
            statContainer.appendChild(row6)
            statContainer.appendChild(row7)
            col1.appendChild(description)
            col1.appendChild(row8)
    
            itemHeaderRow.appendChild(img);
            itemHeaderRow.appendChild(col2);
            itemHeaderRow.appendChild(closeBtn);
    
            col2.appendChild(name);
            col2.appendChild(row0);
            col2.appendChild(row1);
    
            
            row0.appendChild(typeLabel);
            row0.appendChild(itemType);
            row1.appendChild(priceLabel);
            row1.appendChild(itemPrice);
    
            row3.appendChild(statCell1);
            row3.appendChild(statCell2);
            statCell1.appendChild(speedLabel);
            statCell1.appendChild(itemSpeed);
            statCell2.appendChild(evasionLabel);
            statCell2.appendChild(itemEvasion);
    
            row4.appendChild(statCell3);
            row4.appendChild(statCell4);
            statCell3.appendChild(bluntAttackLabel);
            statCell3.appendChild(itemBluntAttack);
            statCell4.appendChild(bluntDefenseLabel);
            statCell4.appendChild(itemBluntDefense);
    
            row5.appendChild(statCell5);
            row5.appendChild(statCell6);
            statCell5.appendChild(pierceAttackLabel);
            statCell5.appendChild(itemPierceAttack);
            statCell6.appendChild(pierceDefenseLabel);
            statCell6.appendChild(itemPierceDefense);
    
            row6.appendChild(statCell7);
            row6.appendChild(statCell8);
            statCell7.appendChild(arcaneAttackLabel);
            statCell7.appendChild(itemArcaneAttack);
            statCell8.appendChild(arcaneDefenseLabel); 
            statCell8.appendChild(itemArcaneDefense);
    
            row7.appendChild(statCell9);
            row7.appendChild(statCell10);
            statCell9.appendChild(elementalAttackLabel);
            statCell9.appendChild(itemElementalAttack);
            statCell10.appendChild(elementalDefenseLabel);
            statCell10.appendChild(itemElementalDefense);
    
            row8.appendChild(useBtn);
            row8.appendChild(dropSellBtn);
            document.querySelector("body").appendChild(miniMenu);
    
            slot.addEventListener("click", ()=>{
                Array.from(document.getElementsByClassName("mini-menu")).forEach(menu=>{
                    menu.style.display = "none";
                });
                miniMenu.style.display = "block";
                miniMenu.style.left = document.getElementById("game-console").getBoundingClientRect().x  + document.getElementById("game-console").getBoundingClientRect().width - miniMenu.getBoundingClientRect().width - 5 + "px";
                miniMenu.style.top = document.getElementById("game-console").getBoundingClientRect().y + document.getElementById("game-console").getBoundingClientRect().height - miniMenu.getBoundingClientRect().height - 5 + "px";
            });
            closeBtn.addEventListener("click", ()=>{
                miniMenu.style.display = "none";
            });
            if(this.isInTrade == true){
                dropSellBtn.innerText = "Sell";
                dropSellBtn.addEventListener('click', ()=>{
                    this.sellItem(i);
                });
            }else{
                dropSellBtn.innerText = "Drop";
                dropSellBtn.addEventListener('click', ()=>{
                    this.dropItem(i);
                });
            }
            if(inventory[i].type == "consumable"){
                useBtn.innerText = "Use";
                useBtn.addEventListener('click', ()=>{
                    this.useConsumable(i);
                });
                statContainer.style.display = "none";
            }
            if(inventory[i].type == "material"){
                statContainer.style.display = "none";
                useBtn.style.display = "none";
            }
            if(inventory[i].type != "consumable" && inventory[i].type != "material"){
                let lvlLabel = document.createElement("p");
                let itemLvl = document.createElement("p");
                let upgradeBtn = document.createElement("div");
                lvlLabel.innerText = "LVL:";
                itemLvl.innerText = inventory[i].level;
                upgradeBtn.innerText = "Upgrade";
                row2.appendChild(lvlLabel);
                row2.appendChild(itemLvl);
                col2.appendChild(row2);
                row8.appendChild(upgradeBtn);
                upgradeBtn.classList.add("mini-menu-btn");
                useBtn.innerText = "Equip";
                useBtn.addEventListener('click', ()=>{
                    this.equip(i);
                });
                upgradeBtn.addEventListener('click', ()=>{
                    this.upgradeItem(i);
                });
            }
            Array.from(miniMenu.getElementsByClassName("mini-menu-btn")).forEach(btn=>{
                if(this.isInBattle == true){
                    btn.style.visibility = "hidden";
                }
            });
        }
        document.getElementById("current-gold").innerText = this.partyGold;
    }
    updateCharacterStats(){
        document.getElementById('current-character-name').innerText = this.party[0].name;
        document.getElementById('current-character-image').src = this.party[0].apperance;
        document.getElementById('current-health-current-character').innerText = this.party[0].currentHP;
        document.getElementById('current-stamina-current-character').innerText = this.party[0].currentStamina;
        document.getElementById('current-magic-current-character').innerText = this.party[0].currentMagic;
        document.getElementById('health-bar-current-character-progress').style.width = Math.floor(this.party[0].currentHP/this.party[0].maxHP*100) + "%";
        document.getElementById('stamina-bar-current-character-progress').style.width = Math.floor(this.party[0].currentStamina/this.party[0].maxStamina*100) + "%";
        document.getElementById('magic-bar-current-character-progress').style.width = Math.floor(this.party[0].currentMagic/this.party[0].maxMagic*100) + "%";
        document.getElementById('current-character-level-label').innerText = "★ " + this.party[0].level;
        document.getElementById('current-vigor').innerText = this.party[0].vigor;
        document.getElementById('current-endurance').innerText = this.party[0].endurance;
        document.getElementById('current-strength').innerText = this.party[0].strength;
        document.getElementById('current-dexterity').innerText = this.party[0].dexterity;
        document.getElementById('current-insight').innerText = this.party[0].insight;
        document.getElementById('current-focus').innerText = this.party[0].focus;
        document.getElementById('current-speed').innerText = this.party[0].currentSpeed;
        document.getElementById('current-evasion').innerText = this.party[0].currentEvasion;
        document.getElementById('current-blunt-attack').innerText = this.party[0].currentBluntAttack; 
        document.getElementById('current-pierce-attack').innerText = this.party[0].currentPierceAttack;
        document.getElementById('current-arcane-attack').innerText = this.party[0].currentArcaneAttack; 
        document.getElementById('current-element-attack').innerText = this.party[0].currentElementalAttack;
        document.getElementById('current-blunt-defense').innerText = this.party[0].currentBluntDefense; 
        document.getElementById('current-pierce-defense').innerText = this.party[0].currentPierceDefense;
        document.getElementById('current-arcane-defense').innerText = this.party[0].currentArcaneDefense; 
        document.getElementById('current-element-defense').innerText = this.party[0].currentElementalDefense;
        document.getElementById('current-experience').innerText = this.party[0].currentXP + " / " + Math.floor(((this.party[0].level + 10)**2)*0.5);
        document.getElementById('current-gold').innerText = this.partyGold;
        for(let i = -1; i < this.party[0].statusArray.length; i++){
            let oldIcon = document.getElementById('current-character-status-icon-container').querySelector('img');
            if(oldIcon !== null){
                oldIcon.remove();
            } 
        }
        for(let i = 0; i < this.party[0].statusArray.length; i++){
        
            if(this.party[0].statusArray[i].iconSrc != ""){
                let statusIcon = document.createElement('img');
                statusIcon.classList.add('status-icon');
                statusIcon.src = this.party[0].statusArray[i].iconSrc;
                document.getElementById('current-character-status-icon-container').appendChild(statusIcon);
            }
        }
        if(this.party[0].currentXP >= Math.floor(((this.party[0].level + 10)**2)*0.5)){
            if(this.isInBattle == false){
                this.party[0].currentXP = this.party[0].currentXP - Math.floor(((this.party[0].level + 10)**2)*0.5);
                this.levelCharacterUp();
            }
        }
    }
    updateEnemyStats(){
        document.getElementById('enemy-name').innerText = this.capitalizeFirstLetter(this.battle.hostileParty[0].name);
        document.getElementById('enemy-image').src = this.battle.hostileParty[0].apperance;
        document.getElementById('current-health-enemy').innerText = this.battle.hostileParty[0].currentHP;
        document.getElementById('current-stamina-enemy').innerText = this.battle.hostileParty[0].currentStamina;
        document.getElementById('current-magic-enemy').innerText = this.battle.hostileParty[0].currentMagic;
        document.getElementById('health-bar-enemy-progress').style.width = Math.floor(this.battle.hostileParty[0].currentHP/this.battle.hostileParty[0].maxHP*100) + "%";
        document.getElementById('stamina-bar-enemy-progress').style.width = Math.floor(this.battle.hostileParty[0].currentStamina/this.battle.hostileParty[0].maxStamina*100) + "%";
        document.getElementById('magic-bar-enemy-progress').style.width = Math.floor(this.battle.hostileParty[0].currentMagic/this.battle.hostileParty[0].maxMagic*100) + "%";
        for(let i = -1; i < this.battle.hostileParty[0].statusArray.length; i++){
            let oldIcon = document.getElementById('enemy-status-icon-container').querySelector('img');
            if(oldIcon !== null){
                oldIcon.remove();
            } 
        }
        for(let i = 0; i < this.battle.hostileParty[0].statusArray.length; i++){
            if(this.battle.hostileParty[0].statusArray[i].iconSrc != ""){
                let statusIcon = document.createElement('img');
                statusIcon.classList.add('status-icon');
                statusIcon.src = this.battle.hostileParty[0].statusArray[i].iconSrc;
                document.getElementById('enemy-status-icon-container').appendChild(statusIcon);
            }
        }
    }
    animateVitalBar(entity, vitalBarType){
        if(entity === this.party[0]){
            document.getElementById(`${vitalBarType}-bar-current-character-progress`).classList.toggle("is-flashing");
            setTimeout(()=>{
                document.getElementById(`${vitalBarType}-bar-current-character-progress`).classList.toggle("is-flashing");
            }, 500);
        }
        else{
            document.getElementById(`${vitalBarType}-bar-enemy-progress`).classList.toggle("is-flashing");
            setTimeout(()=>{
                document.getElementById(`${vitalBarType}-bar-enemy-progress`).classList.toggle("is-flashing");
            }, 500);
        }
    }
    updateParty(){
        this.party[0] = this.party[0];
        Array.from(document.getElementById("party-tab").getElementsByClassName("character-slot")).forEach(slot=>{
            slot.remove();
        });
        for(let i = 0; i < this.party.length; i++){
            let characterSlot = document.createElement("div");
            let characterName = document.createElement("input");
            let characterOrderContainer = document.createElement("div");
            let characterTakeControlBtn = document.createElement("div");
            let characterRaiseBtn = document.createElement("div");
            let characterLowerBtn = document.createElement("div");

            characterSlot.classList.add("character-slot");
            characterSlot.classList.add("flex");
            characterTakeControlBtn.classList.add("mini-menu-btn");
            characterTakeControlBtn.classList.add("party-take-control-btn");
            characterRaiseBtn.classList.add("party-direction-btn");
            characterLowerBtn.classList.add("party-direction-btn");
            characterOrderContainer.classList.add("flex");
            characterName.classList.add("party-name-input");
            characterName.value = `${this.party[i].name}`;
            characterTakeControlBtn.innerText = "Select";
            characterRaiseBtn.innerText = "↑";
            characterLowerBtn.innerText = "↓";

            characterOrderContainer.appendChild(characterRaiseBtn);
            characterOrderContainer.appendChild(characterLowerBtn);
            characterOrderContainer.appendChild(characterTakeControlBtn);
            characterSlot.appendChild(characterName);
            characterSlot.appendChild( characterOrderContainer);

            document.getElementById("party-tab").appendChild(characterSlot);
            characterName.addEventListener("click", ()=>{
                this.canMoveRoom =false;
            })
            characterName.addEventListener("change", ()=>{
                if(this.isInBattle==false && this.isInEncounter == false){
                    if(characterName.value.length <= 18){
                        this.party[i].name = characterName.value;
                        document.getElementById('current-character-name').innerText = this.party[0].name;
                    }
                    this.canMoveRoom =true;
                }
                characterName.value = this.party[i].name;
            })
            characterTakeControlBtn.addEventListener("click", ()=>{
                if(i == 0){
                    this.printToGameConsole(`${this.party[0].name} is already selected.`);
                    return
                }
                if(this.isInBattle == false){
                    let temp = this.party[0];
                    this.party[0] = this.party[i];
                    this.party[i] = temp;
                    this.updateParty();
                }else{
                    this.battle.determineFirstTurn("switch", i);
                }
            });
            characterRaiseBtn.addEventListener("click", ()=>{
                let temp = 0;
                if(i == 0){
                    temp = this.party[this.party.length -1];
                    this.party[this.party.length-1] = this.party[i];
                }else{
                    temp = this.party[i-1];
                    this.party[i-1] = this.party[i];
                }
                this.party[i] = temp;
                this.updateParty();
            });
            characterLowerBtn.addEventListener("click", ()=>{
                let temp = 0;
                if(i == this.party.length-1){
                    temp = this.party[0];
                    this.party[0] = this.party[this.party.length-1]
                }else{
                    temp = this.party[i+1];
                    this.party[i+1] = this.party[i];
                }
                this.party[i] = temp;
                this.updateParty();
            });
            if(this.isInBattle == true){
                characterRaiseBtn.style.visibility = "hidden";
                characterLowerBtn.style.visibility = "hidden";
                characterTakeControlBtn.style.visibility = "hidden";
            }
        }
        for(let j = 0; j < this.party[0].equippedArray.length; j ++){
            this.updateCharacterEquippedTab(j);
        }
        this.calcCharacterAbilitiesAndStats(0);
        this.updateCharacterStats();
    }
    movePartyNorth(){
        this.movePartyRoom(this.currentRoom.roomNorth);
    }
    movePartyEast(){
        this.movePartyRoom(this.currentRoom.roomEast);
    }
    movePartySouth(){
        this.movePartyRoom(this.currentRoom.roomSouth);
    }
    movePartyWest(){
        this.movePartyRoom(this.currentRoom.roomWest);
    }
    movePartyRoom(nextRoom){
        if(nextRoom !== ""){
            let canRetreat = true;
            if(nextRoom.type == "boss chamber"){
                if(nextRoom.status == "notVisited"){
                    nextRoom.enemyArray = this.map.mapEnviorment.generateEnemies(this.calculateAveragePartyLevel(), true, 1);
                    canRetreat = nextRoom.enemyArray[0].canRetreatFrom;
                }
            }
            if(nextRoom.type == "enemySpawn"){
                nextRoom.enemyArray = this.map.mapEnviorment.generateEnemies(this.calculateAveragePartyLevel(), false, this.calculateMaxEnemyCount());
                nextRoom.type = "";
                if(nextRoom.enemyArray[0].isBoss == true){
                    canRetreat = nextRoom.enemyArray[0].canRetreatFrom;
                }
            }
            if(nextRoom.type == "encounterSpawn"){
                nextRoom.encounter = this.map.mapEnviorment.generateEncounter();
                nextRoom.type = "";
            }
            if(nextRoom.enemyArray.length != 0){
                this.nextRoom = nextRoom;
                this.printToGameConsole("something approaches...");
                this.toggleBattle(nextRoom.enemyArray, canRetreat);
                return; 
            }
            if(nextRoom.encounter !== ""){
                this.nextRoom = nextRoom;
                this.printToGameConsole("something is ahead...");
                this.toggleEncounter(nextRoom.encounter);
                return; 
            }
            if(nextRoom.status == "visited" && nextRoom.type == ""){
                if(Math.floor(Math.random()*20) <= 2){
                    this.nextRoom = nextRoom;
                    this.printToGameConsole("something approaches...");
                    nextRoom.enemyArray = this.map.mapEnviorment.generateEnemies(this.calculateAveragePartyLevel(), false, this.calculateMaxEnemyCount());
                    if(nextRoom.enemyArray[0].isBoss == true){
                        canRetreat = nextRoom.enemyArray[0].canRetreatFrom;
                    }
                    this.toggleBattle(nextRoom.enemyArray, canRetreat);
                    return;
                }
            }
            this.currentRoom.status = "visited";
            this.currentRoom = nextRoom;
            let stamina = Math.floor(this.party[0].maxStamina * 0.1);
            let magic = Math.floor(this.party[0].maxMagic * 0.1);
            if(this.party[0].currentStamina + stamina > this.party[0].maxStamina){stamina = this.party[0].maxStamina - this.party[0].currentStamina;}
            if(this.party[0].currentMagic + magic > this.party[0].maxMagic){magic = this.party[0].maxMagic - this.party[0].currentMagic;}
            this.party[0].currentStamina = this.party[0].currentStamina + stamina;
            this.party[0].currentMagic = this.party[0].currentMagic + magic;
            this.miniMap.draw(this.map, this.currentRoom);
            if(this.currentRoom.isExit == true){
                this.printToGameConsole(`${this.party[0].name} finds an exit!`);
                this.toggleMapTransitionScreen();
            }
        }
        else{
            this.printToGameConsole("cannot go this way");
        }
        this.updateCharacterStats();           
    }
    equip(inventoryIndex){
        if(this.isInBattle == false){
            switch(this.partyInventory[inventoryIndex].type){
                case "one hand":
                    if((this.party[0].equippedArray[0] == "N/A" && this.party[0].equippedArray[1] == "N/A") || (this.party[0].equippedArray[0].type == "bound" && this.party[0].equippedArray[1].type == "bound")){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name}.`);
                        return;
                    }
                    if(this.party[0].equippedArray[0] !== "Empty"){
                        if(this.party[0].equippedArray[1] !== "Empty"){//if offhand full, unequip main and equip to main
                            if(this.party[0].equippedArray[0].type == "two hand"){
                                this.party[0].equippedArray[1] = "Empty";
                                this.updateCharacterEquippedTab(1);
                            }
                            this.partyInventory.push(this.party[0].equippedArray[0]);
                            this.party[0].equippedArray[0] = this.partyInventory[inventoryIndex];
                            this.updateCharacterEquippedTab(0);
                        }else{//else equip to offhand
                            this.party[0].equippedArray[1] = this.partyInventory[inventoryIndex];
                            this.updateCharacterEquippedTab(1);
                        }
                    }else{
                        this.party[0].equippedArray[0] = this.partyInventory[inventoryIndex];
                        this.updateCharacterEquippedTab(0);
                    }
                    this.printToGameConsole(`${this.party[0].name} equips ${this.partyInventory[inventoryIndex].name}.`);
                    this.partyInventory.splice(inventoryIndex, 1);
                    break;
                case "two hand":
                    if(this.party[0].equippedArray[0] == "N/A" || this.party[0].equippedArray[1] == "N/A" || this.party[0].equippedArray[0].type == "bound" || this.party[0].equippedArray[1].type == "bound"){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name} !`);
                        return
                    }
                    if(this.party[0].equippedArray[0] !== "Empty"){
                        this.partyInventory.push(this.party[0].equippedArray[0]);
                    }
                    if(this.party[0].equippedArray[1] !== "Empty" && this.party[0].equippedArray[1].type !== "two hand"){
                        this.partyInventory.push(this.party[0].equippedArray[1]);
                    }
                    this.party[0].equippedArray[0] = this.partyInventory[inventoryIndex];
                    this.party[0].equippedArray[1] = this.partyInventory[inventoryIndex];
                    this.partyInventory.splice(inventoryIndex, 1);
                    this.printToGameConsole(`${this.party[0].name} equips ${this.party[0].equippedArray[0].name}.`);
                    this.updateCharacterEquippedTab(0);
                    this.updateCharacterEquippedTab(1);
                    break;
                case "main":
                    if(this.party[0].equippedArray[0] == "N/A" || this.party[0].equippedArray[0].type == "bound"){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name} !`);
                        return
                    }
                    if(this.party[0].equippedArray[0] !== "Empty"){
                        this.partyInventory.push(this.party[0].equippedArray[0]);
                    }
                    this.party[0].equippedArray[0] = this.partyInventory[inventoryIndex];
                    this.partyInventory.splice(inventoryIndex, 1);
                    this.printToGameConsole(`${this.party[0].name} equips ${this.party[0].equippedArray[0].name}.`);
                    this.updateCharacterEquippedTab(0);
                    break;
                case "offhand":
                    if(this.party[0].equippedArray[1] == "N/A" || this.party[0].equippedArray[1].type == "bound"){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name} !`);
                        return
                    }
                    if(this.party[0].equippedArray[1] !== "Empty"){
                        this.partyInventory.push(this.party[0].equippedArray[1]);
                    }
                    this.party[0].equippedArray[1] = this.partyInventory[inventoryIndex];
                    this.partyInventory.splice(inventoryIndex, 1);
                    this.printToGameConsole(`${this.party[0].name} equips ${this.party[0].equippedArray[1].name}.`);
                    this.updateCharacterEquippedTab(1);
                    break;
                case "head":
                    if(this.party[0].equippedArray[2] == "N/A" || this.party[0].equippedArray[2].type == "bound"){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name} !`);
                        return
                    }
                    if(this.party[0].equippedArray[2] !== "Empty"){
                        this.partyInventory.push(this.party[0].equippedArray[2]);
                    } 
                    this.party[0].equippedArray[2] = this.partyInventory[inventoryIndex];
                    this.partyInventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.party[0].name} equips ${this.party[0].equippedArray[2].name}.`);
                    this.updateCharacterEquippedTab(2);
                    break;
                case "torso":
                    if(this.party[0].equippedArray[3] == "N/A" || this.party[0].equippedArray[3].type == "bound"){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name} !`);
                        return
                    }
                    if(this.party[0].equippedArray[3] !== "Empty" || this.party[0].equippedArray[4].type == "bound"){
                        this.partyInventory.push(this.party[0].equippedArray[3]);
                    } 
                    this.party[0].equippedArray[3] = this.partyInventory[inventoryIndex];
                    this.partyInventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.party[0].name} equips ${this.party[0].equippedArray[3].name}.`);
                    this.updateCharacterEquippedTab(3);
                    break;
                case "arms":
                    if(this.party[0].equippedArray[4] == "N/A" || this.party[0].equippedArray[4].type == "bound"){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name} !`);
                        return
                    }
                    if(this.party[0].equippedArray[4] !== "Empty"){
                        this.partyInventory.push(this.party[0].equippedArray[4]);
                    } 
                    this.party[0].equippedArray[4] = this.partyInventory[inventoryIndex];
                    this.partyInventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.party[0].name} equips ${this.party[0].equippedArray[4].name}.`);
                    this.updateCharacterEquippedTab(4);
                    break;
                case "legs":
                    if(this.party[0].equippedArray[5] == "N/A" || this.party[0].equippedArray[5].type == "bound"){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name} !`);
                        return
                    }
                    if(this.party[0].equippedArray[5] !== "Empty"){
                        this.partyInventory.push(this.party[0].equippedArray[5]);
                    } 
                    this.party[0].equippedArray[5] = this.partyInventory[inventoryIndex];
                    this.partyInventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.party[0].name} equips ${this.party[0].equippedArray[5].name}.`);
                    this.updateCharacterEquippedTab(5);
                    break;
                case "feet":
                    if(this.party[0].equippedArray[6] == "N/A" || this.party[0].equippedArray[6].type == "bound"){
                        this.printToGameConsole(`${this.partyInventory[inventoryIndex].name} cannot be equipped to ${this.party[0].name} !`);
                        return
                    }
                    if(this.party[0].equippedArray[6] !== "Empty"){
                        this.partyInventory.push(this.party[0].equippedArray[6]);
                    } 
                    this.party[0].equippedArray[6] = this.partyInventory[inventoryIndex];
                    this.partyInventory.splice(inventoryIndex, 1); 
                    this.printToGameConsole(`${this.party[0].name} equips ${this.party[0].equippedArray[6].name}.`);
                    this.updateCharacterEquippedTab(6);
                    break;
                default:
                    break;
            }
            this.playSoundEffect("./audio/soundEffects/anvil-hit-2-14845.mp3");
            this.calcCharacterAbilitiesAndStats(0);
            this.updatePartyInventoryTab(this.partyInventory);
            this.updateCharacterStats();
        }else{
            this.printToGameConsole("Cannot equip during combat!");
        }
    }
    unequip(equippedArrayIndex){
        if(this.isInBattle == false){
            if(this.party[0].equippedArray[equippedArrayIndex] != "Empty" && this.party[0].equippedArray[equippedArrayIndex] != "N/A"){
                if(this.party[0].equippedArray[equippedArrayIndex].type == "bound"){
                    this.printToGameConsole(`Cannot unequip ${this.party[0].equippedArray[equippedArrayIndex].name}.`);
                    return;
                }
                if(this.party[0].equippedArray[equippedArrayIndex].type == "two hand"){
                    if(equippedArrayIndex == 0){
                        this.party[0].equippedArray[1] = "Empty";
                        this.updateCharacterEquippedTab(1);
                    }else{
                        this.party[0].equippedArray[0] = "Empty";
                        this.updateCharacterEquippedTab(0);
                    }
                }
                this.printToGameConsole(`${this.party[0].name} unequips ${this.party[0].equippedArray[equippedArrayIndex].name}`);
                this.partyInventory.push(this.party[0].equippedArray[equippedArrayIndex]);
                this.party[0].equippedArray[equippedArrayIndex] = "Empty";
                this.updatePartyInventoryTab(this.partyInventory);
                this.updateCharacterEquippedTab(equippedArrayIndex);
                this.calcCharacterAbilitiesAndStats(0);
                this.updateCharacterStats();
            }else{
                this.printToGameConsole("Nothing equipped.");
            }
        }else{
            this.printToGameConsole("Cannot unequip during combat.");
        }
    }
    dropItem(inventoryIndex){
        if(this.isInBattle == false){
            this.printToGameConsole(`${this.party[0].name} dropped ${this.partyInventory[inventoryIndex].name}.`);
            this.partyInventory.splice(inventoryIndex, 1);
            this.updatePartyInventoryTab(this.partyInventory);
        }else{
            this.printToGameConsole(`Cannot drop ${this.partyInventory[inventoryIndex].name} during combat.`);
        }
    }
    sellItem(inventoryIndex){
        if(this.isInBattle == false){
            let price = Math.floor(this.partyInventory[inventoryIndex].price/4);
            this.printToGameConsole(`${this.party[0].name} sold ${this.partyInventory[inventoryIndex].name} for ${price} gold.`);
            this.partyGold = this.partyGold + price;
            this.partyInventory.splice(inventoryIndex, 1);
            this.updatePartyInventoryTab(this.partyInventory);
        }
    }
    upgradeItem(inventoryIndex){
        if(this.isInBattle == false){
            let upgradeCost = Math.floor(this.partyInventory[inventoryIndex].price * 1.25)
            if(this.partyGold >= upgradeCost){
                this.partyGold = this.partyGold - upgradeCost;
                this.printToGameConsole(`${this.party[0].name} spends ${upgradeCost} gold to upgrade ${this.partyInventory[inventoryIndex].name}.`);
                this.partyInventory[inventoryIndex].upgrade(1);
                this.updatePartyInventoryTab(this.partyInventory);
                this.playSoundEffect("./audio/soundEffects/mixkit-metal-medieval-construction-818.wav");
            }
            else{
                this.printToGameConsole(`Not enough gold to upgrade ${this.partyInventory[inventoryIndex].name}.`);
            }
        }else{
            this.printToGameConsole(`Cannot upgrade ${this.partyInventory[inventoryIndex].name} during combat.`);
        }
    }
    calcCharacterAbilitiesAndStats(partyIndex){
        //reset stats and abilities
        this.party[partyIndex].currentBluntAttack = this.party[partyIndex].baseBluntAttack;
        this.party[partyIndex].currentPierceAttack = this.party[partyIndex].basePierceAttack;
        this.party[partyIndex].currentArcaneAttack = this.party[partyIndex].baseArcaneAttack;
        this.party[partyIndex].currentElementalAttack = this.party[partyIndex].baseElementalAttack;
        this.party[partyIndex].currentBluntDefense = this.party[partyIndex].baseBluntDefense;
        this.party[partyIndex].currentPierceDefense = this.party[partyIndex].basePierceDefense;
        this.party[partyIndex].currentArcaneDefense = this.party[partyIndex].baseArcaneDefense;
        this.party[partyIndex].currentElementalDefense = this.party[partyIndex].baseElementalDefense;
        this.party[partyIndex].currentSpeed = this.party[partyIndex].baseSpeed;
        this.party[partyIndex].currentEvasion = this.party[partyIndex].baseEvasion;
        this.party[partyIndex].abilityArray = [];
        //update stats
        for(let i = 0; i < this.party[partyIndex].equippedArray.length; i++){
            if(this.party[partyIndex].equippedArray[i] != "Empty" && this.party[partyIndex].equippedArray[i] != "N/A"){
                if((this.party[partyIndex].equippedArray[i].type == "two hand" && i == 1) != true){
                    this.party[partyIndex].currentBluntAttack = this.party[partyIndex].currentBluntAttack + this.party[partyIndex].equippedArray[i].bluntAttack;
                    this.party[partyIndex].currentPierceAttack = this.party[partyIndex].currentPierceAttack + this.party[partyIndex].equippedArray[i].pierceAttack;
                    this.party[partyIndex].currentArcaneAttack = this.party[partyIndex].currentArcaneAttack + this.party[partyIndex].equippedArray[i].arcaneAttack;
                    this.party[partyIndex].currentElementalAttack = this.party[partyIndex].currentElementalAttack + this.party[partyIndex].equippedArray[i].elementalAttack;
                    this.party[partyIndex].currentBluntDefense = this.party[partyIndex].currentBluntDefense + this.party[partyIndex].equippedArray[i].bluntDefense;
                    this.party[partyIndex].currentPierceDefense = this.party[partyIndex].currentPierceDefense + this.party[partyIndex].equippedArray[i].pierceDefense;
                    this.party[partyIndex].currentArcaneDefense = this.party[partyIndex].currentArcaneDefense + this.party[partyIndex].equippedArray[i].arcaneDefense;
                    this.party[partyIndex].currentElementalDefense = this.party[partyIndex].currentElementalDefense + this.party[partyIndex].equippedArray[i].elementalDefense;
                    this.party[partyIndex].currentSpeed = this.party[partyIndex].currentSpeed + this.party[partyIndex].equippedArray[i].speed;
                    this.party[partyIndex].currentEvasion = this.party[partyIndex].currentEvasion + this.party[partyIndex].equippedArray[i].evasion;
                }
            }
        }
        this.party[partyIndex].abilityArray.push(new Recover);
        this.party[partyIndex].abilityArray.push(new Retreat);
        this.party[partyIndex].abilityArray.push(new Dodge);
        //punch check
        if(this.party[partyIndex].equippedArray[0] == "Empty"){
            this.party[partyIndex].abilityArray.push(new Punch);
        }
        //update abilities
        for(let x = 0; x < this.party[partyIndex].equippedArray.length; x ++){
            if(this.party[partyIndex].equippedArray[x] != "Empty" && this.party[partyIndex].equippedArray[x] != "N/A"){
                for(let y = 0; y < this.party[partyIndex].equippedArray[x].abilityArray.length; y ++){
                    //check if this ability name is not already in current party[partyIndex] ability array
                    let flag = true;
                    for(let z = 0; z < this.party[partyIndex].abilityArray.length; z++){
                        if(this.party[partyIndex].abilityArray[z].name == this.party[partyIndex].equippedArray[x].abilityArray[y].name){
                            flag = false;
                            break;
                        }
                    }
                    if(flag == true){
                        this.party[partyIndex].abilityArray.push(this.party[partyIndex].equippedArray[x].abilityArray[y]);
                    }
                }
            }
        }
    }
    updateCharacterEquippedTab(equippedArrayIndex){
        if(this.party[0].equippedArray[equippedArrayIndex] =="Empty"){
            document.getElementById('equip-slot-' + equippedArrayIndex).innerText = "Empty";
        }else{
            if(this.party[0].equippedArray[equippedArrayIndex] !=="N/A"){
                document.getElementById('equip-slot-' + equippedArrayIndex).innerText = this.capitalizeFirstLetter(this.party[0].equippedArray[equippedArrayIndex].name);
            }else{
                document.getElementById('equip-slot-' + equippedArrayIndex).innerText = "N/A";
            }
        } 
    }
    completeRoom(){
        this.currentRoom.status = "visited";
        this.currentRoom = this.nextRoom;
        this.currentRoom.enemyArray = [];
        this.currentRoom.encounter = "";
        this.miniMap.draw(this.map, this.currentRoom);
    }
    useConsumable(inventoryIndex){
        if(this.isInBattle == true){
            if(this.partyInventory[inventoryIndex].abilityArray[0].canUse(this.party[0]) != false){
                this.battle.determineFirstTurn(0, inventoryIndex);
                this.partyInventory.splice(inventoryIndex, 1);
                this.updatePartyInventoryTab(this.partyInventory);
            }
        }else{
            if(this.partyInventory[inventoryIndex].abilityArray[0].canUse(this.party[0]) != false){
                this.partyInventory[inventoryIndex].abilityArray[0].activate(this.party[0])
                this.partyInventory.splice(inventoryIndex, 1);
                this.updatePartyInventoryTab(this.partyInventory);
                this.updateCharacterStats();
            }
        }
    }
    levelCharacterUp(){
        this.party[0].level = this.party[0].level + 1;
        this.printToGameConsole(`Level up! New level: ${this.party[0].level}.`);
        this.displayLevelUpScreen();
    }
    displayLevelUpScreen(){
        document.getElementById('level-up-screen').style.display = "block";
        document.getElementById("app").style.display = "none";

        this.canMoveRoom = false;
    }
    generateNewMap(biome, layoutType){
        this.map = new Map(biome, layoutType);
        this.currentRoom = this.map.roomArray[this.map.currentCharacterSpawnIndex];
        this.nextRoom = this.currentRoom;
        document.getElementById('location-image').src = this.map.mapEnviorment.imageSrc;
        document.getElementById('location-name').innerText = this.capitalizeFirstLetter(this.map.mapEnviorment.biome);
        this.miniMap.draw(this.map, this.currentRoom);
        document.getElementById("music-player").src = this.map.mapEnviorment.backgroundMusicSrc;
        document.getElementById('music-player').play();
    }
    initializeRooms(map){
        this.currentRoom = map.roomArray[map.currentCharacterSpawnIndex];
        this.nextRoom = this.currentRoom;
    }
    endBattle(){
        if(this.party.length <= 0){
            this.disableCharacterBattleControls();
            setTimeout(()=>{
                document.getElementById('music-player').pause();
                document.getElementById('gameover-screen').style.display = "block";
                document.getElementById("app").style.display = "none";
             }, 2000);
        }else{
            setTimeout(()=>{
                Array.from(document.getElementsByClassName('mini-menu-btn')).forEach(btn=>{
                    btn.style.visibility = "visible";
                });
                Array.from(document.getElementsByClassName('party-direction-btn')).forEach(btn=>{
                    btn.style.visibility = "visible";
                });
                if(this.battle.battlePhase != "retreat"){
                    this.battle.lootEnemies();
                    this.completeRoom();
                }
                document.getElementById("music-player").src = this.map.mapEnviorment.backgroundMusicSrc;
                document.getElementById("music-player").play();
                this.toggleMap();
                
                this.updateParty();
             }, 2000);
        }
    }
    endEncounter(battleFlag){
        this.updateCharacterStats();
        this.disableCharacterEncounterControls();
        if(this.party[0].currentHP <= 0){
            setTimeout(()=>{
                document.getElementById('music-player').pause();
                document.getElementById('gameover-screen').style.display = "block";
                document.getElementById("app").style.display = "none";
             }, 2000);
        }else{
            if(battleFlag == true){
                this.nextRoom.encounter = "";
                return;
            }
            else{
                setTimeout(()=>{
                    Array.from(document.getElementsByClassName('mini-menu-btn')).forEach(btn=>{
                        btn.style.visibility = "visible";
                    });
                    Array.from(document.getElementsByClassName('party-direction-btn')).forEach(btn=>{
                        btn.style.visibility = "visible";
                    });
                    this.toggleMap();
                    this.completeRoom();
                    //this.updateEnemyStats();   MAYBE ADD?
                    this.updateCharacterStats();
                }, 2000);
            }
        }
    }
    toggleTrading(merchantInventory){
        this.isInTrade = true;
        this.updatePartyInventoryTab(this.partyInventory);
         for(let i = -1; i < merchantInventory.length; i++){
                let oldSlot = document.getElementById('inventory-merchant').querySelector('p');
                if(oldSlot !== null){
                    oldSlot.remove();
                } 
            }
            for(let i = 0; i < merchantInventory.length; i++){
                let inventorySlot = document.createElement('p');
                let slotBuyBtn = document.createElement('div');
                inventorySlot.classList.add('inventory-slot-long');
                slotBuyBtn.classList.add('mini-menu-btn');
                
                inventorySlot.innerText = `${merchantInventory[i].price} G: ${this.capitalizeFirstLetter(merchantInventory[i].name)}`;
                inventorySlot.appendChild(slotBuyBtn);
                document.getElementById('inventory-merchant').appendChild(inventorySlot);
                slotBuyBtn.innerText = "Buy";
                slotBuyBtn.addEventListener('click', ()=>{ 
                    this.buyFromMerchant(merchantInventory, i);
                });
            }
    }
    buyFromMerchant(remainingInventory, index){
        if(this.partyGold >= remainingInventory[index].price){
            this.partyInventory.push(remainingInventory[index]);
            this.partyGold -= remainingInventory[index].price;
            this.printToGameConsole(`${this.party[0].name} buys ${this.capitalizeFirstLetter(remainingInventory[index].name)}`)
            remainingInventory.splice(index, 1);
            this.updatePartyInventoryTab(this.partyInventory);
            this.toggleTrading(remainingInventory);
        }else{
            this.printToGameConsole(`Not enough gold to buy ${this.capitalizeFirstLetter(remainingInventory[index].name)}`)
        }
    }
    getWanderingCompanion(){
        let index = Math.floor(Math.random()*this.wanderingCompanions.length);
        let companion = this.wanderingCompanions[index];
        this.wanderingCompanions.splice(index, 1);
        return companion;
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
    calculateAveragePartyLevel(){
        let sum = 0;
        for(let i = 0; i < this.party.length; i++){
            sum = sum + this.party[i].level;
        }
        return Math.ceil(sum / this.party.length);
    }
    calculateMaxEnemyCount(){
        let enemyCount = Math.round(Math.random() * ((this.calculateAveragePartyLevel() * 0.2) + (this.party.length/3) + 1));
        if(Math.random()*3 < 1){
            enemyCount ++;
        }
        if(enemyCount > 6){
            enemyCount = 6;
        }
        return enemyCount;
    }
}

