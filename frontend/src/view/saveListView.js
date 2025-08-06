import {createElement} from "../utility.js";

export default class SaveListView{
    constructor(){
        this.screen = document.getElementById('save-list-screen');
        this.deleteButton = document.getElementById('save-list-delete-button');
        this.saveButton = document.getElementById('save-list-save-button');
        this.loadButton = document.getElementById('save-list-load-button');
        this.nameInput = document.getElementById('save-list-name-input');
        this.savesList = document.getElementById('save-list-saves-list');
        this.confirmationMenu = document.getElementById('save-list-confirmation-menu');
        this.confirmationMenuDeleteButton = document.getElementById('save-list-confirmation-menu-delete-button');
        this.confirmationMenuOverwriteButton = document.getElementById('save-list-confirmation-menu-overwrite-button');
        this.cancelButton2 = document.getElementById('save-list-confirmation-menu-cancel-button');
        this.confirmationMenuHeader = document.getElementById('confirmation-menu-header');
    }
    toggleButtons(situation){
        if(situation !== 'overworld'){
            this.loadButton.style.display = 'block';
            this.saveButton.style.display = 'none';
            this.nameInput.style.display = 'none';

        }else{
            this.loadButton.style.display = 'none';
            this.saveButton.style.display = 'block';
            this.nameInput.style.display = 'block';
        }
    }
    enableSaveButton(){
        this.saveButton.disabled = false;
        this.saveButton.classList.remove('disabled-button');
    }
    disableSaveButton(){
        this.saveButton.disabled = true;
        this.saveButton.classList.add('disabled-button'); 
    }
    enableLoadButton(){
        this.loadButton.disabled = false;
        this.loadButton.classList.remove('disabled-button');
    }
    disableLoadButton(){
        this.loadButton.disabled = true;
        this.loadButton.classList.add('disabled-button'); 
    }
    enableDeleteButton(){
        this.deleteButton.disabled = false;
        this.deleteButton.classList.remove('disabled-button');
    }
    disableDeleteButton(){
        this.deleteButton.disabled = true;
        this.deleteButton.classList.add('disabled-button'); 
    }
    revealConfirmationMenu(display, saveName){
        if(display == 'Delete'){
            this.confirmationMenuOverwriteButton.style.display = 'none';
            this.confirmationMenuDeleteButton.style.display = 'block';
        }else{
            this.confirmationMenuDeleteButton.style.display = 'none';
            this.confirmationMenuOverwriteButton.style.display = 'block';
        }
        this.confirmationMenuHeader.innerText = `${display} ${saveName}?`;
        this.confirmationMenu.style.display = 'flex';

    }
    hideConfirmationMenu(){
        this.confirmationMenu.style.display = 'none';
    }
    deselectSaves(){
         Array.from(document.getElementsByClassName('selected-save')).forEach((save)=>{
            save.classList.remove('selected-save')
        });
    }
    createSave(save){
        const gameSaveContainer = createElement('li', 'save-list-save-container');
        const gameSaveName = createElement('p');
        const gameSaveDate = createElement('p');
        
        gameSaveName.innerText = save.name;
        gameSaveDate.innerText = save.updatedAt;

        gameSaveContainer.appendChild(gameSaveName);
        gameSaveContainer.appendChild(gameSaveDate);
        this.savesList.appendChild(gameSaveContainer);

        return gameSaveContainer;
         
    
    }

}

        