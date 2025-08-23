 import {
  AlterianWarrior, ArmoredSkeleton, Dog, DryEel, DryKraken, DryKrakenTentacle,
  DryShark, EmperorDolos, Entity, FloatingSkull, GroveGuardian, Hawk, IcePhoenix,
  InferiorLord,
  MadBandit, MadEngineer, MadMage, Madman, MurderMutt, Nightblade, PanzerianKnight,
  Panzerkamfer, SandStalker, ShackledHunter, ShackledSpirit, Skeleton,
  SkeletonColossus, SkeletonCultist, Spider, Sterben, SterbensBeast,
  TerrorBear, TheSandShade, Tiger, Traveler, Wolf, WoodWhisperer
} from "../entities.js";

export const entityRegistry = {
  "Entity": (config, isReydrate) => { return new Entity(config, isReydrate) },
  "Traveler": (config, isReydrate) => { return new Traveler(config, isReydrate) },
  "Dog": (config, isReydrate) => { return new Dog(config, isReydrate) },
  "Hawk": (config, isReydrate) => { return new Hawk(config, isReydrate) },
  "Tiger": (config, isReydrate) => { return new Tiger(config, isReydrate) },
  "Madman": (config, isReydrate) => { return new Madman(config, isReydrate) },
  "Mad Bandit": (config, isReydrate) => { return new MadBandit(config, isReydrate) },
  "Mad Mage": (config, isReydrate) => { return new MadMage(config, isReydrate) },
  "Alterian Warrior": (config, isReydrate) => { return new AlterianWarrior(config, isReydrate) },
  "Wolf": (config, isReydrate) => { return new Wolf(config, isReydrate) },
  "Wood Whisperer": (config, isReydrate) => { return new WoodWhisperer(config, isReydrate) },
  "Grove Guardian": (config, isReydrate) => { return new GroveGuardian(config, isReydrate) },
  "Murder Mutt": (config, isReydrate) => { return new MurderMutt(config, isReydrate) },
  "Skeleton": (config, isReydrate) => { return new Skeleton(config, isReydrate) },
  "Armored Skeleton": (config, isReydrate) => { return new ArmoredSkeleton(config, isReydrate) },
  "Floating Skull": (config, isReydrate) => { return new FloatingSkull(config, isReydrate) },
  "Skeleton Cultist": (config, isReydrate) => { return new SkeletonCultist(config, isReydrate) },
  "Skeleton Colossus": (config, isReydrate) => { return new SkeletonColossus(config, isReydrate) },
  "Spider": (config, isReydrate) => { return new Spider(config, isReydrate) },
  "Inferior Lord": (config, isReydrate) => { return new InferiorLord(config, isReydrate) },
  "Sand Stalker": (config, isReydrate) => { return new SandStalker(config, isReydrate) },
  "Dry Shark": (config, isReydrate) => { return new DryShark(config, isReydrate) },
  "Dry Eel": (config, isReydrate) => { return new DryEel(config, isReydrate) },
  "Dry Kraken": (config, isReydrate) => { return new DryKraken(config, isReydrate) },
  "Dry Kraken Tentacle": (config, isReydrate) => { return new DryKrakenTentacle(config, isReydrate) },
  "The Sand Shade": (config, isReydrate) => { return new TheSandShade(config, isReydrate) },
  "Panzerian Knight": (config, isReydrate) => { return new PanzerianKnight(config, isReydrate) },
  "Mad Engineer": (config, isReydrate) => { return new MadEngineer(config, isReydrate) },
  "Ice Phoenix": (config, isReydrate) => { return new IcePhoenix(config, isReydrate) },
  "Panzerkamfer": (config, isReydrate) => { return new Panzerkamfer(config, isReydrate) },
  "Sterben": (config, isReydrate) => { return new Sterben(config, isReydrate) },
  "Sterben's Beast": (config, isReydrate) => { return new SterbensBeast(config, isReydrate) },
  "Shackled Hunter": (config, isReydrate) => { return new ShackledHunter(config, isReydrate) },
  "Shackled Spirit": (config, isReydrate) => { return new ShackledSpirit(config, isReydrate) },
  "Terror Bear": (config, isReydrate) => { return new TerrorBear(config, isReydrate) },
  "Nightblade": (config, isReydrate) => { return new Nightblade(config, isReydrate) },
  "Emperor Dolos": (config, isReydrate) => { return new EmperorDolos(config, isReydrate) },
};

//Dolos
//The Pursuer
//Twilight Dragon
//The Puppet Master
//Ancient Altus King