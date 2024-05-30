import { getRandomArrayElement } from "../utility.js";
import {Entity, Dog, Hawk} from "./misc/entities.js";
import { Dagger, ShortSword, BlacksmithHammer, ArcaneStaff, LinenShirt, LinenPants, PineWood, Handaxe } from "./misc/items.js";

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
        if(name == ''){
            this.props.getParty()[0].name = 'Shackle Breaker';
        }else{
            this.props.getParty()[0].name = name;
        }
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
                    new ShortSword({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 5, attunement: 5});
                this.props.setGold(300);
                break;
            case 'blacksmith':
                equipment = [
                    new BlacksmithHammer({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 9, strength: 4, dexterity: 4, intelligence: 4, attunement: 4});
                this.props.setGold(250);
                break;
            case 'ranger':
                equipment = [
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 4, dexterity: 6, intelligence: 4, attunement: 6});
                this.props.setGold(300);
                break;
            case 'scholar':
                equipment = [
                    new ArcaneStaff({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 7, attunement: 3});
                this.props.setGold(250);
                break;
            case 'warrior':
                equipment = [
                    new Handaxe({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 7, dexterity: 3, intelligence: 5, attunement: 5});
                this.props.setGold(250);
                break;
            case 'thief':
                equipment = [
                    new Dagger({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 3, dexterity: 7, intelligence: 5, attunement: 5});
                this.props.setGold(250);
                break;
            case 'hermit':
                equipment = [
                    new ArcaneStaff({level: 1}),
                    new LinenShirt({level: 1}),
                    new LinenPants({level: 1}),
                ];
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 3, attunement: 7});
                this.props.setGold(250);
            break;    
        }
        this.props.getParty()[0].unequipAttatchables(Object.keys(this.props.getParty()[0].equipment));
        this.props.getParty()[0].scaleAttributes();
        this.props.getParty()[0].resetStats();
        this.props.getParty()[0].equipAttatchables(equipment)
        this.props.getParty()[0].addAttatchableStats(Object.keys(this.props.getParty()[0].equipment));
    }
    updateKeepsake(){
        let keepsake = document.getElementById('lobby-keepsake-selection').value;
        switch(keepsake){
            case 'hunters-tools':
                this.props.setInventory([]);
                break;
            case 'bag-of-potions':
                this.props.setInventory([]);
                break;
            case 'herbal-medicine':
                this.props.setInventory([]);
                break;
            case 'assasians-belt':
                this.props.setInventory([]);
                break;
            case 'artisans-tools':
                this.props.setInventory([new PineWood()]);
                break;
            case 'alchemists-vials':
                this.props.setInventory([]);
                break;
            case 'first-aid-kit':
                this.props.setInventory([]);
                break;
            case 'meteorite':
                this.props.setInventory([]);
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
                break;
        }
    }
    updateDifficulty(){
        let difficulty = document.getElementById("lobby-difficulty-selection").value;
        this.props.setDifficulty(difficulty);
    }
}