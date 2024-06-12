import LobbyView from "./lobbyView.js";
import OverworldView from "./overworldView.js";
import BattleView from "./battleView.js";
import PartyView from "./partyView.js";
import CharacterSummaryView from "./characterSummaryView.js";

export default class GameView{
    constructor(){
        this.lobbyView = new LobbyView();
        this.overworldView = new OverworldView();
        this.battleView = new BattleView();
        this.partyView = new PartyView();
        this.characterSummaryView = new CharacterSummaryView();
    }
    switchScreen(screenId){
        Array.from(document.getElementsByClassName('screen')).forEach((screen)=>{
            if(screen.id == screenId){
                screen.style.display='flex';
            }else{
                screen.style.display='none';
            }
        });
    }
}