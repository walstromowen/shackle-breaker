# ShackleBreaker
Text adventure game based on the Shackle Breaker story

## TODO

# Planned Features
* Parrying System
* Distance System in battle (would require change to mini Map)
* Attack Animations
* map culling
* Shop/crafting/weapon/town
* Two attacks/bonus actions
* trinket and waist slots
* Item stamina /magic consumption modifier
* Attribute descriptions / level up screen details
* Map abilities

# Planned Quality of Life Improvements
* Alphabetize CSS rules
* Change decision Success modifier to have both likeliness and attribute
* scaling
* convert enemies and characters to shared entitiy class
* Prevent Party switching during certain encounters
* Character Specific decisions during encounters
* Refactor attacks and Weapon Scaling
* Items are used up upon choosing move not upon using item.

# Bugs
* Image Flashing
* Item mini Menu appears on level up and transisiton screens
* canvas player icon not loading on start up.
* Enemy Status Icons still appear on next enemies ocasionally
* Recurperate and channel acasionally giving going over max limit
* Shiphon not doing damage
* Switching combatants causes health bar to be bigger than max when switching to animal

# MISC notes
* Enemy Level ups disstribute 16 points between stats
* Ability speed multipliers 
- 0.25 (slow) 
- 0.5 (medium) 
- 0.75 (fast)
* Ability Attack formula
- Math.floor(Math.random() * (max - min + 1) + min)
* Enemy stat increments 40pts = 20 player attribute, points resource stats double wieghted
* player attribute increments 15 attribute Points, 