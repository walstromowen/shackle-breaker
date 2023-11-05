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
                    ()=>{toggleBattle(`as ${theController.player.name} reaches to pick the lock, something emerges from the shadows and races towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level, false))}
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
                    ()=>{removeDecision(`${theController.player.name} cannot break the lock!`, "break lock")},
                    ()=>{toggleBattle(`upon hearing the loud noise, something emerges from the shadows and races towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level, false))}
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
                    ()=>{toggleBattle(`somethings lunges towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level, false))}
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
                "likely",
                [
                    ()=>{loot("", [getRandomItem()], 100, 10)}
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
        this.message = "An official of the Altus Kingdom appears to be seperated from his escort nearby, this could prove an fortuneous opportunity.";
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
                    ()=>{loot(`${theController.player.name} eliminates the offical without a sound. After searching the offical,`, [getRandomItem()], 40, 10)}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.player.name} and draws his weapon!`, new AltusMage(theController.player.level))}
                ]
            ),
            new Decision(
                "set trap", 
                `${theController.player.name} sets a pit trap for the official and whistles for the guard.`,
                "focus",
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
                "move on", 
                `${theController.player.name} steps away from the door.`,
                "certain",
                [
                    ()=>{leave(`${theController.player.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                rune1, 
                `${theController.player.name} presses ${rune1}`,
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.player.name} in!`, "portal", "random")}
                ],
                [
                    ()=>{removeDecision(`${theController.player.name} the letters fade.`, rune1)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            ),
            new Decision(
                rune2, 
                `${theController.player.name} presses ${rune2}`,
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.player.name} in!`, "portal", "random")}
                ],
                [
                    ()=>{removeDecision(`${theController.player.name} the letters fade.`, rune2)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            ),
            new Decision(
                rune3, 
                `${theController.player.name} presses ${rune3}`,
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.player.name} in!`, "portal", "random")}
                ],
                [
                    ()=>{removeDecision(`${theController.player.name} the letters fade.`, rune3)},
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
                `${theController.player.name} attempts to sneak around the skeleton.`,
                "dexterity",
                [
                    ()=>{leave(`${theController.player.name} slips away quietly.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton spots ${theController.player.name} and draws his weapon!`, new Skeleton(theController.player.level))}
                ]
            ),
            new Decision(
                "lure away", 
                `${theController.player.name} throws a rock in the distance attempting to lure the skeleton away.`,
                "neutral",
                [
                    ()=>{leave(`The skeleton leaves its post to investigates the sound leaving ${theController.player.name} a clear path forward.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton spots ${theController.player.name} and draws his weapon!`, new Skeleton(theController.player.level))}
                ]
            ),
            new Decision(
                "talk to it", 
                `${theController.player.name} attempts to talk to the skeleton.`,
                "unlikely",
                [
                    ()=>{loot(`${theController.player.name} and the skeleton have a pleasant discussion about the good old days. Then the skeleton gives ${theController.player.name} a parting gift,`, [getRandomItem()], 0, 0)},
                    ()=>{leave(`${theController.player.name} politely asks the skeleton for directions. The skeleton stares back in disbelief and then nods to the hallway ahead. ${theController.player.name} thanks the skeleton and proceeds.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton fixes its gaze upon ${theController.player.name} and draws its weapon!`, new Skeleton(theController.player.level))},
                    ()=>{
                        theController.player.statusArray.push(new Bound(theController.player));
                        toggleBattle(`the skeleton grabs onto ${theController.player.name}!`, new Skeleton(theController.player.level))
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
                    ()=>{initiateTrade(`${theController.player.name} offers to trade`, [new HealthPotion, getRandomItem(), getRandomItem(), getRandomItem(), getRandomItem()], "trade")}
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
                "neutral",
                [
                    ()=>{loot(`${theController.player.name} rumages through some cabinets.`, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level, false))}
                ]
            ),
            new Decision(
                "take rest", 
                `${theController.player.name} searches for a place to rest.`,
                "likely",
                [
                    ()=>{regainHP(`${theController.player.name} takes a short rest.`, 0.5)}
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.player.name}!`, theController.map.mapEnviorment.generateEnemy(theController.player.level, false))}
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
                `${theController.player.name} braces agains a nearby boulder!`,
                "strength",
                [
                    ()=>{leave(`The avalanche crashes upon the land! After what feels like an eternity, ${theController.player.name} emerges from the rubble unharmed.`)}
                ],
                [
                    ()=>{takeDamage(`The avalanche crashes down upon ${theController.player.name}!`, 0.25, 0.50)},
                ]
            ),
            new Decision(
                "run away", 
                `${theController.player.name} flees the avalanche with haste!`,
                "endurance",
                [
                    ()=>{leave(`with great athleticism, ${theController.player.name} barely escapes the avalanche!`)}
                ],
                [
                    ()=>{takeDamage(`The avalanche crashes down upon ${theController.player.name}!`, 0.25, 0.50)},
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
                `${theController.player.name} decides not to interfere.`,
                "certain",
                [
                    ()=>{leave(`${theController.player.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "defend traveler", 
                `${theController.player.name} steps in to aid the traveler.`,
                "certain",
                [
                    ()=>{toggleNewEncounter(`the bandit turns to face ${theController.player.name}`, new DefendTraveler())}
                ],
                [
                    
                ]
            ),
            new Decision(
                "join bandit", 
                `${theController.player.name} joins the bandit in robbing the traveler.`,
                "neutral",
                [
                    ()=>{loot(`${theController.player.name} assists the thug in looting the traveler. After splitting the reward, ${theController.player.name} walks away with a share of the loot.`, [getRandomItem()], 20, 5)},
                ],
                [
                    ()=>{toggleBattle(`${theController.player.name} joins the thug in robbing the traveler. Not long after, the thug turns on ${theController.player.name} attempting to claim all the loot!`, new Bandit(theController.player.level))}
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
                `${theController.player.name} lunges at the bandit with weapon drawn!`,
                "certain",
                [
                    ()=>{toggleBattle(`the bandit draws his weapon to meet ${theController.player.name}!`, new Bandit(theController.player.level))}
                ],
                [

                ]
            ),
            new Decision(
                "intimidate", 
                `${theController.player.name} demands the bandit leave!`,
                "strength",
                [
                    ()=>{loot(`the thug drops his loot and hastily retreats. As a token of good will, the traveler insists ${theController.player.name} keep the loot.`, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{removeDecision(`the bandit laughs at ${theController.player.name}`, "intimidate")},
                ]
            ),
            new Decision(
                "persuade", 
                `${theController.player.name} attempts to reason with the thug.`,
                "insight",
                [
                    ()=>{loot(`${theController.player.name} convinces the thug to walks away. The traveler then thanks ${theController.player.name} and gives him a gift.`, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{removeDecision(`the scoffs at ${theController.player.name}`, "persuade")},
                ]
            )
        ];
    }
}