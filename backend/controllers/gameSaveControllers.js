import { gameSaveModel } from "../models/gameSaveModel.js"

export async function createGameSave(req, res){
    try {
        const oldSave = await gameSaveModel.findOne({name:req.body.name , user: req.userId });
        if(oldSave) return res.status(409).json({ error: err.message });

        const newSave = new gameSaveModel({
            user: req.userId,
            name: req.body.name,
            data: req.body.data,
        });
        const uploadedSave = await newSave.save();
        res.status(201).json(uploadedSave);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function getGameSaves(req, res){
    try {
        const saves = await gameSaveModel.find({user: req.userId}).sort({createdAt: -1});
        res.status(201).json(saves);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function deleteGameSave(req, res){//TODO 8/4/2025
  try{
    const deletedSaveId = req.params.id;
    const save = await gameSaveModel.findOne({ _id: deletedSaveId , user: req.userId });
    if (!save) {
      return res.status(404).json({ error: 'Game save not found.' });
    }
    await gameSaveModel.deleteOne({ _id: deletedSaveId });
    res.status(200).json({ message: `${save.name}} deleted successfully.` });

    } catch (err) {
      console.error('Error deleting game save:', err);
      res.status(500).json({ error: 'Failed to delete game save.' });
    }
}


export async function updateGameSave(req, res) {
  try {
    const saveId = req.params.id;
    const newData = req.body.data;

    const save = await gameSaveModel.findOne({ _id: saveId, user: req.userId });
    if (!save) {
      return res.status(404).json({ error: "Game save not found." });
    }

    save.data = newData;
    const updatedSave = await save.save();

    res.status(200).json(updatedSave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}