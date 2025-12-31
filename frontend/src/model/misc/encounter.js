import { capiltalizeAllFirstLetters } from "../../utility.js";
import Battle from "./battle.js";
import {Wolf, Madman, MadMage, MadBandit, WoodWhisperer, GroveGuardian, AlterianWarrior, Spider, Skeleton, SkeletonCultist, FloatingSkull, ArmoredSkeleton, SkeletonColossus, TheSandShade, SandStalker, DryShark, DryKrakenTentacle, DryKraken, Sterben, Tiger, Panzerkamfer, Nightblade, EmperorDolos, ShackledSpirit, MurderMutt, Dog, InferiorLord} from "./entities.js";
import {Bleed, Frozen, MagicalAttackDebuff, PhysicalAttackDebuff, PhysicalDefenseDebuff, Poison, SoulLinked} from "./statusEffects.js";
import {SilentGrove2, SilentGrove3, Interloper} from "./stages/silentGrove.js";
import { Diamond, ForestStaff, HealthPotion, IceSickle, IronOre, KurtussBrewOfMadness, ParalysisTonic, Pelt, PineWood } from "./items.js";
import { ConversationWithMadman } from "./stages/madmanAhead.js";
import { BattleSurvivor, WoundedWarrior } from "./stages/aftermath.js";
import { getRandomArrayElementWeighted } from "../../utility.js";
import { TalkWithMercenary } from "./stages/wanderingMercenary.js";
import { CaveIn } from "./stages/caveIn.js";
import { ASkeletalAbomination, AtTheMysteriousAltar, MysteriousAltar } from "./stages/mysteriousAltar.js";
import { SandCastleEntrance, ShiftingSands2, ShiftingSands3, ShiftingSands4, StatuesInTheSand } from "./stages/shiftingSands.js";
import { DesertHorror, GaintTentacle } from "./stages/sinkhole.js";
import { ChillingGhost } from "./stages/somethingWatching.js";
import { ApexPredator, CrimsonSnow, TracksInTheSnow2, WoundedTiger } from "./stages/tracksInTheSnow.js";
import { DefeatedNightblade, ShadowyWarrior, SuspiciousMan } from "./stages/mysteriousFigure.js";
import { AHeroPrevails, APowerfulChoice, TheCycleContinues, TheKingdomsFate } from "./stages/theArtifact.js";
import { AbsorbSoul } from "./abilities.js";
import Stage from "./stage.js";
import { stageRegistry } from "./registries/stageRegistry.js";
import { AncientRuinsEntrance, DeepDarkness2, DeepDarkness3 } from "./stages/deepDarkness.js";



export default class Encounter{
    constructor(initialStage, resetOnLeave){
        this.initialStage = initialStage;
        this.currentStage = this.initialStage;
        this.resetOnLeave = resetOnLeave || false;
    }
    toSaveObject(){
        return{
            initialStage: this.initialStage ? this.initialStage.toSaveObject() : null,      
            currentStage: this.currentStage ? this.currentStage .toSaveObject() : null,  
            resetOnLeave: this.resetOnLeave
        }
    }
    static fromSaveObject(encounterData){
        let encounterConfig = { 
            ...encounterData,
            initialStage: Stage.fromSaveObject(encounterData.initialStage, stageRegistry),
            currentStage: Stage.fromSaveObject(encounterData.currentStage, stageRegistry),
        }
        return new Encounter(encounterConfig)
    }
}

