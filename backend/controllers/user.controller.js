import Resource from "../models/Resource.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const addUser = async (req, res) => {
  try {
    const user = req.user;

    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);

    if (!firstname || !lastname || !email) {
      return res.status(400).json({
        message: "firstname, lastname, and email are required",
      });
    }

    // Check if a user with  email  already exist
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "this information already exists.",
      });
    }
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUSer = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    await newUSer.save();
    console.log("sing up successfully");
    return res.json({ message: "sing up successfully" });
  } catch (err) {
    console.error("Error in Sing up:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async(req,res)=>{
  try{
    const user =User.findOne({_id:req.params.id});
    if (!user) {
      return res.status(404).json({ message: "Uder not found" });
    }
    const resource = Resource.find({userId:req.params.id})
    await User.deleteOne({_id:req.params.id})
    if((await resource).length> 0){

      await Resource.deleteMany({userId:req.params.id})
    }
    res.json({ message: "User deleted successfully" });
  }catch(err){
    res.status(500).json({ message: err.message })  
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(
      id,
      { password:hashedPassword },
      { new: true, runValidators: true }
    );
    
    
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "Error updating user" });
  }
};

