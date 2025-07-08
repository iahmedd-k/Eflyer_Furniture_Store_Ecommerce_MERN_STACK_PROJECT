// controllers/authController.js
import User from "../Models/User_Model.js"
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
console.log("REQ.BODY:", req.body);
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    const token = user.generateToken();
    user.token = token;
    await user.save();

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log("REQ.BODY:", req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token1 = user.generateToken();
    user.token = token1;
    await user.save();
  console.log("Login success. Token:", token1);
    res.status(200).json({
      success: true,
       token1: user.token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,

       
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const logout = async(req, res)=>{

req.user.token= null;
await req.user.save();
res.status(200).json({
message: "Sucess"
})

}


export const getme= async(req, res)=>{
    const {_id, name,  email, role} = req.user;
    res.status(200).json({
        _id,
        name,
        email,
        role
    })
}