export const messageRegistry = {
    //common
    somethingApproachesPosition: (currentCharacter, currentStageEntity) => { return `Something approaches ${currentCharacter.name}'s position!`; },
    somethingApproaches: () => { return `Something approaches...` },
    moveAlong: (currentCharacter, currentStageEntity)=>{return `${currentCharacter.name}'s party moves along.`},
    turnBack: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} turns back.` },
    leave: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} leaves.` },
    //bonfire
    bonfireStage: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name}'s party encounters a bonfire. Its embers appear to still be buring.`},
    bonfireRestDecision: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name}'s party lays down to rest.`},
    bonfireRestResultLoot: (currentCharacter, currentStageEntity) => {return `As ${currentCharacter.name}'s party enjoys a short rest. ${currentCharacter.name} finds something beside the fire.`},
    bonfireRestResult: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name}'s party rests.`},
    bonfireFlyingArrow: (currentCharacter, currentStageEntity) => {return `An arrow flies out of nowhere and hits ${currentCharacter.name}! Soon, ${currentCharacter.name}'s party is surrounded by mad Bandits!`},
    madmanAmbush: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name}'s party is ambushed by madmen!`},
    wolfpack: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name}'s party is met by a pack of wolves!`},
    
    //madman ahead
    madmanAheadStage: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name} sees a man walking ahead. The man appears to be walking aimlessly and laughing. Upon getting closer, ${currentCharacter.name} realizes this is one of the many souls to have sucumb to madness.`},
    chargeMadmanResult: (currentCharacter, currentStageEntity) => {return  `${currentCharacter.name} charges the Madman!`},
    eliminateMadmanDecision: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name} sneaks behind the Madman.`},
    sneakKillMadmanSuccess: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name} sneaks up behind the Madman and plunges a dagger into his side leaving the Madman lifeless on the ground. If he even was alive...`},
    sneakStartleMadman: (currentCharacter, currentStageEntity) => {return `The Madman is startled by ${currentCharacter.name}'s approach and draws his weapon!`},
    sneakStabMadmanHowl:  (currentCharacter, currentStageEntity) => {return `${currentCharacter.name} plunges a dagger into the side of the Madman side leaving him bleeding profusely! The Madman then sends a howl into the air alerting the nearby villagers!`},
    throwRockMadmanDecision: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name} hurls a rock at the Madman.`},
    throwRockKillMadman: (currentCharacter, currentStageEntity) => {return `The rock hits the Madman right in head leaving the Madman lifeless on the ground. If it even was alive...`},
    throwRockInjureMadman: (currentCharacter, currentStageEntity) => { return `The rock hits the Madman's body injuring him. After wincing from his wound, the Madman looks up and runs at ${currentCharacter.name}!`},
    throwRockStartleMadman: (currentCharacter, currentStageEntity) => { return `The rock goes far over the Madman's head and startles the Madman. The Madman then draws his weapon and rushes at ${currentCharacter.name}!`},
    throwRockMissMadman: (currentCharacter, currentStageEntity) => {return `The rock misses the madman! Surely he will notice another...`},
    throwRockWolves: (currentCharacter, currentStageEntity) => {return `The rock goes nowhere near the Madman and instead lands right in the middle of a pack of wolves! The wolves turn and glare at ${currentCharacter.name}!`},
    communicateMadmanDecision: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name} attempts to communicate with the Madman.`},
    communicateMadmanSuccessGift: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} converses with the Madman about the dilusional rants one might expect from a man who has lost his mind. Finally, the Madman smiles, and with tears in his eyes gives ${currentCharacter.name} his backpack. Just before darting off, he mutters, "It's really you .... Shackle Breaker...".`},
    communicateMadmanConversation: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name} starts a conversation with the Madman.`},
    communicateMadmanFail: (currentCharacter, currentStageEntity) => {return `The Madman laughs hysterically at ${currentCharacter.name} and draws his weapon! This attracts the attention of nearby madmen!`},
    leaveMadman: (currentCharacter, currentStageEntity) => {return `${currentCharacter.name} backs away from the Madman.`},
    //conversation with madman
    conversationWithMadmanStage: (currentCharacter, currentStageEntity) => `"Magic tell me things! Hee Hee! Tell me what magic say!"`,
    madmanRunAwaySuccess: (currentCharacter, currentStageEntity) => {return `Upon hearing ${currentCharacter.name}, the Madman falls back and hisses. The Madman then gets up and runs away leaving behind his knapsack in the process.`},
    madmanRunAwayFail: (currentCharacter, currentStageEntity) => {return `"Freak? .. Friend! Magic know many freak friend! You be freak friend too!"`},
    madmanGiveThingsSuccess: (currentCharacter, currentStageEntity) => {return `"Magic like you! So me like you! Hahahaha! Me give you these now!"`},
    madmanGiveThingsFail: (currentCharacter, currentStageEntity) => {return `"Hahaha! Magic no like you! So me no like you neither!"`},
    madmanBowSuccess: (currentCharacter, currentStageEntity) => {return `"No no! No hurt me! Me help magic! Me help you!"`},
    madmanBowFail: (currentCharacter, currentStageEntity) => {return `"You no hear magic! We hurt you now!"`},
    //treasureChest
    treasureChestStage: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name}'s party spots a locked chest ahead.`; },
    treasureChestPryAttempt: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} attempts to pry the chest open.`; },
    treasureChestPrySuccess: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} successfully pries the chest open!`; },
    treasureChestPryFail: (currentCharacter, currentStageEntity) => { return `The chest won't budge.`; },
    treasureChestPickAttempt: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} attempts to pick the lock.`; },
    treasureChestPickSuccess: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} successfully picks the lock!`; },
    treasureChestPickFail: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} jams the lock.`; },
    treasureChestCastSpellAttempt: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} attempts to open the chest with magic.`; },
    treasureChestCastSpellSuccess: (currentCharacter, currentStageEntity) => { return `With a wave of the hand, the chest lid flies open!`; },
    treasureChestCastSpellFail: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} babbles loudly at the chest in vain.`; },
    treasureChestCastSpellSummonEvil: (currentCharacter, currentStageEntity) => { return `A dark shadow emerges from the chest, taking form as a menacing creature!`; },
    treasureChestSearchAttempt: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} searches for the key.`; },
    treasureChestSearchSuccess: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} finds the key!`; },
    treasureChestSearchFail: (currentCharacter, currentStageEntity) => { return `The key is nowhere to be found.`; },
    treasureChestLeave: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} leaves the chest.`; },
    
    
    
    //Silent Grove
    silentGroveStage: (currentCharacter, currentStageEntity) => { return `The air around ${currentCharacter.name}'s party suddenly grows cold and all noise ceases...` },
    silentGrovePathMessage: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name}'s party continues along the path.` },
    silentGroveBrushMessage: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name}'s party cuts through the brush.` },
    silentGroveEnemyApproach: (currentCharacter, currentStageEntity) => { return `The woods begins to whisper...`},
    silentGrovePoisoned: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} begins to feel sick.` },
    
    silentGrove2Stage: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name}'s party encounters a fork in the path ahead. A dense fog covers both paths.`; },
    silentGrove2ProceedLeft: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name}'s party proceeds to the left.`; },
    silentGrove2ProceedRight: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name}'s party proceeds to the right.`; },
    silentGrove2LookAround: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} looks around.`; },
    silentGrove2Weakened: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} begins to feel weak.`; },
    silentGrove2Headache: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name}'s head starts to throb.`; },
    silentGrove2LookFind: (currentCharacter, currentStageEntity) => { return `While looking around, ${currentCharacter.name} finds something.`; },
    silentGrove2LookTrip: (currentCharacter, currentStageEntity) => { return `While looking around, ${currentCharacter.name} trips and falls.`; },
    
    silentGrove3Stage: (currentCharacter, currentStageEntity) => {  return `${currentCharacter.name}'s party walks into a large clearing. Fog surrounds what looks to be a lone tree.`;},
    silentGrove3ExamineTree: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} examines the tree.` },
    silentGrove3ExamineTreeSuccess: (currentCharacter, currentStageEntity) => { return `The tree begins to glow as something big approaches...` },
    silentGrove3ExamineTreeFail: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} sees nothing interesting about the tree.` },
    silentGrove3CutTree: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} attempts to cut down the tree.` },
    silentGrove3CutTreeSuccess: (currentCharacter, currentStageEntity) => { return `The tree falls with a thud and ${currentCharacter.name} gathers its wood.` },
    silentGrove3CutTreeFail: () => { return `The tree is too hard to cut.` },

    interloperStage: (currentCharacter, currentStageEntity) => { return `A giant beast glares ${currentCharacter.name} straight in the eyes!` },
    interloperAttack: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} attacks!` },
    interloperFleeAttempt: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} attempts to flee!` },
    interloperFleeSuccess: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} escapes the giant being!` },
    interloperFleeFail: (currentCharacter, currentStageEntity) => { return `As ${currentCharacter.name} attempts to escape, vines snare ${currentCharacter.name}!` },
    //Wandering Mercenary
    wanderingMercenaryStage: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} encounters a mercenary for hire ahead.` },
    wanderingMercenaryApproach: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} talks with the mercenary.` },
    talkWithMercenaryStage: (currentCharacter, currentStageEntity) => { 
        let chance = Math.floor(Math.random()*3)
        if(chance == 0) return `"You look like the type that could use some muscle, but can you spare the coin?"`
        if(chance == 1) return `"Keep your hands were I can see em, that is unless you are reaching for coin?"`
        if(chance == 2) return `"Hail friend! Sane folk like us ought to stick together eh?"`
    }, 
    talkMercenaryPaySuccess: (currentCharacter, currentStageEntity) => {
        const msgs = [
            `"Pleasure doing business with you boss! Oh and don't worry about me. I can handle myself."`,
            `"I'll put this to good use. Lead the way!"`,
            `"Thanks, allies are hard to come by..."`,
        ];
        return msgs[Math.floor(Math.random() * msgs.length)];
    },
    talkMercenaryPersuadeSuccess: () => {
        const msgs = [
            `"You seem like the type I could follow. Lead the way boss!"`,
            `"Not like I have much of a choice ... Let me gather my things"`,
            `"I'll come for now, but the second you turn ... uh ... never mind."`,
        ];
        return msgs[Math.floor(Math.random() * msgs.length)];
    },
    talkMercenaryPersuadeFail: (currentCharacter, currentStageEntity) => { return `The mercenary looks unimpressed.` },
    talkMercenaryPersuadeWalkAway: (currentCharacter, currentStageEntity) => { return `The mercenary rolls their eyes and walks away.` },
    talkMercenaryPickpocketAttempt: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} attempts to pickpocket the Mercenary.` },
    talkMercenaryPickpocketFail: () => {
        const msgs = [
            `"Oh now you have done it!"`,
            `"Just what... do you think... your doing?!"`,
            `"A thief eh! I should have known!"`,
        ];
        return msgs[Math.floor(Math.random() * msgs.length)];
    },
    //Aftermath
    aftermathStage: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name}'s party stumbles upon an old battlefield. The battle looks to have occured some time ago.` },
    aftermathLoot: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} searches the battlefield for loot.` },
    aftermathLootSuccess: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} finds something on one of the fallen warriors.` },
    aftermathLootFail: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} sees nothing of value.` },
    aftermathMadmenAppear: (currentCharacter, currentStageEntity) => { return `As ${currentCharacter.name} searches the battlefield, a group of madmen appear on the horizon!` },
    aftermathAlterianRise: (currentCharacter, currentStageEntity) => { return `While examining the bodies for loot, one of them stirs and glares at ${currentCharacter.name}! As if on command others do the same!` },
    aftermathSearchSurvivors: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} searches for survivors.` },
    aftermathSearchSuccess: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} sees something ahead.` },
    aftermathSearchFail: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} doesn't see any survivors.` },
    aftermathLeave: (currentCharacter, currentStageEntity) => { return `${currentCharacter.name} leaves the battlefield.` },
    //Wounded Warrior
    woundedWarriorStage: (currentCharacter, currentStageEntity) => `${currentCharacter.name} approaches a wounded warrior still breathing, but bleeding badly.`,
    woundedWarriorBandageAttempt: (currentCharacter, currentStageEntity) => `${currentCharacter.name} attempts to bandage the warrior.`,
    woundedWarriorBandageBattle: (currentCharacter, currentStageEntity) => `As ${currentCharacter.name} bandages the warrior, the warrior grabs ${currentCharacter.name} and draws his weapon! Soon other fallen warriors do the same!`,
    woundedWarriorRobAttempt: (currentCharacter, currentStageEntity) => `${currentCharacter.name} attempts to rob the wounded warrior.`,
    woundedWarriorRobSuccess: (currentCharacter, currentStageEntity) => `${currentCharacter.name} finds something on the wounded warrior. Meanwhile the warrior breathes his last breath.`,
    woundedWarriorRobBattle: (currentCharacter, currentStageEntity) => `As ${currentCharacter.name} approaches the warrior, the warrior grabs ${currentCharacter.name} and draws his weapon! Soon other fallen warriors do the same.`,
    woundedWarriorLeave: (currentCharacter, currentStageEntity) => `${currentCharacter.name} leaves the warrior to his fate.`,
    //Battle Survivor
    battleSurvivorStage: (currentCharacter, currentStageEntity) => `The warrior stands up from the ground and looks at ${currentCharacter.name}. "What do you want?"`,
    battleSurvivorMadmen: (currentCharacter, currentStageEntity) => `"Are you surprised? If you must know, a group of madmen chased me straight into this mess and before I knew it, I was out cold! It's a miracle you showed up, but don't expect any more thanks than that."`,
    battleSurvivorChased: (currentCharacter, currentStageEntity) => `"How should I know? Those madmen will chase anything that moves. Speaking of which, you should get a move on if you know what's good for you."`,
    battleSurvivorIdentity: (currentCharacter, currentStageEntity) => {
        const responses = [
            `"${currentStageEntity}, what is it to you?"`,
            `"Wouldn't you like to know?"`,
            `"Let's just say I used to be in the ${capiltalizeAllFirstLetters(currentStageEntity.factions[0])} guard. Catch my meaning?"`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    },
    battleSurvivorJoinSuccess: (currentCharacter, currentStageEntity) => {
        const responses = [
            `"Fine! But know this. The moment you turn on me, you will regret it! Oh and uh ... thanks..."`,
            `"(Sigh) What choice do I have? Better to die with company anyway."`,
            `"Fine, but I will be watching you. And don't think because I am wounded that I've lost my edge."`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    },
    battleSurvivorJoinFail1: (currentCharacter, currentStageEntity) => {
        const responses = [
            `"Safe! Hah! You won't last long out here. Best be on your way."`,
            `"I can't remember the last time I felt safe. Much less so traveling with others."`,
            `"You seem like a good person. A word of advice, that is a bad thing around here."`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    },
    battleSurvivorJoinFail2: (currentCharacter, currentStageEntity) => `"Hmm I am not convinced..."`,
    battleSurvivorJoinIncentive: (currentCharacter, currentStageEntity) => `"Well ... what are you waiting for? Let's get out of here!"`,
    battleSurvivorLeave: (currentCharacter, currentStageEntity) => `${currentCharacter.name} and the warrior part ways.`,
    //Wounded Mut
    woundedMuttIntro: (currentCharacter, currentStageEntity) => `${currentCharacter.name} spots a small, injured Mutt curled up against a rock.`,
    woundedMuttBandageAttempt: (currentCharacter, currentStageEntity) => `${currentCharacter.name} attempts to bandage the Wounded Mutt.`,
    woundedMuttNuzzle: (currentCharacter, currentStageEntity) => `The Wounded Mutt nuzzles against ${currentCharacter.name}'s hand, seeking comfort.`,
    woundedMuttTransformation: (currentCharacter, currentStageEntity) => `As ${currentCharacter.name} approaches, the Wounded Mut twists and contorts, violently...`,
    woundedMuttBandageRetry: (currentCharacter, currentStageEntity) => `The bandage slips from ${currentCharacter.name}'s hands, and the Wounded Mutt whimpers in pain soiling the bandage.`,
    woundedMuttBandageDeath: (currentCharacter, currentStageEntity) => `Despite ${currentCharacter.name}'s efforts, there is just too much blood, the mutt whimpers and closes its eyes.`,
    //CaveIn
    caveInEncounter: (currentCharacter) => `${currentCharacter.name}'s party encounters a pile of rubble blocking the path.`,
    caveInAttemptDig: (currentCharacter) => `${currentCharacter.name} attemps to dig a path through the rubble.`,
    caveInFindItemMessage: (currentCharacter) => `While digging, ${currentCharacter.name} finds something in the rubble.`,
    caveInClearPath: (currentCharacter) => `${currentCharacter.name}'s party digs through the rubble!`,
    caveInExhaustedClear: (currentCharacter) => `${currentCharacter.name}'s party digs through the rubble for what feels like hours. Eventually the exhausted party clears a path through.`,
    caveInRocksFall: (currentCharacter) => `As ${currentCharacter.name} works to clear the path, heavy rocks fall on ${currentCharacter.name}!`,
    caveInSpiderNest: (currentCharacter) => `While digging, ${currentCharacter.name} breaks into a spider's nest!`,
    //Mineral Vein
    mineralVeinEncounter: (currentCharacter) => `${currentCharacter.name} spots a mineral vein ahead.`,
    mineralVeinMineAttempt: (currentCharacter) => `${currentCharacter.name} mines at the mineral vein.`,
    mineralVeinEmpty: (currentCharacter) => `The mineal vein appears to be empty.`,
    mineralVeinWorthlessStone: (currentCharacter) => `${currentCharacter.name} mines only worthless stone.`,
    mineralVeinSpiderNest: (currentCharacter) => `While digging, ${currentCharacter.name} breaks into a spider's nest!`,
    mineralVeinCollapse: (currentCharacter) => `The ceiling collapses on ${currentCharacter.name}!`,
    mineralVeinLeave: (currentCharacter) => `${currentCharacter.name} leaves the mineral vein.`,
    //Mysterious Altar
    mysteriousAltarIntro: (currentCharacter) => { return `While walking the dark paths of the cave, ${currentCharacter.name}'s party stumbles upon a mysterious altar in a large open room. Bones and skeletons lay everywhere and an ominous chill fills the air.` },
    mysteriousAltarApproach: (currentCharacter) => { return `${currentCharacter.name} approaches the altar.` },
    altarSkeletonsAttack: (currentCharacter) => { return `As ${currentCharacter.name} approaches the altar, skeletons along the floor slowly begin to move. Before ${currentCharacter.name}'s party realizes what is happening, the Skeletons are on top of them!` },
    altarReleasesSmoke: (currentCharacter) => { return `As ${currentCharacter.name} approaches the altar, the altar releases a cloud of smoke, making ${currentCharacter.name} feel fatigued.` },
    altarLeaveAlone: (currentCharacter) => { return `${currentCharacter.name} continues along the path leaving the altar alone.` },
    //At The Mysterious Altar
    altarSkullIntro: (currentCharacter) => `${currentCharacter.name}'s walks up to altar and sees a skull resting high above the bones on the floor. The skull almost feels as if it were placed there on purpose.`,
    altarBlueGlowStrength: (currentCharacter) => `As ${currentCharacter.name} reaches to examine the skull, the skull's eyes begin to glow blue filling the whole room with a blinding light! Upon opening their eye's ${currentCharacter.name}, realizes that the skull has disappered and feels a sense of newly found strength.`,
    altarGreenGlowLoot: (currentCharacter) => `As ${currentCharacter.name} reaches to examine the skull, the skull's eyes begin to glow green. Suddenly, mysterious objects materialize on the altar just waiting for ${currentCharacter.name} to grab them.`,
    altarBoneSwirlWarning: (currentCharacter) => `As ${currentCharacter.name} reaches to examine the skull, the skull begins to shake.. and its eyes begin to glow! Meanwhile, bones begin flying around the room eventually making their way toward the skull on the altar... `,
    altarRedGlowAttack: (currentCharacter) => `As ${currentCharacter.name} reaches to examine the skull, the skull's eyes begin to glow red filling the whole room with a blinding light! Upon opening their eye's ${currentCharacter.name}, realizes that the skull has disappered and a group of skeletons is quickly appraoching!`,
    altarBackUpMessage: (currentCharacter) => `${currentCharacter.name} backs away from the altar.`,
    //A Skeletal Abomination
    skeletalAbominationIntro: (currentCharacter) => { return `The bones come together in a hideous fashion forming a monstrous construct of bones that roars in ${currentCharacter.name}'s face!` },
    skeletalAbominationAttackMsg: (currentCharacter) => { return `${currentCharacter.name} attacks!` },
    skeletalAbominationAttemptEscape: (currentCharacter) => { return `${currentCharacter.name} attempts to flee!` },
    skeletalAbominationEscapeSuccess: (currentCharacter) => { return `${currentCharacter.name} escapes the skeletal monster!` },
    skeletalAbominationEscapeFail: (currentCharacter) => { return `As ${currentCharacter.name} attempts to escape, the Skeleton Colossus blocks the exit!` },
    //Deep Darkness
    deepDarknessStage: (currentCharacter) => `${currentCharacter.name} steps into a choking darkness. The air is heavy, and unseen eyes seem to follow every move.`,
    deepDarknessProceedPathMessage: (currentCharacter) => `${currentCharacter.name} tries to navigate through the thick shadows, step by step...`,
    deepDarknessEnemyApproach: (currentCharacter) => `From within the black void, shapes stir. ${currentCharacter.name} realizes too late — something hostile is approaching!`,
    deepDarknessFear: (currentCharacter) => `${currentCharacter.name}'s resolve falters. A cold fear clutches at their chest, weakening their defenses...`,
    deepDarknessGaze: (currentCharacter) => `${currentCharacter.name} stares into the abyss, hoping to understand the darkness...`,
    deepDarknessTorchMessage: (currentCharacter) => `The torch flares to life, its warm light forcing the shadows back for ${currentCharacter.name}.`,
    deepDarkness2Stage: (currentCharacter) => `The oppressive gloom deepens as ${currentCharacter.name} ventures further. The silence is suffocating.`,
    deepDarkness3Stage: (currentCharacter) => `A faint outline of a doorway emerges ahead of ${currentCharacter.name}, though the darkness clings stubbornly to their steps.`,
    ancientRuinsEntrance: (currentCharacter) => `${currentCharacter.name} stands before crumbling stone ruins. Faint whispers echo from within...`,
    ancientRuinsEntranceEnterRuins: (currentCharacter) => `${currentCharacter.name} steps into the ruins, shadows stretching unnaturally along the walls...`,
    ancientRuinsEntranceInferiorLordPlea: (currentCharacter) => `"Leave... please ...before it is too late...!"`,

    //ShiftingSands
    shiftingSandsIntro: (currentCharacter) => { return `While walking through the sands, ${currentCharacter.name} sees something in the distance. ` },
    shiftingSandsPressOnward: (currentCharacter) => { return `${currentCharacter.name}'s party presses onward.` },
    //Statues In The Sand
    statuesIntro: (currentCharacter) => { return `While walking along, ${currentCharacter.name} realizes that a group of sandy statues has suddenly appeared behind the party. Have they been there all along? ` },
    statuesBackAway: (currentCharacter) => { return `${currentCharacter.name}'s party backs away slowly from the statues making sure to maintain eye contact.` },
    statuesBackAwaySuccess: (currentCharacter) => { return `After maintaining careful eye contact and backing away slowly, ${currentCharacter.name}'s party sees the statues dissipate into the desert winds.` },
    statuesBackAwayFail: (currentCharacter) => { return `While on the first shift to watch the statues, ${currentCharacter.name} trips and gets back up only to realize the statues have surrounded the party! And this time, they don't look like statues!` },
    statuesDestroy: (currentCharacter) => { return `${currentCharacter.name} attempts to smash the statues.` },
    statuesDestroySuccess: (currentCharacter) => { return `As ${currentCharacter.name} smashes the statues, the statues turn into piles of sand and are blown away by the desert wind.` },
    statuesDestroyFail: (currentCharacter) => { return `Just as ${currentCharacter.name} withdraws from pile of sand that used to be statues, the sand erupts into an ominous vortex! From the vortex emerges a cloaked figure ready to fight!` },
    statuesRun: (currentCharacter) => { return `${currentCharacter.name}'s party attempts to run away!` },
    statuesRunSuccess: (currentCharacter) => { return `${currentCharacter.name}'s party wastes no time running from the unnatural statues. It appears the statues are nowhere to be seen.` },
    statuesRunFail: (currentCharacter) => { return `As ${currentCharacter.name}'s party retreats the statues suddenly come to life an almost instantly are upon the party!` },
    //Shifting Sands 2
    shiftingSands2Intro: (currentCharacter) => { return  `${currentCharacter.name}'s party continues to approach the distant object, but the as the party grows closer, the object appears to fade into the desert `},
    shiftingSands2pressOn: (currentCharacter) => `${currentCharacter.name}'s party presses onward.`,
    shiftingSands2mirageExhaustion: (currentCharacter) => `${currentCharacter.name}'s party walks for hours in vain, only to realize they have been chasing a mirage. Discouraged, the party turns back tired and exhausted.`,
    shiftingSands2turnBack: (currentCharacter) => `${currentCharacter.name}'s party chooses to turn back.`,
    //Shifting Sands 3
    shiftingSands3Intro: (currentCharacter) => { return `The object gets bigger as ${currentCharacter.name}'s party grows closer to it. Just as ${currentCharacter.name} seems to be able to make out the object, the winds pickup, blowing sand into the air and obscuring the distant object. Pressing on will likely tire the party.`},
    shiftingSands3KeepGoing: (currentCharacter) => `${currentCharacter.name}'s party chooses to press onward despite the powerful winds.`,
    shiftingSands3MirageExhaustion: (currentCharacter) => `${currentCharacter.name}'s party walks for hours in vain, only to realize they have been chasing a mirage. Discouraged, the party turns back tired and exhausted.`,
    shiftingSands3TurnBack: (currentCharacter) => `${currentCharacter.name}'s party chooses to turn back.`,
    shiftingSands3Intro: (currentCharacter) => `The object gets bigger as ${currentCharacter.name}'s party grows closer to it. Just as ${currentCharacter.name} seems to be able to make out the object, the winds pick up, blowing sand into the air and obscuring the distant object. Pressing on will likely tire the party.`,
    //Shifting Sands 4
    shiftingSands4Intro: (currentCharacter) => { return `Nearing exhaustion, ${currentCharacter.name}'s party approaches the object. As ${currentCharacter.name} looks up the object appears to be just ahead and massive in size.` },
    shiftingSands4KeepGoing: (currentCharacter) => `${currentCharacter.name}'s party chooses to press onward despite the powerful winds.`,
    shiftingSands4RockRefuge: (currentCharacter) => `${currentCharacter.name}'s party approaches the object, only to realize the object is just a large rock. Discouraged, the party takes refuge against the rock tired and exhausted.`,
    shiftingSands4TurnBack: (currentCharacter) => `${currentCharacter.name}'s party chooses to turn back.`,
    //Sand Castle Entrance
    sandCastleEntrance: (currentCharacter) => `${currentCharacter.name} is about to collapse, but the party emerges from the winds into a clearing. In the middle of the clearing lies a castle. Its walls forboding but made of sand. The tops of its towers appear to be fading away like dust in the wind.`,
    sandCastleEntranceEnterCastle: (currentCharacter) => `${currentCharacter.name}'s party enters the castle.`,
    sandCastleEntranceTurnBack: (currentCharacter) => `${currentCharacter.name}'s party chooses to turn back.`,
    sandCastleEntranceShadeMurmur: (currentCharacter) => `Tho shea-ath katan.... (Murmuring in an unknown language)`,
    //sinkhole
    sinkholeStageIntro: (currentCharacter) => { return `As ${currentCharacter.name}'s party walks along, the ground begins to sink around them!` },
    sinkholeRunAttempt: (currentCharacter) => { return `${currentCharacter.name} tries to run out of the sinkhole.` },
    sinkholeEscapeSuccess: (currentCharacter) => { return `${currentCharacter.name}'s party runs out of the sinkhole before it collapses. What could have caused such a thing...` },
    sinkholeSharkEmerges: (currentCharacter) => { return `Suddenly the ground stops sinking and a beast emerges from the sand!` },
    sinkholeGrabRock: (currentCharacter) => { return `${currentCharacter.name} grabs onto a nearby rock.` },
    sinkholeGrabSuccess: (currentCharacter) => { return `${currentCharacter.name}'s party grabs onto a nearby rock and waits out the sinkhole. What could have caused such a thing...` },
    //Giant Tentacle
    gaintTentacleIntro: (currentCharacter) => { return `As if things couldn't get bad enough, a giant tentacle suddenly erupts from the sand and lunges at ${currentCharacter.name}!` },
    gaintTentacleRunAttempt: (currentCharacter) => { return `${currentCharacter.name} tries to run out of the sinkhole.` },
    gaintTentacleEscapeSuccess: (currentCharacter) => { return `${currentCharacter.name} quickly runs out of the sinkhole. Soon the tentacle sinks back into the desert.` },
    gaintTentacleSwingAttempt: (currentCharacter) => { return `${currentCharacter.name} swings at the tentacle.` },
    gaintTentacleSwingSuccess: (currentCharacter) => { return `${currentCharacter.name}'s party swings their weapons at the tentacle. Injured, the tentacle retreats into the desert sand.` },
    //Desert Horror
    desertHorrorIntro: (currentCharacter) => { return `The ground beneath ${currentCharacter.name} starts to shake, then a tentacled monstrosity emerges from the sinkhole!` },
    desertHorrorPrepareToFight: (currentCharacter) => { return `${currentCharacter.name}'s party prepares to fight the monster!` },
    desertHorrorSwingTentacles: (currentCharacter) => { return `${currentCharacter.name} swings at the monster's tentacles.` },
    desertHorrorSwingTentaclesSuccess: (currentCharacter) => { return `${currentCharacter.name} slashes two of the monster's tentacles in half! Enraged, the monster rears and rushes towards ${currentCharacter.name}!` },
    desertHorrorSwingTentaclesFail: (currentCharacter) => { return `As ${currentCharacter.name} tries to attack the monster's tentacles, one of them smashes into ${currentCharacter.name}!` },
    desertHorrorThrowAtEye: (currentCharacter) => { return `${currentCharacter.name} attempts to throw a dagger at the monster's eye.` },
    desertHorrorThrowAtEyeSuccess: (currentCharacter) => { return `${currentCharacter.name} throws a dagger right into the monster's eye, the monster shakes furiously and rushes towards ${currentCharacter.name}!` },
    desertHorrorThrowAtEyeFail: (currentCharacter) => { return `Before ${currentCharacter.name} can throw the dagger, the monster knock ${currentCharacter.name} to the ground with its tentacles!` },
    desertHorrorJumpInMouth: (currentCharacter) => { return `${currentCharacter.name} charges into the monster's mouth.` },
    desertHorrorJumpInMouthSuccess: (currentCharacter) => { return `With extravagant strength, ${currentCharacter.name} jumps into the monster's mouth and slays the monster from within!` },
    desertHorrorJumpInMouthFail: (currentCharacter) => { return `After a herioic charge, ${currentCharacter.name} is eaten instantly.` },
    desertHorrorRun: (currentCharacter) => { return `${currentCharacter.name} tries to run out of the sinkhole.` },
    desertHorrorRunSuccess: (currentCharacter) => { return `${currentCharacter.name} desperately dodges the tentacles reaching for the party. With great strength and plenty of luck, ${currentCharacter.name}'s party barely escapes the monstrosity.` },
    //Something Watching
    somethingWatchingIntro: (currentCharacter) => { return `${currentCharacter.name} stops. Something is watching...` },
    somethingWatchingLookAround: (currentCharacter) => { return `${currentCharacter.name} looks around.` },
    somethingWatchingAmbush: (currentCharacter) => { return `Something approaches ${currentCharacter.name}'s position!` },
    somethingWatchingWolfAttack: (currentCharacter) => { return `A pack of wolves races towards ${currentCharacter.name}!` },
    //Chilling Ghost
    chillingGhostIntro: (currentCharacter) => { return `A ghostly figure stares at ${currentCharacter.name}. Just then, ice starts to crawl up ${currentCharacter.name}'s legs!` },
    chillingGhostAttack: (currentCharacter) => { return `${currentCharacter.name} attacks!` },
    chillingGhostCommunicateAttempt: (currentCharacter) => { return `${currentCharacter.name} attempts to communicate quickly!` },
    chillingGhostCommunicateFail: (currentCharacter) => { return `Before ${currentCharacter.name} can utter a sound, the ghostly figure rushes towards ${currentCharacter.name}!` },
    chillingGhostRunAttempt: (currentCharacter) => { return `${currentCharacter.name} attempts to flee!` },
    chillingGhostRunFail: (currentCharacter) => { return `${currentCharacter.name} tires to makes a run for it but ice has frozen ${currentCharacter.name}'s legs!` },
    chillingGhostCommunicateSuccess: (currentCharacter) => { return `The ghostly figures nods at ${currentCharacter.name} and then fades away. It appears to have left something.` },
    chillingGhostRunSuccess: (currentCharacter) => { return `${currentCharacter.name} escapes the ghostly figure!` },
    //Tracks in the snow
    tracksInTheSnowIntro: (currentCharacter) => { return `${currentCharacter.name} notices tracks in the snow.` },
    tracksInTheSnowFollow: (currentCharacter) => { return `${currentCharacter.name} follows the tracks.` },
    tracksInTheSnowRetry: (currentCharacter) => { return `${currentCharacter.name}'s wanders in the snow looking for more tracks.` },
    //Tracks in the snow2
    tracksInTheSnow2Intro: (currentCharacter) => { return `${currentCharacter.name} sees more tracks ahead.` },
    //Crimson Snow
    crimsonSnowIntro: (currentCharacter) => { return `${currentCharacter.name} sees crimson red snow ahead.` },
    crimsonSnowNothingFound: (currentCharacter) => { return `${currentCharacter.name} doesn't see any thing noteworthy.` },
    //Wounded Tiger
    woundedTigerIntro: (currentCharacter) => { return `${currentCharacter.name} stumbles upon a tiger lying wounded in a clearing, its flank bloodied and breath shallow.` },
    woundedTigerBandageAttempt: (currentCharacter) => { return `${currentCharacter.name} kneels beside the creature and gently applies a bandage.` },
    woundedTigerNuzzle: (currentCharacter) => { return `The tiger rises shakily, then nuzzles ${currentCharacter.name} with surprising gentleness.` },
    woundedTigerBanditsAttack: (currentCharacter) => { return `An arrow flies right at the tiger killing it instantly. Then a bandit emerges, drawn by the smell of blood.` },
    woundedTigerWild: (currentCharacter) => { return `The tiger stands and growls as ${currentCharacter.name} approaches. Then, in a pain fueld rage, the tiger lunges!` },
    woundedTigerPackAmbush: (currentCharacter) => { return `As ${currentCharacter.name} approaches, other tigers emerge from the shadows surrounding ${currentCharacter.name}!` },
    woundedTigerPutToRest: (currentCharacter) => { return `${currentCharacter.name} draws their weapon and ends the animal's suffering.` },
    woundedTigerLeave: (currentCharacter) => { return `${currentCharacter.name} leaves the wounded tiger behind and moves on.` },
    //Apex Predator
    apexPredatorIntro: () => `(An unnatural beast growls...)`,
    apexPredatorAttackMessage: (currentCharacter) => `${currentCharacter.name} attacks!`,
    apexPredatorEscape: (currentCharacter) => `${currentCharacter.name} escapes the predator!`,
    apexPredatorCutOff: (currentCharacter) => `The predator cuts off ${currentCharacter.name}'s escape!`,
    apexPredatorAttemptFlee: (currentCharacter) => `${currentCharacter.name} attempts to flee!`, 
    //MysteriousFigure
    mysteriousFigureIntro: (currentCharacter) => `${currentCharacter.name} barely sees the silhouette of a person ahead.`,
    mysteriousFigureApproachMsg: (currentCharacter) => `${currentCharacter.name} approaches the mysterious figure.`,
    //Suspicious Man
    suspiciousManIntro: (currentCharacter) => {
        let message = `As ${currentCharacter.name} approaches, the figure takes the appearance of a Suspicious Man. Seeing ${currentCharacter.name}, the man holds up a vial containing an unknown liquid and says.`;
        let chance = Math.floor(Math.random() * 3);
        if (chance === 0) message += `"You look like you need potion! Hahaha! Me have potion, just for you!"`;
        if (chance === 1) message += `"Need a drink?"`;
        if (chance === 2) message += `"Such a sorry sight. Here, I have what you need."`;
        return message;
    },
    suspiciousManBuyPotion: (currentCharacter) => `${currentCharacter.name} hands over 50 gold coins to buy the potion.`,
    suspiciousManBuyPotionSuccess: () => `The Suspicious Man stares at the gold coins in his hand and lets out a a cry of delight. He then pockets the gold quickly and runs off into the distance.`,
    suspiciousManPersuadeManSuccess: (currentCharacter) => `"Fine!" The Suspicious Man says angrily at ${currentCharacter.name}. Nevertheless, the man begins laughing manically and then runs off into the distance.`,
    suspiciousManPersuadeManFail: (currentCharacter) => `As ${currentCharacter.name} offers the gold to the mysterious man, the Suspicious Man pushes ${currentCharacter.name} to the ground and steals the gold. "Hehehe! It's mine, all mine!"`,
    suspiciousManPickpocketAttempt: (currentCharacter) => `${currentCharacter.name} attempts to pickpocket the Suspicious Man.`,
    suspiciousManPickpocketFail: () => {
        let chance = Math.floor(Math.random() * 3);
        if (chance === 0) return `"Thief? Haha! Bye Bye!"`;
        if (chance === 1) return `"Eeeek!" The Suspicious Man squeals as he runs away.`;
        if (chance === 2) return `"Stay back!" The Suspicious Man screams as he runs away.`;
    },
    suspiciousManLeave: (currentCharacter) => `${currentCharacter.name} leaves the Suspicious Man.`,
    //Shadowy Warrior
    shadowyWarriorIntro: (currentCharacter) => { return `As ${currentCharacter.name} approaches, the figure takes the appearance of a Shadowy Warrior. The mysterious warrior makes a series of quick hand gestures and then brandishes a sword.` },
    shadowyWarriorCommunicateAttempt: (currentCharacter) => { return `${currentCharacter.name} attempts to communicate with the Shadowy Warrior.` },
    shadowyWarriorCommunicateRespect: (currentCharacter) => { return `${currentCharacter.name} tries to communicate with the Shadowy Warrior by mimicking the hand gestures the warrior previously used. The Shadowy Warrior then nods at ${currentCharacter.name} as if in a sign of respect.` },
    shadowyWarriorCommunicateDisappear: (currentCharacter) => { return `${currentCharacter.name} awkwardly tries to communicate with the Shadowy Warrior by mimicking the hand gestures the warrior previously used. The Shadowy Warrior then amazingly transforms into a shadow and disappears!` },
    shadowyWarriorCommunicateBattle: (currentCharacter) => { return `The Shadowy Warrior raises his sword and approaches ${currentCharacter.name}!` },
    shadowyWarriorDuelChallenge: (currentCharacter) => { return `${currentCharacter.name} challenges the Shadowy Warrior to a duel.` },
    shadowyWarriorBackAway: (currentCharacter) => { return `${currentCharacter.name} backs away from the Shadowy Warrior.` },
    //Defeated Nightblade
    defeatedNightbladeIntro: (currentCharacter) => { return `${currentCharacter.name} stands over defeated Shadowy Warrior. The warrior looks at ${currentCharacter.name} confidently, as if prepared for what comes next...` },
    defeatedNightbladeExecuteWarrior: (currentCharacter) => { return `${currentCharacter.name} executes the Shadowy Warrior.` },
    defeatedNightbladeSpareWarrior: (currentCharacter) => { return `${currentCharacter.name} helps the warrior to his feet.` },
    defeatedNightbladeSpareWarriorSuccess: (currentCharacter) => { return `The Shadowy Warrior nods at ${currentCharacter.name} in respect.` },
    defeatedNightbladeSpareWarriorFail: (currentCharacter) => { return `Upon standing to his feet, the Shadowy Warrior transforms into a shadow and disappears!` },
    //The Artifiact
    theArtifactIntro: (currentCharacter) => `The Artifact lies ahead. The fate of the kingdom is in your hands.`,
    theArtifactApproach: (currentCharacter) => `${currentCharacter.name} approaches the artifact.`,
    theArtifactShackleBreaker: (currentCharacter) => `"Shackle Breaker...."`,
    //The Kingdom's Fate
    theKingdomsFateIntro: (currentCharacter) =>"As the emperor fades away, his body disentigrates into a whirlwind of shadowy mist and darkness. After a moment, the darkness clears, revealing the artifact resting innocently on its pedestal. What once appeared to be a symbol of absolute power now appears to be an innocent trinket. You begin to doubt the purpose of your quest, yet the choice is yours....",
    theKingdomsFateDestroyArtifactMessage: (currentCharacter) =>`${currentCharacter.name} reaches to destroy the artifact.`,
    theKingdomsFateClaimArtifactMessage: (currentCharacter) =>`${currentCharacter.name} reaches to claim the artifact.`,
    //AHeroPrevials
    aHeroPrevailsIntro: () =>"The artifact breaks easily in the hero's hands. Soon the artifact, like the emperor before, fades away. Despite the doubts, and the losses, the party prevails. The shackles that once bound the kingdom are no more...",
    aHeroPrevailsLeave: (currentCharacter) => `And so was the legend of the Shackle Breaker.`,
    //APowerful Choice
    aPowerfulChoiceIntro: (currentCharacter) =>`${currentCharacter.name} grasps the artifact with both hands. The artifact shimmers, as if beckoning ${currentCharacter.name} to use it. How could such a thing be so wrong?...`,
    aPowerfulChoiceUseArtifactMessage: (currentCharacter) =>`${currentCharacter.name} chooses to use the artifact's power.`,
    //The Cycle Continues
    theCycleContinuesIntro: (currentCharacter) =>`${currentCharacter.name} admires the artifact and gently brushes its side. Only it is not ${currentCharacter.name} holding the artifact anymore, but a pawn, shackled to the will of another...`,
    theCycleContinuesLeaveMessage: (currentCharacter) =>`Someone leaves where ${currentCharacter.name} entered...`,

}

export const createBattleRegistry = {
    biomeGeneratedBattle: (partyLevel, biome, difficulty, currentStageEntity) => {return biome.generateBattle(partyLevel)},
    treasureChestCastSpellSummonEvil: (partyLevel, biome, difficulty, currentStageEntity) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random()*4);
        for(let i = 0; i < count; i++){
            let chance = Math.floor(Math.random()*2);
            if(chance == 0) hostileArray.push(new ShackledSpirit({level: partyLevel, difficulty: difficulty}))
            if(chance == 1) hostileArray.push(new FloatingSkull({level: partyLevel, difficulty: difficulty}))     
        }
        return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
    },
    madmanAmbush:(partyLevel, biome, difficulty, currentStageEntity) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random()*4);
        for(let i = 0; i < count; i++){
            let chance = Math.floor(Math.random()*3);
            if(chance == 0) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
            if(chance == 1) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
            if(chance == 2) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
        }
        return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
    },
    madBandits: (partyLevel, biome, difficulty, currentStageEntity) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random()*5);
        for(let i = 0; i < count; i++) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
        return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc});
    },
    wolfPack: (partyLevel, biome, difficulty, currentStageEntity) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random()*5);
        for(let i = 0; i < count; i++)hostileArray.push(new Wolf({level: partyLevel, difficulty: difficulty}));
        return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
    },
    loneMadman:(partyLevel, biome, difficulty, currentStageEntity) => {
        return new Battle({hostiles: [new Madman({level: partyLevel, difficulty: difficulty})] , battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
    },
    madmanBleedingReinforcements:(partyLevel, biome, difficulty, currentStageEntity) => {
        let hostileArray = [new Madman({level: partyLevel, difficulty: difficulty})];
        let count = Math.ceil(Math.random()*4);
        for(let i = 0; i < count; i++){
            let chance = Math.floor(Math.random()*4);
            if(chance < 2) hostileArray.push(new Madman({level: partyLevel, difficulty: difficulty}))
            if(chance == 2) hostileArray.push(new MadMage({level: partyLevel, difficulty: difficulty}))
            if(chance == 3) hostileArray.push(new MadBandit({level: partyLevel, difficulty: difficulty}))
        }
        hostileArray[0].currentHP = hostileArray[0].currentHP*0.5;
        hostileArray[0].statusArray.push(new Bleed({holder: hostileArray[0]}))
        return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
    },
    madmanRockInjured:(partyLevel, biome, difficulty, currentStageEntity) => {
        let entity = new Madman({level: partyLevel, difficulty: difficulty});
        entity.currentHP = entity.currentHP*0.6;
        return new Battle({hostiles: [entity] , battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
    },
    silentGroveBattle: (partyLevel, biome, difficulty, currentStageEntity) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random() * 3);
        for (let i = 0; i < count; i++) {
        hostileArray.push(new WoodWhisperer({ level: partyLevel, difficulty: difficulty }));
        }
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true });
    },
    interloperBattle: (partyLevel, biome, difficulty, currentStageEntity) => {
        const hostiles = [new GroveGuardian({ level: partyLevel, difficulty })];
        return new Battle({
            hostiles,
            battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3",
            gold: 20 * partyLevel,
            canRetreat: false,
        });
    }, 
    currentEntity: (partyLevel, biome, difficulty, currentStageEntity) => {
        currentStageEntity.isHostile = true;
        return new Battle({hostiles: [currentStageEntity], battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
    },
    alterianWarriorBattle: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random() * 5);
        for (let i = 0; i < count; i++) {
            hostileArray.push(new AlterianWarrior({level: partyLevel, difficulty: difficulty}));
        }
        return new Battle({hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true});
    },
    woundedMuttTransformation: (partyLevel,  biome, difficulty) => {
        return new Battle({hostiles: [new MurderMutt({level: partyLevel, difficulty: difficulty})] , battleMusicSrc: "./assets/audio/musicTracks/pred-and-prey.mp3", canRetreat: true});
    },
    spiderNest:(partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random() * 3);
        for (let i = -2; i < count; i++) {
        hostileArray.push(new Spider({ level: partyLevel, difficulty: difficulty }));
        }
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: false });
    },
    randomSkeletonBattle: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random() * 5);
        for (let i = 0; i < count; i++) {
            let chance = Math.floor(Math.random() * 5);
            if (chance < 2) hostileArray.push(new Skeleton({ level: partyLevel, difficulty: difficulty }));
            if (chance === 2) hostileArray.push(new SkeletonCultist({ level: partyLevel, difficulty: difficulty }));
            if (chance === 3) hostileArray.push(new FloatingSkull({ level: partyLevel, difficulty: difficulty }));
            if (chance === 4) hostileArray.push(new ArmoredSkeleton({ level: partyLevel, difficulty: difficulty }));
        }
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true });
    },
    skeletalAbominationColossusBattle: (partyLevel, biome, difficulty) => {
        const hostileArray = [new SkeletonColossus({ level: partyLevel, difficulty })];
        for (let i = 0; i < 2; i++) {
            const chance = Math.floor(Math.random() * 5);
            if (chance < 2) hostileArray.push(new Skeleton({ level: partyLevel, difficulty: difficulty }));
            if (chance === 2) hostileArray.push(new SkeletonCultist({ level: partyLevel, difficulty: difficulty }));
            if (chance === 3) hostileArray.push(new FloatingSkull({ level: partyLevel, difficulty: difficulty }));
            if (chance === 4) hostileArray.push(new ArmoredSkeleton({ level: partyLevel, difficulty: difficulty }));
        }
        return new Battle({
            hostiles: hostileArray,
            battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3",
            gold: 10 * partyLevel,
            canRetreat: false,
        });
    },
    deepDarknessBattle: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random() * 5);
        for (let i = 0; i < count; i++) {
            let chance = Math.floor(Math.random() * 3);
            if (chance === 0) hostileArray.push(new SkeletonCultist({ level: partyLevel, difficulty: difficulty }));
            if (chance === 1) hostileArray.push(new FloatingSkull({ level: partyLevel, difficulty: difficulty }));
            if (chance === 2) hostileArray.push(new ShackledSpirit({ level: partyLevel, difficulty: difficulty }));
        }
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true });
    },
    inferiorLordsBattle: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        hostileArray.push(new InferiorLord({ level: partyLevel, apperance: "./assets/media/entities/inferior-lord-1.jpg", difficulty: difficulty }));
        hostileArray.push(new InferiorLord({ level: partyLevel, apperance: "./assets/media/entities/inferior-lord-2.jpg", difficulty: difficulty }));
        hostileArray.push(new InferiorLord({ level: partyLevel, apperance: "./assets/media/entities/inferior-lord-3.jpg", difficulty: difficulty }));
        return new Battle(
            { hostiles: hostileArray,
                battleMusicSrc: "./assets/audio/musicTracks/suspense-mysterious-trailor-music-foggy-forest-et11lx-157726.mp3",
                gold: (20 * partyLevel),
                canRetreat: false 
            });
    },
    sandStalkerBattle: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random() * 5);
        for (let i = 0; i < count; i++) {
            hostileArray.push(new SandStalker({ level: partyLevel, difficulty }));
        }
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true });
    },
    sandShade: (partyLevel, biome, difficulty) => {
        return new Battle({
            hostiles: [new TheSandShade({ level: partyLevel, difficulty: difficulty })],
            battleMusicSrc: "assets/audio/musicTracks/adrenaline-roger-gabalda-main-version-02-23-11021.mp3",
            gold: 30 * partyLevel,
            canRetreat: false,
        });
    },
    drySharks: (partyLevel, biome, difficulty) => {
        const hostileArray = [];
        const count = Math.ceil(Math.random() * 3);
        for (let i = 0; i < count; i++) {
            hostileArray.push(new DryShark({ level: partyLevel, difficulty }));
        }
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true });
    },
    dryKraken: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let kraken = new DryKraken({level: partyLevel, difficulty: difficulty});
        hostileArray.push(kraken);
        for (let i = 1; i < 9; i++) {
            hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
            kraken.statusArray.push(new SoulLinked({holder: kraken, inflicter: hostileArray[i]}));
        }
        return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
    },
    desertHorrorSwingTentaclesSuccess: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let kraken = new DryKraken({level: partyLevel, difficulty: difficulty});
        hostileArray.push(kraken);
        for (let i = 1; i < 7; i++) {
            hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
            kraken.statusArray.push(new SoulLinked({holder: kraken, inflicter: hostileArray[i]}));
        }
        return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
    },
    desertHorrorThrowAtEyeSuccess: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let kraken = new DryKraken({level: partyLevel, difficulty: difficulty});
        kraken.currentHP = kraken.currentHP * 0.75;
        hostileArray.push(kraken);
        for (let i = 1; i < 9; i++) {
            hostileArray.push(new DryKrakenTentacle({level: partyLevel, difficulty: difficulty}));
            kraken.statusArray.push(new SoulLinked({holder: kraken, inflicter: hostileArray[i]}));
        }
        return new Battle({hostiles: hostileArray, battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3", canRetreat: false});
    },
    sterben: (partyLevel, biome, difficulty) => {
        let hostileArray = [new Sterben({ level: partyLevel, difficulty })];
        return new Battle({
            hostiles: hostileArray,
            battleMusicSrc: "./assets/audio/musicTracks/suspense-mysterious-trailor-music-foggy-forest-et11lx-157726.mp3",
            gold: (20 * partyLevel),
            canRetreat: false,
        });
    },
    madBandits: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let count = Math.ceil(Math.random() * 4);
        for (let i = 0; i < count; i++) {
        hostileArray.push(new MadBandit({ level: partyLevel, difficulty }));
        }
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true });
    },
    woundedTigerWild: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let tiger = new Tiger({ level: partyLevel, difficulty, isHostile: true });
        tiger.currentHP = Math.floor(tiger.currentHP * 0.5);
        tiger.statusArray.push(new Bleed({ holder: tiger }));
        hostileArray.push(tiger);
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true });
    },
    woundedTigerPackAmbush: (partyLevel, biome, difficulty) => {
        let hostileArray = [];
        let tiger = new Tiger({ level: partyLevel, difficulty, isHostile: true });
        tiger.currentHP = Math.floor(tiger.currentHP * 0.5);
        tiger.statusArray.push(new Bleed({ holder: tiger }));
        hostileArray.push(tiger);
        let count = Math.ceil(Math.random() * 4);
        for (let i = 0; i < count; i++) {
        hostileArray.push(new Tiger({ level: partyLevel, difficulty, isHostile: true }));
        }
        return new Battle({ hostiles: hostileArray, battleMusicSrc: biome.battleMusicSrc, canRetreat: true });
    },
    panzerkamfer: (partyLevel, biome, difficulty) => {
        const hostileArray = [new Panzerkamfer({ level: partyLevel, difficulty })];
        return new Battle({
        hostiles: hostileArray,
        battleMusicSrc: "./assets/audio/musicTracks/2022-03-16_-_Escape_Route_-_www.FesliyanStudios.com.mp3",
        gold: 20 * partyLevel,
        canRetreat: false,
        });
    },
    nightblade: (partyLevel, biome, difficulty) => {
        return new Battle({
            hostiles: [new Nightblade({ level: partyLevel, difficulty })],
            battleMusicSrc: biome.battleMusicSrc,
            canRetreat: true,
        });
    },
    duelNightblade: (partyLevel, biome, difficulty) => {
        return new Battle({
            hostiles: [new Nightblade({ level: partyLevel, difficulty })],
            battleMusicSrc: biome.battleMusicSrc,
            maxAllyCount: 1,
            maxHostileCount: 1,
        });
    },
    emperorDolos: (partyLevel, biome, difficulty) => {
        const hostileArray = [new EmperorDolos({ level: partyLevel, difficulty })];
        return new Battle({
            hostiles: hostileArray,
            battleMusicSrc: "./assets/audio/musicTracks/bloodcry-clemens-ruh-main-version-32174-03-58.mp3",
            canRetreat: false,
            gold: 1000,
        });
    },
}


