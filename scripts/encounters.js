import {controller as theController} from "./main.js"
import Character from "./character.js";
import {Decision} from "./encounterDecision.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian, Bandit} from "./enemies.js";
import {Shielded, Bound, Poisoned, Burned, Empowered, Paralyzed, Channeled, Frostbite, Invigorated, Hidden} from "./statusEffects.js";
import {regainHP, initiateTrade, leave, retry, removeDecision, toggleNewEncounter, toggleBattle, loot, takeDamage, recieveStatusEffect, changeMap, recruit} from "./encounterResults.js";
import {getRandomItem, LinenShirt, LinenPants, Dagger, BlacksmithHammer, Spear, Shortsword, Longsword, Handaxe, WarHammer,
    Shiv, Buckler, FireStaff, LightningStaff, IceStaff, ArcaneStaff, LightStaff, DarkStaff, LeatherHelmet, 
    LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
    LeatherBoots, KiteShield, IronHelmet, IronGauntlets, IronChainmail, 
    IronGreaves, IronBoots, CrystalBall, ClothHood, ClothRobe, HealthPotion, StaminaPotion, MagicPotion, 
    ThrowingKnife, PoisonedKnife, Meteorite, Antidote, AloeRemedy, Net, SmokeBomb, Hide
    } from "./items.js";


class Encounter{}

