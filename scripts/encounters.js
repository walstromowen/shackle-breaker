import {controller as theController} from "./main.js"
import Character from "./character.js";
import {Decision} from "./encounterDecision.js";
import {Skeleton, Bat, Wolf, AltusMage, CaveSpider, Groveguardian, Bandit, SkeletonMage, Ghost, AltusGuard, Yeti, Tiger} from "./enemies.js";
import {Shielded, Bound, Poisoned, Burned, Empowered, Paralyzed, Channeled, Frostbite, Invigorated, Hidden} from "./statusEffects.js";
import {regainHP, initiateTrade, leave, retry, removeDecision, toggleNewEncounter, toggleBattle, loot, takeDamage, recieveStatusEffect, changeMap, recruit} from "./encounterResults.js";
import {getRandomItem, LinenShirt, LinenPants, Dagger, BlacksmithHammer, Spear, Shortsword, Longsword, Handaxe, WarHammer, NightbladeSword,
    Shiv, Buckler, FireStaff, LightningStaff, IceStaff, ArcaneStaff, LightStaff, DarkStaff, LeatherHelmet, NightbladeHelm, NightbladeChestplate,
    LeatherHood, LeatherGloves, LeatherChestplate, LeatherGreaves, 
    LeatherBoots, KiteShield, IronHelmet, IronGauntlets, IronChainmail, 
    IronGreaves, IronBoots, CrystalBall, ClothHood, ClothRobe, TigerClaw, DogPaw, HawkTalons, HealthPotion, StaminaPotion, MagicPotion, 
    ThrowingKnife, PoisonedKnife, Meteorite, Antidote, AloeRemedy, Net, SmokeBomb, Hide, Bandage, PineWood
    } from "./items.js";


class Encounter{}

