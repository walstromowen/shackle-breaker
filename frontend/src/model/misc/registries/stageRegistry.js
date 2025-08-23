import { Aftermath, BattleSurvivor, WoundedWarrior } from "../stages/aftermath.js"
import { Bonfire } from "../stages/bonfire.js"
import { CaveIn } from "../stages/caveIn.js"
import { AncientRuinsEntrance, DeepDarkness, DeepDarkness2, DeepDarkness3 } from "../stages/deepDarkness.js"
import { ConversationWithMadman, MadmanAhead } from "../stages/madmanAhead.js"
import { MineralVein } from "../stages/mineralVein.js"
import { ASkeletalAbomination, AtTheMysteriousAltar, MysteriousAltar } from "../stages/mysteriousAltar.js"
import { DefeatedNightblade, MysteriousFigure, ShadowyWarrior, SuspiciousMan } from "../stages/mysteriousFigure.js"
import { SandCastleEntrance, ShiftingSands, ShiftingSands2, ShiftingSands3, ShiftingSands4, StatuesInTheSand } from "../stages/shiftingSands.js"
import { Interloper, SilentGrove, SilentGrove2, SilentGrove3 } from "../stages/silentGrove.js"
import { DesertHorror, GaintTentacle, Sinkhole } from "../stages/sinkhole.js"
import { ChillingGhost, SomethingWatching } from "../stages/somethingWatching.js"
import { AHeroPrevails, APowerfulChoice, TheArtifact, TheCycleContinues, TheKingdomsFate } from "../stages/theArtifact.js"
import { ApexPredator, CrimsonSnow, TracksInTheSnow, TracksInTheSnow2, WoundedTiger } from "../stages/tracksInTheSnow.js"
import { TreasureChest } from "../stages/treasureChest.js"
import { TalkWithMercenary, WanderingMercenary } from "../stages/wanderingMercenary.js"
import { WoundedMutt } from "../stages/woundedMut.js"

export const stageRegistry = {
    "Treasure Chest": (config)=>{ return new TreasureChest(config)},
    "Wandering Mercenary": (config) => { return new WanderingMercenary(config)},
    "Aftermath": (config) => {return new Aftermath()},
    "Bonfire": (config) => { return new Bonfire(config)},
    "Madman Ahead": (config) => { return new MadmanAhead(config)},
    "Mineral Vein": (config) => { return new MineralVein(config)},
    "Mysterious Figure": (config) => { return new MysteriousFigure(config)},
    "Shifting Sands": (config) => { return new ShiftingSands(config)},
    "Conversation With Madman": (config) => { return new ConversationWithMadman(config)},
    "Silent Grove": (config) => { return new SilentGrove(config)},
    "Silent Grove 2": (config) => {return new SilentGrove2(config)},
    "Silent Grove 3": (config) => {return new SilentGrove3(config)},
    "Interloper": (config) => {return new Interloper(config)},
    "Talk With Mercenary": (config) => {return new TalkWithMercenary(config)},
    "Wounded Warrior": (config) => {return new WoundedWarrior(config)},
    "Battle Survivor": (config) => {return new BattleSurvivor(config)},
    "Wounded Mutt": (config) => {return new WoundedMutt(config)},
    "Cave In": (config) => {return new CaveIn(config)},
    "At The Mysterious Altar": (config) => { return new AtTheMysteriousAltar(config)},
    "A Skeletal Abomination": (config) => {return new ASkeletalAbomination(config)},
    "Mysterious Altar": (config) => {return new MysteriousAltar(config)},
    "Deep Darkness": (config) => { return new DeepDarkness(config)},
    "Deep Darkness 2": (config) => { return new DeepDarkness2(config)},
    "Deep Darkness 3": (config) => { return new DeepDarkness3(config)},
    "Ancient Ruins Entrance": (config) => { return new AncientRuinsEntrance(config)},
    "Shifting Sands 2": (config) => { return new ShiftingSands2(config)},
    "Statues In The Sand": (config) => { return new StatuesInTheSand(config)},
    "Shifting Sands 3": (config) => { return new ShiftingSands3(config)},
    "Shifting Sands 4": (config) => {return new ShiftingSands4(config)},
    "Sand Castle Entrance": (config) => {return new SandCastleEntrance(config)},
    "Sinkhole": (config) => { return new Sinkhole(config)},
    "Gaint Tentacle": (config) => {return new GaintTentacle(config)},
    "Desert Horror": (config) => { return new DesertHorror(config)},
    "Something Watching": (config) => { return new SomethingWatching(config)},
    "Chilling Ghost": (config) => { return new ChillingGhost(config)},
    "Tracks In The Snow": (config) => { return new TracksInTheSnow(config)},
    "Tracks In The Snow 2": (config) => { return new TracksInTheSnow2(config)},
    "Crimson Snow": (config) => { return new CrimsonSnow(config)},
    "Wounded Tiger": (config) => { return new WoundedTiger(config) },
    "Apex Predator": (config) => { return new ApexPredator(config) },
    "Suspicious Man": (config) => { return new SuspiciousMan(config) },
    "Shadowy Warrior": (config) => { return new ShadowyWarrior(config) },
    "Defeated Nightblade": (config) => {return new DefeatedNightblade(config)},
    "The Artifact": (config) => { return new TheArtifact(config)},
    "The Kingdoms Fate": (config) => {return new TheKingdomsFate(config)},
    "A Hero Prevails": (config) => new AHeroPrevails(config),
    "A Powerful Choice": (config) => new APowerfulChoice(config),
    "The Cycle Continues": (config) => new TheCycleContinues(config),
}