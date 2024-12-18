import { getRandomArrayElement } from "../utility.js";
import {Entity, Dog, Hawk, Tiger} from "./misc/entities.js";
import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, FireStaff, LightStaff, LinenShirt, LinenPants, Handaxe, LeatherHelmet, LeatherHood, Shortbow, Buckler, LightningStaff, DarkStaff, IceStaff, ForestStaff, Meteorite, ClothHood, LeatherBoots, BearTrap, ClothRobe, IronHelm, LeatherChestplate, Pelt, Net, SmokeBomb, IronOre, ScrollOfInferno, ScrollOfHailStorm, ScrollOfCastShadow} from "./misc/items.js";
import {HealthPotion, PoisonedKnife, KurtussBrewOfMadness, StaminaPotion, MagicPotion, Antidote, AloeRemedy, ParalysisTonic, Bandage, PineWood} from "./misc/items.js";


export default class LobbyModel{
    constructor(props){
        this.props = props;
        this.initialize();
    }
    initialize(){
        this.props.setParty([new Entity({})]);
        this.updateName();
        this.updateApperance();
        this.updateBackground();
        this.updateDifficulty();
    }
    updateName(){
        let name = document.getElementById('lobby-name-selection').value;
        let lowerCaseName = name.toLowerCase();
        switch(lowerCaseName){
            case '':
                name = 'Shackle Breaker';
            break;
            case 'sterben':
                this.props.getParty().push(new Tiger({apperance: './assets/media/entities/armored-tiger.jpg'}));
            break;
        }
        this.props.getParty()[0].name = name;
    }
    updateApperance(){
        let apperance = document.getElementById('lobby-apperance-selection').value;
        this.props.getParty()[0].apperance = apperance;
    }
    updateBackground(){
        let background = document.getElementById('lobby-background-selection').value;
        let equipment = '';
        switch(background){
            case 'traveler':
                equipment = [
                    new LeatherHelmet({level: 1}),
                    new ShortSword({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                    new LeatherBoots({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 5, attunement: 5});
                this.props.setGold(400);
                break;
            case 'blacksmith':
                equipment = [
                    new BlacksmithHammer({level: 1}),
                    new Buckler({level: 1}),
                    new IronHelm({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                    new LeatherBoots({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 9, strength: 4, dexterity: 4, intelligence: 4, attunement: 4});
                this.props.setGold(250);
                break;
            case 'ranger':
                equipment = [
                    new LeatherHood({level: 1}),
                    new Shortbow({level: 1}),
                    new LeatherChestplate({level: 1}),
                    new LinenPants({level: 1}),
                    new LeatherBoots({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 4, dexterity: 6, intelligence: 4, attunement: 6});
                this.props.setGold(300);
                break;
            case 'scholar':
                equipment = [
                    new ClothHood({level: 1}),
                    new ArcaneStaff({level: 1}),
                    new ClothRobe({level: 1}),
                    new LinenPants({level: 1}),
                    new LeatherBoots({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 7, attunement: 3});
                this.props.setGold(300);
                break;
            case 'warrior':
                equipment = [
                    new LeatherHelmet({level: 1}),
                    new Handaxe({level: 1}),
                    new LeatherChestplate({level: 1}),
                    new LinenPants({level: 1}),
                    new LeatherBoots({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 7, dexterity: 3, intelligence: 5, attunement: 5});
                this.props.setGold(300);
                break;
            case 'thief':
                equipment = [
                    new LeatherHood({level: 1}),
                    new Dagger({level: 1}),
                    new Dagger({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                    new LeatherBoots({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 3, dexterity: 7, intelligence: 5, attunement: 5});
                this.props.setGold(350);
                break;
            case 'hermit':
                equipment = [
                    new ClothHood({level: 1}),
                    new ForestStaff({level: 1}),
                    new ClothRobe({level: 1}),
                    new LinenPants({level: 1}),
                    new LeatherBoots({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 3, attunement: 7});
                this.props.setGold(300);
            break;    
        }
        this.props.getParty()[0].unequipAttatchables(Object.keys(this.props.getParty()[0].equipment));
        this.props.getParty()[0].scaleAttributes();
        this.props.getParty()[0].resetStats();
        this.props.getParty()[0].equipAttatchables(equipment)
        this.props.getParty()[0].addAttachableStats(Object.keys(this.props.getParty()[0].equipment));
    }
    updateKeepsake(){
        let keepsake = document.getElementById('lobby-keepsake-selection').value;
        switch(keepsake){
            case 'hunters-tools':
                this.props.setInventory([new HealthPotion(), new BearTrap(), new Net()]);
                break;
            case 'bag-of-potions':
                this.props.setInventory([new HealthPotion(), new StaminaPotion(), new MagicPotion()]);
                break;
            case 'herbal-medicine':
                this.props.setInventory([new HealthPotion(), new Antidote(), new AloeRemedy()]);
                break;
            case 'assassins-belt':
                this.props.setInventory([new HealthPotion(), new PoisonedKnife(), new SmokeBomb()]);
                break;
            case 'artisans-tools':
                this.props.setInventory([new HealthPotion(), new Pelt(), new PineWood(), new IronOre()]);
                break;
            case 'alchemists-vials':
                this.props.setInventory([new HealthPotion(), new ParalysisTonic(), new SmokeBomb()]);
                break;
            case 'first-aid-kit':
                this.props.setInventory([new HealthPotion(), new Bandage(), new Bandage()]);
                break;
            case 'magic-scroll':
                let chance = Math.floor(Math.random()*3);
                if(chance == 0)this.props.setInventory([new HealthPotion(), new ScrollOfInferno()]);
                if(chance == 1)this.props.setInventory([new HealthPotion(), new ScrollOfHailStorm()]);
                if(chance == 2)this.props.setInventory([new HealthPotion(), new ScrollOfCastShadow()]);
            break;
        }
    }
    updateCompanion(){
        let companion = document.getElementById("lobby-companion-selection").value;
        if(this.props.getParty().length > 1){
            this.props.getParty().splice(1, this.props.getParty().length-1);
        }
        switch(companion){
            case "none":
                break;
            case "dog":
                this.props.getParty().push(new Dog({}));
                break;
            case "hawk":
                this.props.getParty().push(new Hawk({}));
                break;
            case "mercenary":
                this.props.getParty().push(this.props.recruitWanderingCompanion());
        }
    }
    updateDifficulty(){
        let difficulty = document.getElementById("lobby-difficulty-selection").value;
        this.props.setDifficulty(difficulty);
    }
    updateOrigin(){
        let origin = document.getElementById("lobby-origin-selection").value;
        this.props.getParty()[0].factions = [origin];
    }
}