export class LockedTreasureChest extends Encounter{
    constructor(){
        super();
        this.name = "locked treasure chest";
        this.messageFunction = ()=>{theController.printToGameConsole(`${theController.party[0].name} encounters a large chest all alone. It appears to be locked tight.`)};
        this.imageSrc = "./media/treasureChestLocked.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} decides not to open the chest.`)},
                "certain",
                [
                    ()=>{leave(`${theController.party[0].name} moves on.`)}
                ],
                [
                    
                ]
            ),
            new Decision(
                "pick lock", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} attempts to pick the lock.`)},
                "dexterity",
                [
                    ()=>{toggleNewEncounter(`${theController.party[0].name} sucessfully picks the lock!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`${theController.party[0].name} breaks a lockpick!`)},
                    ()=>{removeDecision(`${theController.party[0].name} jams the lock!`, "pick lock")},
                    ()=>{toggleBattle(`as ${theController.party[0].name} reaches to pick the lock, something emerges from the shadows and races towards ${theController.party[0].name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
                ]
            ),
            new Decision(
                "break lock", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} attempts to break the lock`)},
                "strength",
                [
                    ()=>{toggleNewEncounter(`${theController.party[0].name} sucessfully breaks the lock!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`the lock doesn't budge.`)},
                    ()=>{removeDecision(`${theController.party[0].name} cannot break the lock!`, "break lock")},
                    ()=>{toggleBattle(`upon hearing the loud noise, something emerges from the shadows and races towards ${theController.party[0].name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
                ]
            ),
            new Decision(
                "search for key", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} searches for the key`)},
                "insight",
                [
                    ()=>{toggleNewEncounter(`${theController.party[0].name} finds the key and unlocks the chest!`, new UnlockedTreasureChest())}
                ],
                [
                    ()=>{retry(`${theController.party[0].name} seaches in vain for the key.`)},
                    ()=>{removeDecision(`${theController.party[0].name} searches everywhere for the key`, "search for key")},
                    ()=>{toggleBattle(`somethings lunges towards ${theController.party[0].name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
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
                ()=>{theController.printToGameConsole(`${theController.party[0].name} decides not to open the chest.`)},
                "certain",
                [
                    ()=>{leave(`${theController.party[0].name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "open chest", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} opens the chest.`)},
                "likely",
                [
                    ()=>{loot(`${theController.party[0].name} finds the following items`, [getRandomItem()], 100, 10)}
                ],
                [
                    ()=>{takeDamage(`as ${theController.party[0].name} opens the chest, an arrow flies up from the chest and hits ${theController.party[0].name}!`, 0.15, 0.25)},
                    ()=>{recieveStatusEffect(`as ${theController.party[0].name} opens the chest, the chest explodes in an inferno of flames!`, new Burned(theController.party[0]))}
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
                ()=>{theController.printToGameConsole(`${theController.party[0].name} attempts to sneak around the guard.`)},
                "likely",
                [
                    ()=>{leave(`${theController.party[0].name} slips away quietly.`)}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.party[0].name} and draws his weapon!`, [new AltusMage(theController.calculateAveragePartyLevel())])},
                    ()=>{toggleBattle(`the altus official spots ${theController.party[0].name} and draws his weapon!`, [new AltusGuard(theController.calculateAveragePartyLevel())])}
                ]
            ),
            new Decision(
                "back stab", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} sneaks up to the official and draws a knife.`)},
                "dexterity",
                [
                    ()=>{loot(`${theController.party[0].name} eliminates the offical without a sound. After searching the offical, ${theController.party[0].name} finds:`, [getRandomItem()], 40, 10)}
                ],
                [
                    ()=>{toggleBattle(`the altus official spots ${theController.party[0].name} and draws his weapon!`, [new AltusMage(theController.calculateAveragePartyLevel())])}
                ]
            ),
            new Decision(
                "set trap", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} sets a pit trap for the official and whistles for the guard.`)},
                "focus",
                [
                    ()=>{
                        let enemy = new AltusMage(theController.calculateAveragePartyLevel());
                        enemy.statusArray.push(new Bound(enemy));
                        toggleBattle(`the official clumsly falls into ${theController.party[0].name}'s trap and struggles to break free!`, [enemy]);
                    }
                ],
                [
                    ()=>{toggleBattle(`the altus official effortlessly evades the trap and attacks ${theController.party[0].name}!`, [new AltusMage(theController.calculateAveragePartyLevel())])}
                ]
            )
        ];
    }
}
export class MysteriousDoor extends Encounter{
    constructor(){
        super();
        this.name = "a mysterious door";
        this.messageFunction = ()=>{theController.printToGameConsole(`A mysterious door stands at the end of the passage. Glowing letters appear on the door, beckoning ${theController.party[0].name} to press them.`)};
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
                ()=>{theController.printToGameConsole(`${theController.party[0].name} steps away from the door.`)},
                "certain",
                [
                    ()=>{leave(`${theController.party[0].name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                rune1, 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} presses ${rune1}`)},
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.party[0].name} in!`, "portal", "random")},
                    ()=>{regainHP(`the door swings open and showers${theController.party[0].name} will a soothing light.`, 0.5)}
                ],
                [
                    ()=>{removeDecision(`${theController.party[0].name} the letters fade.`, rune1)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            ),
            new Decision(
                rune2, 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} presses ${rune2}`)},
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.party[0].name} in!`, "portal", "random")},
                    ()=>{regainHP(`the door swings open and showers${theController.party[0].name} will a soothing light.`, 0.5)}
                ],
                [
                    ()=>{removeDecision(`${theController.party[0].name} the letters fade.`, rune2)},
                    ()=>{leave(`the door shudders and crumbles, leaving nothing but a pile of rocks.`)}
                ]
            ),
            new Decision(
                rune3, 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} presses ${rune3}`)},
                "neutral",
                [
                    ()=>{changeMap(`the door swings open and pulls ${theController.party[0].name} in!`, "portal", "random")},
                    ()=>{regainHP(`the door swings open and showers${theController.party[0].name} will a soothing light.`, 0.5)}
                ],
                [
                    ()=>{removeDecision(`${theController.party[0].name} the letters fade.`, rune3)},
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
                ()=>{theController.printToGameConsole(`${theController.party[0].name} attempts to sneak around the skeleton.`)},
                "neutral",
                [
                    ()=>{leave(`${theController.party[0].name} slips away quietly.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton spots ${theController.party[0].name} and draws his weapon!`, [new Skeleton(theController.calculateAveragePartyLevel())])},
                    ()=>{toggleBattle(`the skeleton spots ${theController.party[0].name} and draws his weapon!`, [new SkeletonMage(theController.calculateAveragePartyLevel())])}
               
                ]
            ),
            new Decision(
                "lure away", 
                `${theController.party[0].name} throws a rock in the distance attempting to lure the skeleton away.`,
                "dexterity",
                [
                    ()=>{leave(`The skeleton leaves its post to investigates the sound leaving ${theController.party[0].name} a clear path forward.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton spots ${theController.party[0].name} and draws his weapon!`, [new Skeleton(theController.calculateAveragePartyLevel())])},
                    ()=>{toggleBattle(`the skeleton spots ${theController.party[0].name} and draws his weapon!`, [new SkeletonMage(theController.calculateAveragePartyLevel())])}
               
                ]
            ),
            new Decision(
                "talk to it", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} attempts to talk to the skeleton.`)},
                "unlikely",
                [
                    ()=>{loot(`${theController.party[0].name} and the skeleton have a pleasant discussion about the good old days. Then the skeleton gives ${theController.party[0].name}:`, [getRandomItem()], 0, 0)},
                    ()=>{leave(`${theController.party[0].name} asks the skeleton for directions. The skeleton stares back in disbelief and then nods to the hallway ahead.`)}
                ],
                [
                    ()=>{toggleBattle(`the skeleton fixes its gaze upon ${theController.party[0].name} and draws its weapon!`, [new Skeleton(theController.calculateAveragePartyLevel())])},
                    ()=>{toggleBattle(`the skeleton fixes its gaze upon ${theController.party[0].name} and draws its weapon!`, [new SkeletonMage(theController.calculateAveragePartyLevel())])},
                    
                    ()=>{
                        theController.party[0].statusArray.push(new Bound(theController.party[0]));
                        toggleBattle(`the skeleton grabs onto ${theController.party[0].name}!`, [new Skeleton(theController.calculateAveragePartyLevel())])
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
                    ()=>{leave(`${theController.party[0].name} moves on`)}
                ],
                [
                    
                ]
            ),
            new Decision(
                "trade", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} approaches the merchant`)},
                "certain",
                [
                    ()=>{initiateTrade(`${theController.party[0].name} offers to trade`, [new HealthPotion, getRandomItem(), getRandomItem(), getRandomItem(), getRandomItem()], "trade")}
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
                ()=>{theController.printToGameConsole(`${theController.party[0].name} avoids the cabin.`)},
                "certain",
                [
                    ()=>{leave(`${theController.party[0].name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "search cabin", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} searches the cabin for anything useful.`)},
                "neutral",
                [
                    ()=>{loot(`${theController.party[0].name} finds: `, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.party[0].name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
                ]
            ),
            new Decision(
                "take rest", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} searches for a place to rest.`)},
                "likely",
                [
                    ()=>{regainHP(`${theController.party[0].name} takes a short rest.`, 0.5)}
                ],
                [
                    ()=>{toggleBattle(`somethings lunges towards ${theController.party[0].name}!`, theController.map.mapEnviorment.generateEnemies(theController.calculateAveragePartyLevel(), false, theController.calculateMaxEnemyCount()))}
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
                ()=>{theController.printToGameConsole(`${theController.party[0].name} braces agains a nearby boulder!`)},
                "strength",
                [
                    ()=>{leave(`The avalanche crashes upon the land! After what feels like an eternity, ${theController.party[0].name} emerges from the rubble unharmed.`)}
                ],
                [
                    ()=>{takeDamage(`The avalanche crashes down upon ${theController.party[0].name}!`, 0.25, 0.50)},
                ]
            ),
            new Decision(
                "run away", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} flees the avalanche with haste!`)},
                "endurance",
                [
                    ()=>{leave(`with great athleticism, ${theController.party[0].name} barely escapes the avalanche!`)}
                ],
                [
                    ()=>{takeDamage(`The avalanche crashes down upon ${theController.party[0].name}!`, 0.25, 0.50)},
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
                ()=>{theController.printToGameConsole(`${theController.party[0].name} decides not to interfere.`)},
                "certain",
                [
                    ()=>{leave(`${theController.party[0].name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "defend traveler", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} steps in to aid the traveler.`)},
                "certain",
                [
                    ()=>{toggleNewEncounter(`the bandit turns to face ${theController.party[0].name}`, new DefendTraveler())}
                ],
                [
                    
                ]
            ),
            new Decision(
                "join bandit", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} joins the bandit in robbing the traveler.`)},
                "neutral",
                [
                    ()=>{loot(`${theController.party[0].name} and the thug rob the traveler of:`, [getRandomItem()], 20, 5)},
                ],
                [
                    ()=>{toggleBattle(`${theController.party[0].name} joins the thug in robbing the traveler. Not long after, the thug turns on ${theController.party[0].name}!`, [new Bandit(theController.calculateAveragePartyLevel())])}
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
                ()=>{theController.printToGameConsole(`${theController.party[0].name} lunges at the bandit with weapon drawn!`)},
                "certain",
                [
                    ()=>{toggleBattle(`the bandit draws his weapon to meet ${theController.party[0].name}!`, [new Bandit(theController.calculateAveragePartyLevel())])}
                ],
                [

                ]
            ),
            new Decision(
                "intimidate", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} demands the bandit leave!`)},
                "strength",
                [
                    ()=>{toggleNewEncounter(`fearing his life, the thug turns and runs. Shorty after the traveler speaks to ${theController.party[0].name}`, new AssistVictim())}
                ],
                [
                    ()=>{removeDecision(`the bandit laughs at ${theController.party[0].name}`, "intimidate")},
                ]
            ),
            new Decision(
                "persuade", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} attempts to reason with the thug.`)},
                "insight",
                [
                    ()=>{toggleNewEncounter(`${theController.party[0].name} convinces the thug to leave. Shorty after the traveler speaks to ${theController.party[0].name}`, new AssistVictim())}
                ],
                [
                    ()=>{removeDecision(`the thug scoffs at ${theController.party[0].name}`, "persuade")},
                ]
            )
        ];
    }
}
export class AssistVictim extends Encounter{
    constructor(){
        super();
        this.companion = theController.getWanderingCompanion();
        this.name = this.companion.name;
        this.messageFunction = ()=>{theController.printToGameConsole(`"you saved me! If there is anything I can do for you just ask!`)};
        this.imageSrc = this.companion.apperance;
        this.decisionArray = [
            new Decision(
                "accept gift", 
                ()=>{theController.printToGameConsole(`"Please take it, I insist!`)},
                "certain",
                [
                    ()=>{loot(`${theController.party[0].name} is rewarded with.`, [getRandomItem()], 50, 10)},
                ],
                [

                ]
            ),
            new Decision(
                "recruit", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} asks the traveler for his services in battle.`)},
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
        this.name = this.companion.name;
        this.messageFunction = ()=>{theController.printToGameConsole(`"The name's ${this.companion.name}. I'm always willing to help ... for a price`)};
        this.imageSrc = this.companion.apperance;
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} declines the mercenary's offer.`)},
                "certain",
                [
                    ()=>{
                        theController.wanderingCompanions.push(theController.encounter.companion);
                        leave(`${theController.party[0].name} moves on.`)
                    }
                ],
                [

                ]
            ),
            new Decision(
                "hire (300 gold)", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} attempts to hire the mercenary.`)},
                "certain",
                [
                    ()=>{
                        if(theController.partyGold >= 300){
                            theController.partyGold = theController.partyGold - 300;
                            recruit(`${theController.encounter.companion.name} joins ${theController.party[0].name}'s party`, theController.encounter.companion)
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
export class AncientTombstone extends Encounter{
    constructor(){
        super();
        this.name = "an ancient tombstone";
        this.messageFunction = ()=>{theController.printToGameConsole("an ancient tombstone lies ahead. It's text is barely legible.")};
        this.imageSrc = "./media/tombstone.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} walks past the tombstone.`)},
                "certain",
                [
                    ()=>{leave(`${theController.party[0].name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "Loot grave", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} starts digging around the tombstone, looking for anything useful.`)},
                "neutral",
                [
                    ()=>{loot(`${theController.party[0].name} finds: `, [getRandomItem()], 30, 10)},
                ],
                [
                    ()=>{toggleNewEncounter(`${theController.party[0].name} notices something in the grave.`, new UnearthedReamins())}
                ]
            )
        ];
    }
}
export class UnearthedReamins extends Encounter{
    constructor(){
        super();
        this.name = "unearthed remains";
        this.messageFunction = ()=>{theController.printToGameConsole(`${theController.party[0].name} digs up an skeleton. It appears to be holding something.`)};
        this.imageSrc = "./media/skull.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} steps away from the skeleton.`)},
                "certain",
                [
                    ()=>{leave(`${theController.party[0].name} moves on.`)}
                ],
                [

                ]
            ),
            new Decision(
                "distrub remains", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} reaches for the skeleton.`)},
                "neutral",
                [
                    ()=>{loot(`${theController.party[0].name} finds: `, [getRandomItem()], 50, 10)},
                ],
                [
                    ()=>{toggleBattle(`the skeleton magically animates and walks towards ${theController.party[0].name}!`, [new Skeleton(theController.calculateAveragePartyLevel())])},
                    ()=>{toggleBattle(`the skeleton magically animates and walks towards ${theController.party[0].name}!`, [new SkeletonMage(theController.calculateAveragePartyLevel())])},
                    ()=>{toggleBattle(`an ominous precence approaches ${theController.party[0].name}!`, [new Ghost(theController.calculateAveragePartyLevel())])}
                ]
            )
        ];
    }
}
export class Quicksand extends Encounter{
    constructor(){
        super();
        this.name = "quicksand";
        this.messageFunction = ()=>{theController.printToGameConsole(`the ground begins to sink, and soon ${theController.party[0].name} falls into quicksand`)};
        this.imageSrc = "./media/sand-pit.jpg";
        this.decisionArray = [
            new Decision(
                "crawl out", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} begins to crawl desperately.`)},
                "endurance",
                [
                    ()=>{leave(`${theController.party[0].name} escapes!`)}
                ],
                [
                    ()=>{takeDamage(`The quicksand engulfs ${theController.party[0].name}!`, 1.00, 1.00)},
                ]
            ),
            new Decision(
                "grab onto something", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} grabs onto a nearby object!`)},
                "strength",
                [
                    ()=>{leave(`${theController.party[0].name} escapes!`)}
                ],
                [
                    ()=>{takeDamage(`The quicksand engulfs ${theController.party[0].name}!`, 1.00, 1.00)},
                ]
            )
        ];
        if(theController.party.length > 1){
            this.decisionArray.push(
                new Decision(
                    "call for help", 
                    ()=>{theController.printToGameConsole(`${theController.party[0].name} calls for help!`)},
                    "likely",
                    [
                        ()=>{leave(`${theController.party[1].name} pulls ${theController.party[0].name} to safe ground with great strength.`)}
                    ],
                    [
                        ()=>{takeDamage(`The quicksand engulfs ${theController.party[0].name}!`, 1.00, 1.00)},
                    ]
                )
            )
        }
    }
}
export class AnimalTracks extends Encounter{
    constructor(){
        super();
        this.trackedEntity = '';
        this.hunter = '';
        switch(theController.map.mapEnviorment.biome){
            case "plains":
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        this.trackedEntity = new Character(["Dog", "./media/dog.jpg", "animal", [2,6,5,5,5,5], [new DogPaw, new DogPaw, "N/A", "N/A", "N/A", "N/A", "N/A"], [28, 12]]);
                        break;
                    case 1:
                        this.trackedEntity = new Character(["Hawk", "./media/hawk.jpg", "animal", [2,6,5,5,5,5], [new HawkTalons, new HawkTalons, "N/A", "N/A", "N/A", "N/A", "N/A"], [35, 18]]);
                        break;
                }
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        this.hunter = new Wolf(theController.calculateAveragePartyLevel());
                        break;
                    case 1:
                        this.hunter = new Bandit(theController.calculateAveragePartyLevel());
                        break;
                }
            case "forest":
                switch(Math.floor(Math.random()*1)){
                    case 0:
                        this.trackedEntity = new Character(["Dog", "./media/dog.jpg", "animal", [2,6,5,5,5,5], [new DogPaw, new DogPaw, "N/A", "N/A", "N/A", "N/A", "N/A"], [28, 12]]);
                        break;
                    }
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        this.hunter = new Wolf(theController.calculateAveragePartyLevel());
                        break;
                    case 1:
                        this.hunter = new Bandit(theController.calculateAveragePartyLevel());
                        break;
                }
            case "moutain":
                switch(Math.floor(Math.random()*1)){
                    case 0:
                        this.trackedEntity = new Character(["Hawk", "./media/hawk.jpg", "animal", [2,6,5,5,5,5], [new HawkTalons, new HawkTalons, "N/A", "N/A", "N/A", "N/A", "N/A"], [35, 18]]);
                        break;
                }
                switch(Math.floor(Math.random()*2)){
                    case 0:
                        this.hunter = new Wolf(theController.calculateAveragePartyLevel());
                        break;
                    case 1:
                        this.hunter = new Bandit(theController.calculateAveragePartyLevel());
                        break;
                }
            case "tundra":
                switch(Math.floor(Math.random()*1)){
                    case 0:
                        this.trackedEntity = new Character(["Tiger", "./media/tiger.jpg", "animal", [6,6,6,5,5,5], [new TigerClaw, new TigerClaw, "N/A", "N/A", "N/A", "N/A", "N/A"], [25, 10]]);
                        break;
                } 
                switch(Math.floor(Math.random()*3)){
                    case 0:
                        this.hunter = new Wolf(theController.calculateAveragePartyLevel());
                        break;
                    case 1:
                        this.hunter = new Tiger(theController.calculateAveragePartyLevel());
                        break;
                    case 2:
                        this.hunter = new Yeti(theController.calculateAveragePartyLevel());
                        break;
                } 
        }
        this.name = "animal tracks";
        this.messageFunction = ()=>{theController.printToGameConsole("animal tracks lie on the ground.")};
        this.imageSrc = "./media/animal-tracks.jpg";
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} ignores the tracks.`)},
                "likely",
                [
                    ()=>{leave(`${theController.party[0].name} moves on.`)}
                ],
                [
                    ()=>{
                        theController.party[0].statusArray.push(new Bound(theController.party[0]));
                        toggleBattle(`A nearby ${theController.encounter.hunter.name} ambushes ${theController.party[0].name}!`, [theController.encounter.hunter]);
                    }
                ]
            ),
            new Decision(
                "follow", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} decides to follow the tracks.`)},
                "endurance",
                [
                    ()=>{toggleNewEncounter(`${theController.party[0].name} notices something ahead.`, new WoundedAnimal(theController.encounter.trackedEntity, theController.encounter.hunter))}
                ],
                [
                    ()=>{toggleBattle(`A nearby ${theController.encounter.hunter.name} moves in to attack ${theController.party[0].name}!`, [theController.encounter.hunter])},
                    ()=>{leave(`after much tracking, ${theController.party[0].name} loses the tracks.`)}
                ]
            )
        ];
    }
}
export class WoundedAnimal extends Encounter{
    constructor(trackedEntity, hunter){
        super();
        this.trackedEntity = trackedEntity;
        this.hunter = hunter;
        this.name = `wounded ${this.trackedEntity.name}`;
        this.messageFunction = ()=>{theController.printToGameConsole(`A wounded ${this.trackedEntity.name} lies on the ground`)};
        this.imageSrc = this.trackedEntity.apperance;
        this.decisionArray = [
            new Decision(
                "move on", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} ignores the wounded ${theController.encounter.trackedEntity.name}.`)},
                "certain",
                [
                    ()=>{
                        leave(`${theController.party[0].name} moves on.`)
                    }
                ],
                [

                ]
            ),
            new Decision(
                "help animal", 
                ()=>{theController.printToGameConsole(`${theController.party[0].name} attempts to bandage the wounded ${theController.encounter.trackedEntity.name}.`)},
                "neutral",
                [
                    ()=>{recruit(`the ${theController.encounter.trackedEntity.name} stands tp its feet and nuzzles ${theController.party[0].name}`, theController.encounter.trackedEntity)}
                ],
                [
                    ()=>{
                        theController.encounter.trackedEntity.currentHP = Math.floor(theController.encounter.trackedEntity.currentHP/3);
                        toggleBattle(`the ${theController.encounter.trackedEntity.name} stands to its feet and prepares to fight!`, [theController.encounter.trackedEntity]);
                    },
                    ()=>{toggleBattle(`a ${theController.encounter.hunter.name} advances towards ${theController.party[0].name} giving ${theController.encounter.trackedEntity.name} enough time to escape! `, [theController.encounter.hunter])}
                ]
            ),
            new Decision(
                "put down animal", 
                ()=>{theController.printToGameConsole(`not wanting to see the amimal struggle, ${theController.party[0].name} puts down the ${theController.encounter.trackedEntity.name}.`)},
                "likely",
                [
                    ()=>{
                        leave(`${theController.party[0].name} moves on.`)
                    }
                ],
                [
                    ()=>{
                        theController.encounter.trackedEntity.currentHP = Math.floor(enemy.currentHP/3);
                        toggleBattle(`the ${theController.encounter.trackedEntity.name} stands to its feet and prepares to fight!`, [theController.encounter.trackedEntity]);
                    }
                ]
            ),
        ];
    }
}