export const createNextStageRegistry = {
    self: (currentStage) => { return currentStage},
    conversationWithMadman: (currentStage)=>{ return new ConversationWithMadman({})},
    silentGrove2: (currentStage) => {return new SilentGrove2({})},
    silentGrove3: (currentStage) => {return new SilentGrove3({})},
    interloper: (currentStage) => {return new Interloper({})},
    talkWithMercenary: (currentStage) => {return new TalkWithMercenary({entity: currentStage.entity})},
    woundedWarrior: (currentStage) => {return new WoundedWarrior({entity: currentStage.entity})},
    battleSurvivor: (currentStage) => {return new BattleSurvivor({ entity: currentStage.entity })},
    caveIn: (currentStage) => {return new CaveIn({})},
    atTheMysteriousAltar: () => { return new AtTheMysteriousAltar({}); },
    aSkeletalAbomination: () => { return new ASkeletalAbomination({}); },
    aMysteriousAltar: () => { return new MysteriousAltar({}); },
    deepDarkness2: () => { return new DeepDarkness2({}); },
    deepDarkness3: () => { return new DeepDarkness3({}); },
    ancientRuinsEntrance: () => { return new AncientRuinsEntrance({}); },
    shiftingSands2: () => { return new ShiftingSands2({}); },
    statuesInTheSand: () => { return new StatuesInTheSand({}); },
    shiftingSands3: () => { return new ShiftingSands3({}); },
    shiftingSands4: () => { return new ShiftingSands4({}); },
    sandCastleEntrance: () => { return new SandCastleEntrance({}); },
    gaintTentacle: () => { return new GaintTentacle({}); },
    desertHorror: () => { return new DesertHorror({}); },
    chillingGhost: () => { return new ChillingGhost({}); },
    tracksInTheSnow2: () => { return new TracksInTheSnow2({}); },
    crimsonSnow: () => { return new CrimsonSnow({}); },
    woundedTiger: () => { return new WoundedTiger({}); },
    apexPredator: () => { return new ApexPredator({}); },
    mysteriousFigureApproach: () => {
        let chance = Math.floor(Math.random() * 2);
        if (chance === 0) return new SuspiciousMan({});
        else return new ShadowyWarrior({});
    },
    defeatedNightblade: () => {return new DefeatedNightblade({})},
    theKingdomsFate: () => {return new TheKingdomsFate({})},
    aHeroPrevails: (partyLevel, biome) => new AHeroPrevails({}),
    aPowerfulChoice: (partyLevel, biome) => new APowerfulChoice({}),
    theCycleContinues: (partyLevel, biome) => new TheCycleContinues({}),
}

