# ShackleBreaker
Text adventure game based on the Shackle Breaker story

## TODO

# Planned Features
* Parrying System
* Attack Animations
* Mew Mini Map/ map culling
* Shop/crafting/weapon/town
* interact with stairs / loot bodies
* Two Handing / Weapons equipable in either hand
* Distance System in battle
* Decision Success modifier
* Bosses
* Two attacks
* Multiple enemies/ companions
* trinket and waist slots

# Planned Quality of Life Improvements
* random enemy stats
* Alphabetize CSS rules
* scaling

# Bugs
* Image Flashing
* mini Menu appears on level up and transisiton screens
* super stong enemies on unexplored tiles when farming a map


# MISC notes
* Enemy Level ups disstribute 16 points between stats
* Ability speed multipliers 
- 0.25 (slow) 
- 0.5 (medium) 
- 0.75 (fast)
* Ability Attack formula
- Math.floor(Math.random() * (max - min+ 1) + min)
- Enemy stat increments 40pts = 20 player attribute, points resource stats double wieghted
- player attribute increments 20 attribute Points, resource stats double wieghted