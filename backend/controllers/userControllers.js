import { UserModel } from "../models/userModel.js";

export async function getUser(req, res){
     console.log('test')
     try{
          const user = await UserModel.findById(req.userId).populate('courses');
          if (!user) return res.status(404).json({ message: 'User not found' });
          res.json(user)
     }catch(err){
          console.error('Error fetching user:', err);
          res.status(500).json({ message: 'Error fetching user'});
     }
}

//Not used in app yet
export async function updateUser(req, res){
     const updates = req.body;
     try {
          const user = await UserModel.findById(req.userId);
          if (!user) return res.status(404).json({ message: 'User not found' });
          const updatedUser = await UserModel.findByIdAndUpdate(req.userId, updates, {
               new: true,          // Return the updated document
               runValidators: true // Ensure schema validation
          });
          res.status(200).json(updatedUser);
     } catch (err) {
          console.error('Error updating user:', err);
          res.status(500).json({ message: 'Server error while updating user' });
     }
}

//TODO - Not used in app yet
export async function deleteUser(req, res){
     try{
          
          const user = await UserModel.findById(req.userId);
          if(!user) return res.status(404).json("No user found!");
          await UserModel.findByIdAndDelete(req.userId);
          res.status(200).json("User successfully deleted.");
     }catch(err){
          console.error('Error deleting user:', err);
          return res.json('Error found when deleting a user.')
     }
}