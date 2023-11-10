# ShackleBreaker
Text adventure game based on the Shackle Breaker story

## TODO

# Planned Features
* Parrying System
* Distance System in battle
* Attack Animations
* map culling
* Shop/crafting/weapon/town
* interact with stairs / loot bodies
* Two attacks/bonus actions
* Multiple enemies
* trinket and waist slots
* Item stamina /magic consumption modifier
* restrictions of when to switchcompanions

# Planned Quality of Life Improvements
* Alphabetize CSS rules
* Change decision Success modifier to have both likeliness and attribute
* scaling

# Bugs
* Image Flashing
* mini Menu appears on level up and transisiton screens
* canvas player icon not loading on start up.
* Enemy Status Icons still appear on next enemies ocasionally
* With Companion System, enemy level generations no longer use the current chraracter  current chracter level (callback functions in decisino and encounter messages?)

* death of companion when enemy moves first instantly switches to next companion but battle controls disabled
* switching to companion after enemy moves first and compaion survives is instanly enables battle controls (I would like a two second delay)
* player nextmove undefined when first move of battle is switch combatant
* when switching companions and player is first, take control button is revealed 2 seconds before battle buttons
* When switching companions and enemy is first and kill player before switch, the next companion's next move is undefined (new player should not continue action)





# MISC notes
* Enemy Level ups disstribute 16 points between stats
* Ability speed multipliers 
- 0.25 (slow) 
- 0.5 (medium) 
- 0.75 (fast)
* Ability Attack formula
- Math.floor(Math.random() * (max - min+ 1) + min)
* Enemy stat increments 40pts = 20 player attribute, points resource stats double wieghted
* player attribute increments 15 attribute Points, 