export const createLootRegistry = {
    randomBiomeItem1: (partyLevel, biome) => {return [getRandomArrayElementWeighted(biome.lootTable).item()]},
    randomBiomeItem2: (partyLevel, biome) => {return [getRandomArrayElementWeighted(biome.lootTable).item(), getRandomArrayElementWeighted(biome.lootTable).item()]},
    randomBiomeItem3: (partyLevel, biome) => {return [getRandomArrayElementWeighted(biome.lootTable).item(), getRandomArrayElementWeighted(biome.lootTable).item(), getRandomArrayElementWeighted(biome.lootTable).item()]},
    silentGrove3CutTreeLoot: (partyLevel, biome) => {
        let loot = [];
        for (let i = 0; i < 4; i++) {
            let chance = Math.floor(Math.random() * 5);
            if (chance === 0) {
                loot.push(new ForestStaff({ level: 1 }));
                return loot;
            }else {
                loot.push(new PineWood({}));
            }
        }
        return loot;
    },
    mineIronOre: (partyLevel, biome) => [new IronOre()],
    mineDiamond: (partyLevel, biome) => [new Diamond()],
    iceSickle: (partyLevel, biome) => {return [new IceSickle({ level: 1 })]},
    woundedTigerPelts: (partyLevel, biome) => {return [new Pelt({}), new Pelt({}), new Pelt({})]},
    suspiciousManPotionLoot: (partyLevel, biome) => {
        const potions = [new HealthPotion({}), new KurtussBrewOfMadness({}), new ParalysisTonic({})];
        const choice = Math.floor(Math.random() * 3);
        return [potions[choice]];
    },

}

