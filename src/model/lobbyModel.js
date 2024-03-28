import { getRandomArrayElement } from "../utility.js";
import {Entity, Dog, Hawk, companionArray} from "./misc/entities.js";
import { Dagger, LinenShirt, LinenPants, PineWood } from "./misc/items.js";

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
        switch(background){
            case 'traveler':
                this.props.getParty()[0].equipment = {
                    mainhand: '',
                    offhand: '',
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: '',
                }
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 5, attunement: 5});
                this.props.setGold(300);
                break;
            case 'blacksmith':
                this.props.getParty()[0].equipment = {
                    mainhand: '',
                    offhand: '',
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: '',
                }
                this.props.getParty()[0].setAttributes({vigor: 9, strength: 4, dexterity: 4, intelligence: 4, attunement: 4});
                this.props.setGold(250);
                break;
            case 'ranger':
                this.props.getParty()[0].equipment = {
                    mainhand: '',
                    offhand: '',
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: '',
                }
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 4, dexterity: 6, intelligence: 4, attunement: 6});
                this.props.setGold(300);
                break;
            case 'scholar':
                this.props.getParty()[0].equipment = {
                    mainhand: '',
                    offhand: '',
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: '',
                }
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 7, attunement: 3});
                this.props.setGold(250);
                break;
            case 'warrior':
                this.props.getParty()[0].equipment = {
                    mainhand: '',
                    offhand: '',
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: '',
                }
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 7, dexterity: 3, intelligence: 5, attunement: 5});
                this.props.setGold(250);
                break;
            case 'thief':
                this.props.getParty()[0].equipment = {
                    mainhand:  new Dagger({level: 1}),
                    offhand: '',
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: '',
                }
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 3, dexterity: 7, intelligence: 5, attunement: 5});
                this.props.setGold(250);
                break;
            case 'hermit':
                this.props.getParty()[0].equipment = {
                    mainhand: '',
                    offhand: '',
                    head: '',
                    torso: new LinenShirt({level: 1}),
                    arms: '',
                    legs: new LinenPants({level: 1}),
                    feet: '',
                }
                this.props.getParty()[0].setAttributes({vigor: 5, strength: 5, dexterity: 5, intelligence: 3, attunement: 7});
                this.props.setGold(250);
            break;    
        }
        this.props.getParty()[0].scaleAttributes();
        this.props.getParty()[0].resetStats();
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
            this.props.getParty().pop();
        }
        switch(companion){
            case "none":
                break;
            case "dog":
                this.props.getParty().push(new Dog());
                break;
            case "hawk":
                this.props.getParty().push(new Hawk());
                break;
            case "mercenary":
                this.props.getParty().push(getRandomArrayElement(companionArray));
                break;
        }
    }
    updateDifficulty(){
        let difficulty = document.getElementById("lobby-difficulty-selection").value;
        this.props.setDifficulty(difficulty);
    }
}