export class LockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "locked treasure chest";
        this.messageFunction = ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} encounters a large chest all alone. It appears to be locked tight.`)};
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} decides not to open the chest.`)},
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [
                    
                ]
            ),
            new Decision(
                "pick lock", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} attempts to pick the lock.`)},
                "dexterity",
                [
                    ()=>{toggleNewEncounter(`${theController.currentCharacter.name} sucessfully picks the lock!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`${theController.currentCharacter.name} breaks a lockpick!`)},
                    ()=>{removeDecision(`${theController.currentCharacter.name} jams the lock!`, "pick lock")},
                    ()=>{toggleBattle(`as ${theController.currentCharacter.name} reaches to pick the lock, something emerges from the shadows and races towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
                ]
            ),
            new Decision(
                "break lock", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} attempts to break the lock`)},
                "strength",
                [
                    ()=>{toggleNewEncounter(`${theController.currentCharacter.name} sucessfully breaks the lock!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`the lock doesn't budge.`)},
                    ()=>{removeDecision(`${theController.currentCharacter.name} cannot break the lock!`, "break lock")},
                    ()=>{toggleBattle(`upon hearing the loud noise, something emerges from the shadows and races towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
                ]
            ),
            new Decision(
                "search for key", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} searches for the key`)},
                "insight",
                [
                    ()=>{toggleNewEncounter(`${theController.currentCharacter.name} finds the key and unlocks the chest!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`${theController.currentCharacter.name} seaches in vain for the key.`)},
                    ()=>{removeDecision(`${theController.currentCharacter.name} searches everywhere for the key`, "search for key")},
                    ()=>{toggleBattle(`somethings lunges towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
                ]
            )
        ];
    }
}
export class UnlockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "unlocked treasure chest";
        this.messageFunction = ()=>{theController.printToGameConsole("A large chest sits all alone. It is unlocked.")};
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} decides not to open the chest.`)},
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "open chest", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} opens the chest.`)},
                "likely",
                [
                    ()=>{loot(`${theController.currentCharacter.name} finds the following items`, [getRandomItem()], 100, 10)}
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
        this.messageFunction = ()=>{theController.printToGameConsole("An official of the Altus Kingdom appears to be seperated from his escort nearby, this could prove an fortuneous opportunity.")};
        this.imageSrc = "./media/altus-ambush-opportunity.jpg";
        this.decisionArray = [
            new Decision(
                "go around", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} attempts to sneak around the guard.`)},
                "dexterity",
                [
                    ()=>{leave(`${theController.currentCharacter.name} slips away quietly.`)}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.currentCharacter.name} and draws his weapon!`, [new AltusMage(theController.calculateAveragePartyLevel())])}
                ]
            ),
            new Decision(
                "back stab", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} sneaks up to the official and draws a knife.`)},
                "dexterity",
                [
                    ()=>{loot(`${theController.currentCharacter.name} eliminates the offical without a sound. After searching the offical, ${theController.currentCharacter.name} finds:`, [getRandomItem()], 40, 10)}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.currentCharacter.name} and draws his weapon!`, [new AltusMage(theController.calculateAveragePartyLevel())])}
                ]
            ),
            new Decision(
                "set trap", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} sets a pit trap for the official and whistles for the guard.`)},
                "focus",
                [
                    ()=>{
                        let enemy = new AltusMage(theController.calculateAveragePartyLevel());
                        enemy.statusArray.push(new Bound(enemy));
                        toggleBattle(`the official clumsly falls into ${theController.currentCharacter.name}'s trap and struggles to break free!`, [enemy]);
                    }
                ],
                [
                    ()=>{toggleBattle(`the altus official effortlessly evades the trap and attacks ${theController.currentCharacter.name}!`, [new AltusMage(theController.calculateAveragePartyLevel())])}
                ]
            )
        ];
    }
}
export class MysteriousDoor extends Encounter{
    constructor(){
        super();
        this.name = "a mysterious door";
        this.messageFunction = ()=>{theController.printToGameConsole(`A mysterious door stands at the end of the passage. Glowing letters appear on the door, beckoning ${theController.currentCharacter.name} to press them.`)};
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
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} steps away from the door.`)},
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                rune1, 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} presses ${rune1}`)},
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
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} presses ${rune2}`)},
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
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} presses ${rune3}`)},
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
        this.messageFunction = ()=>{theController.printToGameConsole("A skeleton stands dormant ahead.")};
        this.imageSrc = "./media/suspicious-skeleton.jpg";
        this.decisionArray = [
            new Decision(
                "go around", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} attempts to sneak around the skeleton.`)},
                "dexterity",
                [
                    ()=>{leave(`${theController.currentCharacter.name} slips away quietly.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton spots ${theController.currentCharacter.name} and draws his weapon!`, [new Skeleton(theController.calculateAveragePartyLevel())])}
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
                    ()=>{toggleBattle(`the skeleton spots ${theController.currentCharacter.name} and draws his weapon!`, [new Skeleton(theController.calculateAveragePartyLevel())])}
                ]
            ),
            new Decision(
                "talk to it", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} attempts to talk to the skeleton.`)},
                "unlikely",
                [
                    ()=>{loot(`${theController.currentCharacter.name} and the skeleton have a pleasant discussion about the good old days. Then the skeleton gives ${theController.currentCharacter.name}:`, [getRandomItem()], 0, 0)},
                    ()=>{leave(`${theController.currentCharacter.name} politely asks the skeleton for directions. The skeleton stares back in disbelief and then nods to the hallway ahead. ${theController.currentCharacter.name} thanks the skeleton and proceeds.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton fixes its gaze upon ${theController.currentCharacter.name} and draws its weapon!`, [new Skeleton(theController.calculateAveragePartyLevel())])},
                    ()=>{
                        theController.currentCharacter.statusArray.push(new Bound(theController.currentCharacter));
                        toggleBattle(`the skeleton grabs onto ${theController.currentCharacter.name}!`, [new Skeleton(theController.calculateAveragePartyLevel())])
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
        this.messageFunction = ()=>{theController.printToGameConsole("a traveling merchant offers to trade.")};
        this.imageSrc = "./media/traveling-merchant.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`the merchant packs up his things`)},
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on`)}
                ],
                [
                    
                ]
            ),
            new Decision(
                "trade", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} approaches the merchant`)},
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
        this.messageFunction = ()=>{theController.printToGameConsole("an abandoned cabin lies ahead.")};
        this.imageSrc = "./media/abandoned-cabin.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} avoids the cabin.`)},
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "search cabin", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} searches the cabin for anything useful.`)},
                "neutral",
                [
                    ()=>{loot(`${theController.currentCharacter.name} finds: `, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
                ]
            ),
            new Decision(
                "take rest", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} searches for a place to rest.`)},
                "likely",
                [
                    ()=>{regainHP(`${theController.currentCharacter.name} takes a short rest.`, 0.5)}
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.currentCharacter.name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
                ]
            )
        ];
    }
}
export class Avalanche extends Encounter{
    constructor(){
        super();
        this.name = "avalanche";
        this.messageFunction = ()=>{theController.printToGameConsole("A avalanche strikes!")};
        this.imageSrc = "./media/avalanche.jpeg";
        this.decisionArray = [
            new Decision(
                "brace", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} braces agains a nearby boulder!`)},
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
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} flees the avalanche with haste!`)},
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
        this.messageFunction = ()=>{theController.printToGameConsole("a bandit appears to be robbing a traveler up ahead.")};
        this.imageSrc = "./media/bandit.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} decides not to interfere.`)},
                "certain",
                [
                    ()=>{leave(`${theController.currentCharacter.name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "defend traveler", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} steps in to aid the traveler.`)},
                "certain",
                [
                    ()=>{toggleNewEncounter(`the bandit turns to face ${theController.currentCharacter.name}`, new DefendTraveler())}
                ],
                [
                    
                ]
            ),
            new Decision(
                "join bandit", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} joins the bandit in robbing the traveler.`)},
                "neutral",
                [
                    ()=>{loot(`${theController.currentCharacter.name} and the thug rob the traveler of:`, [getRandomItem()], 20, 5)},
                ],
                [
                    ()=>{toggleBattle(`${theController.currentCharacter.name} joins the thug in robbing the traveler. Not long after, the thug turns on ${theController.currentCharacter.name}!`, [new Bandit(theController.calculateAveragePartyLevel())])}
                ]
            )
        ];
    }
}
export class DefendTraveler extends Encounter{
    constructor(){
        super();
        this.name = "robbery";
        this.messageFunction = ()=>{theController.printToGameConsole(`"What are you looking at?" The bandit asks angrily.`)};
        this.imageSrc = "./media/bandit.jpg";
        this.decisionArray = [
            new Decision(
                "attack", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} lunges at the bandit with weapon drawn!`)},
                "certain",
                [
                    ()=>{toggleBattle(`the bandit draws his weapon to meet ${theController.currentCharacter.name}!`, [new Bandit(theController.calculateAveragePartyLevel())])}
                ],
                [

                ]
            ),
            new Decision(
                "intimidate", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} demands the bandit leave!`)},
                "strength",
                [
                    ()=>{toggleNewEncounter(`fearing his life, the thug turns and runs. Shorty after the traveler speaks to ${theController.currentCharacter.name}`, new AssistVictim())}
                ],
                [
                    ()=>{removeDecision(`the bandit laughs at ${theController.currentCharacter.name}`, "intimidate")},
                ]
            ),
            new Decision(
                "persuade", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} attempts to reason with the thug.`)},
                "insight",
                [
                    ()=>{toggleNewEncounter(`${theController.currentCharacter.name} convinces the thug to leave. Shorty after the traveler speaks to ${theController.currentCharacter.name}`, new AssistVictim())}
                ],
                [
                    ()=>{removeDecision(`the thug scoffs at ${theController.currentCharacter.name}`, "persuade")},
                ]
            )
        ];
    }
}
export class AssistVictim extends Encounter{
    constructor(){
        super();
        this.name = "assist victim";
        this.companion = theController.getWanderingCompanion();
        this.messageFunction = ()=>{theController.printToGameConsole(`"you saved me! If there is anything I can do for you just ask!`)};
        this.imageSrc = this.companion.apperance;
        this.decisionArray = [
            new Decision(
                "accept gift", 
                ()=>{theController.printToGameConsole(`"Please take it, I insist!`)},
                "certain",
                [
                    ()=>{loot(`${theController.currentCharacter.name} is rewarded with.`, [getRandomItem()], 50, 10)},
                ],
                [

                ]
            ),
            new Decision(
                "recruit", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} asks the traveler for his services in battle.`)},
                "neutral",
                [
                    ()=>{recruit(`"Perhaps traveling with you will be safer. Give me a moment to gather my things!"`, theController.encounter.companion)}
                ],
                [
                    ()=>{
                        theController.wanderingCompanions.push(theController.encounter.companion);
                        removeDecision(`"I am afraid I am no use to you in battle."`, "recruit")
                    },
                ]
            )
        ];
    }
}
export class MercenaryForHire extends Encounter{
    constructor(){
        super();
        this.companion = theController.getWanderingCompanion();
        this.name = `mercenary for hire`;
        this.messageFunction = ()=>{theController.printToGameConsole(`"The name's ${this.companion.name}. I'm always willing to help ... for a price`)};
        this.imageSrc = this.companion.apperance;
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} declines the mercenary's offer.`)},
                "certain",
                [
                    ()=>{
                        theController.wanderingCompanions.push(theController.encounter.companion);
                        leave(`${theController.currentCharacter.name} moves on.`)
                    }
                ],
                [

                ]
            ),
            new Decision(
                "hire (400 gold)", 
                ()=>{theController.printToGameConsole(`${theController.currentCharacter.name} attempts to hire the mercenary.`)},
                "certain",
                [
                    ()=>{
                        if(theController.partyGold >= 400){
                            theController.partyGold = theController.partyGold - 400;
                            recruit(`${theController.encounter.companion.name} joins ${theController.currentCharacter.name}'s party`, theController.encounter.companion)
                        }else{
                            retry(`"Oi! At least make it worth my while"`);
                        }
                    }
                ],
                [
                    
                ]
            )
        ];
    }
}