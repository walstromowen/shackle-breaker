# [ShackleBreaker](https://shackle-breaker-frontend.onrender.com/)
Roguelike turnbased adventure game based on the Shackle Breaker story by Owen Walstrom

# Planned Features
* critical and damage notifications
* weakness
* ability ranges
* map objects with linked encounters
* Map abilities
* Wheather
* Darkness
* Prebattle traits / abilitites
* Enemy factions
* Shop/crafting/town
* trinket and waist slots


# Bugs
* enemies with a new form, even if they changed form, are loaded with an extra form (does not crash anymore)
* If an ally retreats then second ally dies, the retreated ally can be selected to fill in for the defeated ally even though he just escaped
* Multi Target splash attack such as cleave will only allow for targeting of one enemy (not enemy and ally) although this maybe isnt a bug //bypassed by selected non default target first
* missed splash attacks do not update attacker's stats (visually)
* After switching characters in encounter stage message cannot be skipped by clicking
* clicking confirm attack button rapidly in battle causes crash
* can scrap items during battle.



# Planned Quality of Life Improvements
* Mobile event listener support
* XP and gold calculation refinements
* Animations dpendent on hostile vs ally
* Enemy level up stats refinement
* evasion on splash attacks
* battle and console typing animation wait time and fix
* fix battle text content
* battle Controller rework 

# MISC notes

