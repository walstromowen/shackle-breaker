import {controller as theController} from "./main.js"
import {Decision} from "./encounterDecision.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian, Bandit} from "./enemies.js";
import {Shielded, Bound, Poisoned, Burned, Empowered, Paralyzed, Channeled, Frostbite, Invigorated, Hidden} from "./statusEffects.js";
import {getRandomItem, HealthPotion} from "./items.js";
import {regainHP, initiateTrade, leave, retry, removeDecision, toggleNewEncounter, toggleBattle, loot, takeDamage, recieveStatusEffect, changeMap} from "./encounterResults.js";


class Encounter{}

export class LockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "locked treasure chest";
        this.message = `${theController.currentCharacter.name} encounters a large chest all alone. It appears to be locked tight.`;
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `${theController.currentCharacter.name} decides not to open the chest.`,
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [
                    
                ]
            ),
            new Decision(
                "pick lock", 
                `${theController.currentCharacter.name} attempts to pick the lock.`,
                "dexterity",
                [
                    ()=>{toggleNewEncounter(`${theController.currentCharacter.name} sucessfully picks the lock!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`${theController.currentCharacter.name} breaks a lockpick!`)},
                    ()=>{removeDecision(`${theController.currentCharacter.name} jams the lock!`, "pick lock")},
                    ()=>{toggleBattle(`as ${theController.currentCharacter.name} reaches to pick the lock, something emerges from the shadows and races towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemy(theController.currentCharacter.level, false))}
                ]
            ),
            new Decision(
                "break lock", 
                `${theController.currentCharacter.name} attempts to break the lock`,
                "strength",
                [
                    ()=>{toggleNewEncounter(`${theController.currentCharacter.name} sucessfully breaks the lock!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`the lock doesn't budge.`)},
                    ()=>{removeDecision(`${theController.currentCharacter.name} cannot break the lock!`, "break lock")},
                    ()=>{toggleBattle(`upon hearing the loud noise, something emerges from the shadows and races towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemy(theController.currentCharacter.level, false))}
                ]
            ),
            new Decision(
                "search for key", 
                `${theController.currentCharacter.name} searches for the key`,
                "insight",
                [
                    ()=>{toggleNewEncounter(`${theController.currentCharacter.name} finds the key and unlocks the chest!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`${theController.currentCharacter.name} seaches in vain for the key.`)},
                    ()=>{removeDecision(`${theController.currentCharacter.name} searches everywhere for the key`, "search for key")},
                    ()=>{toggleBattle(`somethings lunges towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemy(theController.currentCharacter.level, false))}
                ]
            )
        ];
    }
}
export class UnlockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "unlocked treasure chest";
        this.message = "A large chest sits all alone. It is unlocked.";
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `${theController.currentCharacter.name} decides not to open the chest.`,
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "open chest", 
                `${theController.currentCharacter.name} opens the chest.`,
                "likely",
                [
                    ()=>{loot("", [getRandomItem()], 100, 10)}
                ],
                [
                    ()=>{takeDamage(`as ${theController.currentCharacter.name} opens the chest, an arrow flies up from the chest and hits ${theController.currentCharacter.name}!`, 0.15, 0.25)},
                    ()=>{recieveStatusEffect(`as ${theController.currentCharacter.name} opens the chest, the chest explodes in an inferno of flames!`, new Burned(theController.currentCharacter))}
                ]
            )
        ];
    }
}

export class AltusAmbushOpportunity extends Encounter{
    constructor(){
        super();
        this.name = "ambush opportunity";
        this.message = "An official of the Altus Kingdom appears to be seperated from his escort nearby, this could prove an fortuneous opportunity.";
        this.imageSrc = "./media/altus-ambush-opportunity.jpg";
        this.decisionArray = [
            new Decision(
                "go around", 
                `${theController.currentCharacter.name} attempts to sneak around the guard.`,
                "dexterity",
                [
                    ()=>{leave(`${theController.currentCharacter.name} slips away quietly.`)}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.currentCharacter.name} and draws his weapon!`, new AltusMage(theController.currentCharacter.level))}
                ]
            ),
            new Decision(
                "back stab", 
                `${theController.currentCharacter.name} sneaks up to the official and draws a knife.`,
                "dexterity",
                [
                    ()=>{loot(`${theController.currentCharacter.name} eliminates the offical without a sound. After searching the offical,`, [getRandomItem()], 40, 10)}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.currentCharacter.name} and draws his weapon!`, new AltusMage(theController.currentCharacter.level))}
                ]
            ),
            new Decision(
                "set trap", 
                `${theController.currentCharacter.name} sets a pit trap for the official and whistles for the guard.`,
                "focus",
                [
                    ()=>{
                        let enemy = new AltusMage(theController.currentCharacter.level);
                        enemy.statusArray.push(new Bound(enemy));
                        toggleBattle(`the official clumsly falls into ${theController.currentCharacter.name}'s trap and struggles to break free!`, enemy);
                    }
                ],
                [
                    ()=>{toggleBattle(`the altus official effortlessly evades the trap and attacks ${theController.currentCharacter.name}!`, new AltusMage(theController.currentCharacter.level))}
                ]
            )
        ];
    }
}
export class MysteriousDoor extends Encounter{
    constructor(){
        super();
        this.name = "a mysterious door";
        this.message = `A mysterious door stands at the end of the passage. Glowing letters appear on the door, beckoning ${theController.currentCharacter.name} to press them.`;
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
                "move on", 
                `${theController.currentCharacter.name} steps away from the door.`,
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                rune1, 
                `${theController.currentCharacter.name} presses ${rune1}`,
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.currentCharacter.name} in!`, "portal", "random")}
                ],
                [
                    ()=>{removeDecision(`${theController.currentCharacter.name} the letters fade.`, rune1)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            ),
            new Decision(
                rune2, 
                `${theController.currentCharacter.name} presses ${rune2}`,
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.currentCharacter.name} in!`, "portal", "random")}
                ],
                [
                    ()=>{removeDecision(`${theController.currentCharacter.name} the letters fade.`, rune2)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            ),
            new Decision(
                rune3, 
                `${theController.currentCharacter.name} presses ${rune3}`,
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.currentCharacter.name} in!`, "portal", "random")}
                ],
                [
                    ()=>{removeDecision(`${theController.currentCharacter.name} the letters fade.`, rune3)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            )
        ];
    }
}
export class SuspiciousSkeleton extends Encounter{
    constructor(){
        super();
        this.name = "suspicious skeleton";
        this.message = "A skeleton stands dormant ahead.";
        this.imageSrc = "./media/suspicious-skeleton.jpg";
        this.decisionArray = [
            new Decision(
                "go around", 
                `${theController.currentCharacter.name} attempts to sneak around the skeleton.`,
                "dexterity",
                [
                    ()=>{leave(`${theController.currentCharacter.name} slips away quietly.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton spots ${theController.currentCharacter.name} and draws his weapon!`, new Skeleton(theController.currentCharacter.level))}
                ]
            ),
            new Decision(
                "lure away", 
                `${theController.currentCharacter.name} throws a rock in the distance attempting to lure the skeleton away.`,
                "neutral",
                [
                    ()=>{leave(`The skeleton leaves its post to investigates the sound leaving ${theController.currentCharacter.name} a clear path forward.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton spots ${theController.currentCharacter.name} and draws his weapon!`, new Skeleton(theController.currentCharacter.level))}
                ]
            ),
            new Decision(
                "talk to it", 
                `${theController.currentCharacter.name} attempts to talk to the skeleton.`,
                "unlikely",
                [
                    ()=>{loot(`${theController.currentCharacter.name} and the skeleton have a pleasant discussion about the good old days. Then the skeleton gives ${theController.currentCharacter.name} a parting gift,`, [getRandomItem()], 0, 0)},
                    ()=>{leave(`${theController.currentCharacter.name} politely asks the skeleton for directions. The skeleton stares back in disbelief and then nods to the hallway ahead. ${theController.currentCharacter.name} thanks the skeleton and proceeds.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton fixes its gaze upon ${theController.currentCharacter.name} and draws its weapon!`, new Skeleton(theController.currentCharacter.level))},
                    ()=>{
                        theController.currentCharacter.statusArray.push(new Bound(theController.currentCharacter));
                        toggleBattle(`the skeleton grabs onto ${theController.currentCharacter.name}!`, new Skeleton(theController.currentCharacter.level))
                    }
                ]
            )
        ];
    }
}
export class TravelingMerchant extends Encounter{
    constructor(){
        super();
        this.name = "traveling merchant";
        this.message = "a traveling merchant offers to trade.";
        this.imageSrc = "./media/traveling-merchant.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `the merchant packs up his things`,
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on`)}
                ],
                [
                    
                ]
            ),
            new Decision(
                "trade", 
                `${theController.currentCharacter.name} approaches the merchant`,
                "certain",
                [
                    ()=>{initiateTrade(`${theController.currentCharacter.name} offers to trade`, [new HealthPotion, getRandomItem(), getRandomItem(), getRandomItem(), getRandomItem()], "trade")}
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
        this.message = "an abandoned cabin lies ahead.";
        this.imageSrc = "./media/abandoned-cabin.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `${theController.currentCharacter.name} avoids the cabin.`,
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "search cabin", 
                `${theController.currentCharacter.name} searches the cabin for anything useful.`,
                "neutral",
                [
                    ()=>{loot(`${theController.currentCharacter.name} rumages through some cabinets.`, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemy(theController.currentCharacter.level, false))}
                ]
            ),
            new Decision(
                "take rest", 
                `${theController.currentCharacter.name} searches for a place to rest.`,
                "likely",
                [
                    ()=>{regainHP(`${theController.currentCharacter.name} takes a short rest.`, 0.5)}
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemy(theController.currentCharacter.level, false))}
                ]
            )
        ];
    }
}
export class Avalanche extends Encounter{
    constructor(){
        super();
        this.name = "avalanche";
        this.message = "A avalanche strikes!";
        this.imageSrc = "./media/avalanche.jpeg";
        this.decisionArray = [
            new Decision(
                "brace", 
                `${theController.currentCharacter.name} braces agains a nearby boulder!`,
                "strength",
                [
                    ()=>{leave(`The avalanche crashes upon the land! After what feels like an eternity, ${theController.currentCharacter.name} emerges from the rubble unharmed.`)}
                ],
                [
                    ()=>{takeDamage(`The avalanche crashes down upon ${theController.currentCharacter.name}!`, 0.25, 0.50)},
                ]
            ),
            new Decision(
                "run away", 
                `${theController.currentCharacter.name} flees the avalanche with haste!`,
                "endurance",
                [
                    ()=>{leave(`with great athleticism, ${theController.currentCharacter.name} barely escapes the avalanche!`)}
                ],
                [
                    ()=>{takeDamage(`The avalanche crashes down upon ${theController.currentCharacter.name}!`, 0.25, 0.50)},
                ]
            )
        ];
    }
}
export class Robbery extends Encounter{
    constructor(){
        super();
        this.name = "robbery";
        this.message = "a bandit appears to be robbing a traveler up ahead.";
        this.imageSrc = "./media/bandit.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                `${theController.currentCharacter.name} decides not to interfere.`,
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "defend traveler", 
                `${theController.currentCharacter.name} steps in to aid the traveler.`,
                "certain",
                [
                    ()=>{toggleNewEncounter(`the bandit turns to face ${theController.currentCharacter.name}`, new DefendTraveler())}
                ],
                [
                    
                ]
            ),
            new Decision(
                "join bandit", 
                `${theController.currentCharacter.name} joins the bandit in robbing the traveler.`,
                "neutral",
                [
                    ()=>{loot(`${theController.currentCharacter.name} assists the thug in looting the traveler. After splitting the reward, ${theController.currentCharacter.name} walks away with a share of the loot.`, [getRandomItem()], 20, 5)},
                ],
                [
                    ()=>{toggleBattle(`${theController.currentCharacter.name} joins the thug in robbing the traveler. Not long after, the thug turns on ${theController.currentCharacter.name} attempting to claim all the loot!`, new Bandit(theController.currentCharacter.level))}
                ]
            )
        ];
    }
}
export class DefendTraveler extends Encounter{
    constructor(){
        super();
        this.name = "robbery";
        this.message = `"What do are you looking at?" The bandit asks angrily.`;
        this.imageSrc = "./media/bandit.jpg";
        this.decisionArray = [
            new Decision(
                "attack", 
                `${theController.currentCharacter.name} lunges at the bandit with weapon drawn!`,
                "certain",
                [
                    ()=>{toggleBattle(`the bandit draws his weapon to meet ${theController.currentCharacter.name}!`, new Bandit(theController.currentCharacter.level))}
                ],
                [

                ]
            ),
            new Decision(
                "intimidate", 
                `${theController.currentCharacter.name} demands the bandit leave!`,
                "strength",
                [
                    ()=>{loot(`the thug drops his loot and hastily retreats. As a token of good will, the traveler insists ${theController.currentCharacter.name} keep the loot.`, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{removeDecision(`the bandit laughs at ${theController.currentCharacter.name}`, "intimidate")},
                ]
            ),
            new Decision(
                "persuade", 
                `${theController.currentCharacter.name} attempts to reason with the thug.`,
                "insight",
                [
                    ()=>{loot(`${theController.currentCharacter.name} convinces the thug to walks away. The traveler then thanks ${theController.currentCharacter.name} and gives him a gift.`, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{removeDecision(`the scoffs at ${theController.currentCharacter.name}`, "persuade")},
                ]
            )
        ];
    }
}