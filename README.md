# [ShackleBreaker](https://shackle-breaker-frontend.onrender.com/)
Roguelike turnbased adventure game based on the Shackle Breaker story by Owen Walstrom

# Planned Features
* critical and damage notifications
* weakness
* ability ranges
* evasion on splash attacks
* battle and console typing animation wait time and fix
* fix battle text content
* Music not restarting on encounter ending
* map objects with linked encounters
* Map abilities
* Wheather
* Darkness
* Prebattle traits / abilitites
* Enemy factions
* Shop/crafting/town
* trinket and waist slots


# Bugs
* Companions and battle enemies reseting stats even though they were saved correctly (equipment vs stat loading problem?)
* If an ally retreats then second ally dies, the retreated ally can be selected to fill in for the defeated ally even though he just escaped
* Multi Target splash attack such as cleave will only allow for targeting of one enemy (not enemy and ally) although this maybe isnt a bug //bypassed by selected non default target first
* missed splash attacks do not update attacker's stats
* music not returning to defalt enounter music upd returning to an encounter after a battle (Has to do with online src path different than local path!!!!)
* After switching characters in encounter stage message cannot be skipped by clicking
* clicking confirm attack button rapidly in battle causes crash



# Planned Quality of Life Improvements
* Mobile event listener support
* XP and gold calculation refinements
* Animations dpendent on hostile vs ally
* Enemy level up stats refinement

# MISC notes

