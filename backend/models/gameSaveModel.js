import mongoose from "mongoose";
const {Schema} = mongoose;

const GameSaveSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // references the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Object, // Stores the full serialized game state from GameModel.toSaveObject()
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update `updatedAt` before each save
GameSaveSchema.pre('gamesave', function (next) {
  this.updatedAt = new Date();
  next();
});

export const gameSaveModel = mongoose.model('GameSaves', GameSaveSchema);