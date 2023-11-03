# ShackleBreaker
Text adventure game based on the Shackle Breaker story

## TODO

# Planned Features
* Parrying System
* Attack Animations
* map culling
* Shop/crafting/weapon/town
* interact with stairs / loot bodies
* Two Handing / Weapons equipable in either hand
* Distance System in battle
* Decision Success modifier
* Two attacks
* bonus actions
* Multiple enemies/ companions
* trinket and waist slots

# Planned Quality of Life Improvements
* Alphabetize CSS rules
* scaling

# Bugs
* Image Flashing
* mini Menu appears on level up and transisiton screens
* canvas player icon not loading on start up.


# MISC notes
* Enemy Level ups disstribute 16 points between stats
* Ability speed multipliers 
- 0.25 (slow) 
- 0.5 (medium) 
- 0.75 (fast)
* Ability Attack formula
- Math.floor(Math.random() * (max - min+ 1) + min)
- Enemy stat increments 40pts = 20 player attribute, points resource stats double wieghted
- player attribute increments 20 attribute Points, 