# ShackleBreaker
Text adventure game based on the ShackleBreaker story

## TODO

# New Features
* Parrying System
* Attack Animations
* Mew Mini Map/ map culling
* Shop/crafting/weapon/town
* interact with stairs / loot bodies
* Two Handing / Weapons equipable in either hand
* Ability conflicts
* Distance System in battle
* Decision Success modifier
* Bosses
* Two attacks
* Multiple enemies/ companions

# Quality of Life
* random enemy stats
* Alphabetize CSS rules
* scaling

# Bugs
* Image Flashing
* mini Menu appears on level up and transisiton screens
* Mini Menu sell button still active on ending encounter


# MISC notes
* Enemy Level ups disstribute 16 points between stats
* Ability speed multipliers 
- 0.25 (slow) 
- 0.5 (medium) 
- 0.75 (fast)
* Ability Attack formula
- Math.floor(Math.random() * (max - min+ 1) + min)