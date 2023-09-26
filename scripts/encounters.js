import {controller as theController} from "./main.js"
import {Decision} from "./encounterDecision.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian} from "./enemies.js";
import {Sheilded, Bound, Poisoned, Burned, Empowered, Paralyzed, Channeled, Frostbite, Invigorated, Hidden} from "./statusEffects.js";
import {getRandomItem} from "./items.js";
import {regainHP, initiateTrade, leave, retry, removeDecision, toggleNewEncounter, toggleBattle, lootItems, takeDamage, recieveStatusEffect, changeMap} from "./encounterResults.js";


class Encounter{}

export class LockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "locked treasure chest";
        this.message = `${theController.player.name} encounters a large chest all alone. It appears to be locked tight.`;
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `${theController.player.name} decides not to open the chest.`,
                "certain",
                [
                    ()=>{leave(`${theController.player.name} moves on.`)}
                ],
                [
                    
                ]
            ),
            new Decision(
                "pick lock", 
                `${theController.player.name} attempts to pick the lock.`,
                "dexterity",
                [
                    ()=>{toggleNewEncounter(`${theController.player.name} sucessfully picks the lock!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`${theController.player.name} breaks a lockpick!`)},
                    ()=>{removeDecision(`${theController.player.name} jams the lock!`, "pick lock")},
                    ()=>{toggleBattle(`as ${theController.player.name} reaches to pick the lock, something emerges from the shadows and races towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level))}
                ]
            ),
            new Decision(
                "break lock", 
                `${theController.player.name} attempts to break the lock`,
                "strength",
                [
                    ()=>{toggleNewEncounter(`${theController.player.name} sucessfully breaks the lock!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`the lock doesn't budge.`)},
                    ()=>{removeDecision(`${theController.player.name} jams the lock!`, "break lock")},
                    ()=>{toggleBattle(`upon hearing the loud noise, something emerges from the shadows and races towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level))}
                ]
            ),
            new Decision(
                "search for key", 
                `${theController.player.name} searches for the key`,
                "insight",
                [
                    ()=>{toggleNewEncounter(`${theController.player.name} finds the key and unlocks the chest!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`${theController.player.name} seaches in vain for the key.`)},
                    ()=>{removeDecision(`${theController.player.name} searches everywhere for the key`, "search for key")},
                    ()=>{toggleBattle(`somethings lunges towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level))}
                ]
            )
        ];
    }
}
export class UnlockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "unlocked treasure chest";
        this.message = "A large chest sits all alone. It is unlocked...";
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `${theController.player.name} decides not to open the chest.`,
                "certain",
                [
                    ()=>{leave(`${theController.player.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "open chest", 
                `${theController.player.name} opens the chest.`,
                "none",
                [
                    ()=>{lootItems("", [getRandomItem()])}
                ],
                [
                    ()=>{takeDamage(`as ${theController.player.name} opens the chest, an arrow flies up from the chest and hits ${theController.player.name}!`, 0.15, 0.25)},
                    ()=>{recieveStatusEffect(`as ${theController.player.name} opens the chest, the chest explodes in an inferno of flames!`, new Burned(theController.player))}
                ]
            )
        ];
    }
}

export class AltusAmbushOpportunity extends Encounter{
    constructor(){
        super();
        this.name = "ambush opportunity";
        this.message = "An official of the Altus Kingdom appears to be seperated from his escort nearby, this could prove an fortuneous opportunity...";
        this.imageSrc = "./media/altus-ambush-opportunity.jpg";
        this.decisionArray = [
            new Decision(
                "go around", 
                `${theController.player.name} attempts to sneak around the guard.`,
                "dexterity",
                [
                    ()=>{leave(`${theController.player.name} slips away quietly.`)}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.player.name} and draws his weapon!`, new AltusMage(theController.player.level))}
                ]
            ),
            new Decision(
                "back stab", 
                `${theController.player.name} sneaks up to the official and draws a knife.`,
                "dexterity",
                [
                    ()=>{lootItems(`${theController.player.name} eliminates the offical without a sound. After searching the offical,`, getRandomItem())}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.player.name} and draws his weapon!`, new AltusMage(theController.player.level))}
                ]
            ),
            new Decision(
                "set trap", 
                `${theController.player.name} sets a pit trap for the official and whistles for the guard.`,
                "insight",
                [
                    ()=>{
                        let enemy = new AltusMage(theController.player.level);
                        enemy.statusArray.push(new Bound(enemy));
                        toggleBattle(`the official clumsly falls into ${theController.player.name}'s trap and struggles to break free!`, enemy);
                    }
                ],
                [
                    ()=>{toggleBattle(`the altus official effortlessly evades the trap and attacks ${theController.player.name}!`, new AltusMage(theController.player.level))}
                ]
            )
        ];
    }
}
export class MysteriousDoor extends Encounter{
    constructor(){
        super();
        this.name = "a mysterious door";
        this.message = `A mysterious door stands at the end of the passage. Glowing letters appear on the door, beckoning ${theController.player.name} to press them.`;
        this.imageSrc = "./media/mysterious-door.jpg";
        let characters =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        let rand1 = Math.floor(Math.random()*26);
        let rune1 = characters[rand1];
        characters.splice(characters.indexOf(rand1));
        let rand2 = Math.floor(Math.random()*25);
        let rune2 = characters[rand2];
        characters.splice(characters.indexOf(rand2));
        let rand3 = Math.floor(Math.random()*24);
        let rune3 = characters[rand3];
        characters.splice(characters.indexOf(rand3));
        this.decisionArray = [
            new Decision(
                rune1, 
                `${theController.player.name} presses ${rune1}`,
                "none",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.player.name} in!`, "portal")}
                ],
                [
                    ()=>{removeDecision(`${theController.player.name} the letters fade.`, rune1)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            ),
            new Decision(
                rune2, 
                `${theController.player.name} presses ${rune2}`,
                "none",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.player.name} in!`, "portal")}
                ],
                [
                    ()=>{removeDecision(`${theController.player.name} the letters fade.`, rune2)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            ),
            new Decision(
                rune3, 
                `${theController.player.name} presses ${rune3}`,
                "none",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.player.name} in!`, "portal")}
                ],
                [
                    ()=>{removeDecision(`${theController.player.name} the letters fade.`, rune3)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            )
        ];
    }
}

export class TravelingMerchant extends Encounter{
    constructor(){
        super();
        this.name = "traveling merchant";
        this.message = "a traveling merchant hails you...";
        this.imageSrc = "./media/traveling-merchant.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `the merchant packs up his things`,
                "certain",
                [
                    ()=>{leave(`${theController.player.name} moves on`)}
                ],
                [
                    
                ]
            ),
            new Decision(
                "trade", 
                `${theController.player.name} approaches the merchant`,
                "certain",
                [
                    ()=>{initiateTrade(`${theController.player.name} offers to trade`, [getRandomItem(), getRandomItem(), getRandomItem(), getRandomItem(), getRandomItem()])}
                ],
                [
                    
                ]
            )
        ];
    }
}
export class AbandonedCabin extends Encounter{
    constructor(){
        super();
        this.name = "an abandoned cabin";
        this.message = "an abandoned cabin lies ahead...";
        this.imageSrc = "./media/abandoned-cabin.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `${theController.player.name} avoids the cabin.`,
                "certain",
                [
                    ()=>{leave(`${theController.player.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "search cabin", 
                `${theController.player.name} searches the cabin for anything useful.`,
                "none",
                [
                    ()=>{lootItems(`${theController.player.name} rumages through some cabinets.`, [getRandomItem()])}
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level))}
                ]
            ),
            new Decision(
                "take rest", 
                `${theController.player.name} searches for a place to rest.`,
                "none",
                [
                    ()=>{regainHP(`${theController.player.name} takes a short rest.`, 0.5)}
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level))}
                ]
            )
        ];
    }
}