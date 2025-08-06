import {playSoundEffect, playMusic} from '../utility.js';

export default class SaveListController{
    constructor(props, model, view){
        this.props = props;
        this.model = model;
        this.view = view;
        this.initialize();
    }
    initialize(){
        document.getElementById('save-list-cancel-button').addEventListener('click', ()=>{
            if(this.model.props.getSituation() !== 'overworld'){
                this.props.switchScreen('title-screen');
            }else{
                this.props.switchScreen('overworld-screen');
            }
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
        });
        document.getElementById('save-list-confirmation-menu-cancel-button').addEventListener('click', ()=>{
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            this.model.selectedSave = null;
            this.view.deselectSaves();
            this.view.hideConfirmationMenu();
        });
        document.getElementById('save-list-delete-button').addEventListener('click', async ()=>{
            if(!this.model.selectedSave) return;
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            this.view.revealConfirmationMenu('Delete', this.model.selectedSave.name);
        });
        document.getElementById('save-list-confirmation-menu-delete-button').addEventListener('click', async ()=>{
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            this.props.switchScreen('loading-screen');
            await this.deleteSaveFromServer(this.model.selectedSave._id);
            this.view.hideConfirmationMenu();
            this.props.switchScreen('save-list-screen');
        });
        document.getElementById('save-list-confirmation-menu-overwrite-button').addEventListener('click', async ()=>{
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            this.props.switchScreen('loading-screen');
            await this.patchSaveToServer(this.model.selectedSave._id);
            this.view.hideConfirmationMenu();
            this.props.switchScreen('save-list-screen');
        });





        document.getElementById('save-list-load-button').addEventListener('click', ()=>{
            if(!this.model.selectedSave) return;
                this.props.switchScreen('loading-screen');
                this.model.props.fromSaveObject(this.model.selectedSave)
                playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
                playMusic(this.model.props.getMap().biome.backgroundMusicSrc);
                this.props.switchScreen('overworld-screen');

         
        });
        document.getElementById('save-list-save-button').addEventListener('click', async()=>{
            playSoundEffect('./assets/audio/soundEffects/cinematic-boom-6872.mp3');
            
            if(this.model.selectedSave){
                this.view.revealConfirmationMenu('Overwrite', this.model.selectedSave.name);
            }else{
                this.props.switchScreen('loading-screen');
                await this.newSaveToServer();
            }
            
            
        });
        this.view.nameInput.addEventListener('input', (e)=>{
        this.view.deselectSaves()
        this.model.seletedSave = null;
            if(this.view.nameInput.value.length > 0 || this.model.selectedSave){
               
                this.view.enableSaveButton();
            }else{
             
                this.view.disableSaveButton();
            }
        });
    }
    async onSwitchScreen(){
        this.model.selectedSave = null;
        this.view.toggleButtons(this.model.props.getSituation());
        this.view.disableSaveButton();
        this.view.disableLoadButton();
        this.view.disableDeleteButton();
        this.view.savesList.innerHTML = '';
        this.model.saves = await this.getGameSaves();
        this.model.saves.forEach(save => {
            let saveContainer = this.view.createSave(save);
            saveContainer.addEventListener('click', () => {
                this.view.deselectSaves()
                saveContainer.classList.add('selected-save')
                this.model.selectedSave = save;
                
                this.view.enableSaveButton()
                this.view.enableLoadButton()
                this.view.enableDeleteButton();
                
            });
        });





        
    }
    
    async newSaveToServer() {
        const saveData = this.model.props.toSaveObject(); // Replace with actual game data
        const saveName = this.view.nameInput.value.trim();
        const url = `${this.props.baseURL}/gamesaves`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: saveName,
                    data: saveData
                })
            });

            const result = await response.json();
            if (response.ok) {
                alert('Game saved successfully!');
                console.log(result);
            } else {
                console.error(result);
                alert(result.error || 'Failed to save game.');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Could not connect to server.');
        }
    }

    async getGameSaves() {
        const url = `${this.props.baseURL}/gamesaves`;
        try{
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
           
            if (response.ok) {
                return result;
            } else {
                console.error(result);
                return [];
            }
        } catch (error) {
            console.error('Error fetching game saves:', error);
            return [];
        }
    }

    async deleteSaveFromServer(saveId){
        const url = `${this.props.baseURL}/gamesaves/${saveId}`;
        try{
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
           
            if (response.ok) {
                return result;
            } else {
                console.error(result);
            }
        } catch (error) {
            console.error('Error deleting game save:', error);
        }
    }

    async patchSaveToServer(saveId) {
        const saveData = this.model.props.toSaveObject(); // Replace with actual game data
        const saveName = this.model.selectedSave.name
        const url = `${this.props.baseURL}/gamesaves/${saveId}`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: saveName,
                    data: saveData
                })
            });

            const result = await response.json();
            if (response.ok) {
                alert('Game updated successfully!');
                console.log(result);
            } else {
                console.error(result);
                alert(result.error || 'Failed to update game.');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Could not connect to server.');
        }
    }
}