export const onActivateRegistery = {
    shortRest: (target) => {
        target.currentHP += Math.floor(target.maxHP * 0.5);
        target.currentStamina += Math.floor(target.maxStamina * 0.5);
        target.currentMagic += Math.floor(target.maxMagic * 0.5);
        if(target.currentHP > target.maxHP) target.currentHP = target.maxHP;
        if(target.currentStamina > target.maxStamina) target.currentStamina = target.maxStamina;
        if(target.currentMagic > target.maxMagic) target.currentMagic = target.maxMagic;

        const negativeEffects = target.statusArray.filter((status)=>{
            return status.isHelpful == false;
        })



        negativeEffects.forEach((status)=>{
            status.onRemove();
        })
    },
    percentDamage20: (target) => {
        target.currentHP -= Math.floor(target.maxHP * 0.2);
        if(target.currentHP < 0) target.currentHP = 0;
    },
    percentDamage40: (target) => {
        target.currentHP -= Math.floor(target.maxHP * 0.4);
        if(target.currentHP < 0) target.currentHP = 0;
    },
    increaseCorruption5Percent: (target) => { 
        target.currentCorruption += 0.05;
    },
    increaseCorruption10Percent: (target) => { 
        target.currentCorruption += 0.10;
    },
    reduceCorruption5Percent: (target) => { 
        target.currentCorruption -= 0.05;
    },
    reduceCorruption10Percent: (target) => { 
        target.currentCorruption -= 0.10;
    },
    resetCorruption: (target) => { 
        target.currentCorruption = 0.0;
    },
    fullCorruption: (target) => {
        target.currentCorruption += 1.00;
    },
    poisonIncreaseOrApply: (target) => {
        for (let i = 0; i < target.statusArray.length; i++) {
        if (target.statusArray[i].name === "poison") {
            target.statusArray[i].severityModifier += 0.2;
            return;
        }
        }
        let status = new Poison({ holder: target });
        status.onApplied(target, target, status);
    },
    physicalAttackDebuffApply: (target) => {
        for (let i = 0; i < target.statusArray.length; i++) {
        if (target.statusArray[i].name === "physical attack debuff") {
            target.statusArray[i].severityModifier += 0.2;
            return;
        }
        }
        let status = new PhysicalAttackDebuff({ holder: target });
        status.onApplied(target, target, status);
    },
    magicalAttackDebuffApply: (target) => {
        for (let i = 0; i < target.statusArray.length; i++) {
        if (target.statusArray[i].name === "magical attack debuff") {
            target.statusArray[i].severityModifier += 0.2;
            return;
        }
        }
        let status = new MagicalAttackDebuff({ holder: target });
        status.onApplied(target, target, status);
    },
    physicalDefenseDebuffApply: (target) => {
        for (let i = 0; i < target.statusArray.length; i++) {
        if (target.statusArray[i].name === "physical defense debuff") {
            target.statusArray[i].onActivate()
            return;
        }
        }
        let status = new PhysicalDefenseDebuff({ holder: target });
        status.onApplied(target, target, status);
    },
    staminaMagicDamage75Percent: (target) => {
    target.currentStamina -= Math.floor(target.currentStamina * 0.25);
    target.currentMagic -= Math.floor(target.currentMagic * 0.25);
    },
    staminaMagicDamage50Percent: (target) => {
        target.currentStamina -= Math.floor(target.currentStamina * 0.25);
        target.currentMagic -= Math.floor(target.currentMagic * 0.25);
    },
    healthDamage25Percent: (target) => {
        target.currentHP -= Math.floor(target.maxHP * 0.25);
        if (target.currentHP < 0) target.currentHP = 0;
    },
    health1: (target) => {
        target.currentHP = 1;
    },
    applyFrozen: (target) => {
        for (let i = 0; i < target.statusArray.length; i++) {
            if (target.statusArray[i].name === 'frozen') {
                return;
            }
        }
        let status = new Frozen({ holder: target });
        status.onApplied(target, target, status);
    },
    aPowerfulChoiceUseArtifact: (target) => {
        target.apperance = './assets/media/entities/emperor-dolos.jpg';
        target.abilityArray.push(new AbsorbSoul({}));
    },
    

}

export const createRecruitRegistry = {
    currentEntity: (partyLevel, biome, difficulty, entity) => {return entity;},
    madManRecruit: (partyLevel, biome, difficulty, entity) => {return new Madman({level: partyLevel, difficulty: difficulty, isHostile: false })},
    tiger: (partyLevel, biome, difficulty) => {return new Tiger({ level: partyLevel, difficulty: difficulty, isHostile: false })},
    dog: (partyLevel, biome, difficulty) => {return new Dog({ level: partyLevel, difficulty: difficulty, isHostile: false })},
    nightblade: (partyLevel, biome, difficulty) => {return new Nightblade({ level: partyLevel, difficulty, isHostile: false })},
}


/*OLD


export default class Stage{
    constructor(config){
        this.name = config.name;
        this.imageSrc = config.imageSrc;
        this.musicSrc = config.musicSrc || '';
        this.decisionArray = config.decisionArray;
    
    }
}
*/