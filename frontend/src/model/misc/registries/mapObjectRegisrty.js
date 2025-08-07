import { BerryBush, Boulder, CastleTower, DeadBush, DeadTree, Entrance, Exit, PineTree, Wall } from "../mapObjects.js";

export const mapObjectRegistry = {
  "wall": (config) => new Wall(config),
  "entrance": (config) => new Entrance(config),
  "exit": (config) => new Exit(config),
  "boulder": (config) => new Boulder(config),
  "pine tree": (config) => new PineTree(config),
  "berry bush": (config) => new BerryBush(config),
  "dead tree": (config) => new DeadTree(config),
  "dead bush": (config) => new DeadBush(config),
  "castle tower": (config) => new CastleTower(),
};