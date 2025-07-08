import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName ] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();

try {
    if (isLogin) {
  
      console.log("Logging in with:", email, password);

      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
console.log("Login response:", res.data.token1);
localStorage.setItem("token", res.data.token1); // 

navigate("/home");   
} else {
      
      const res = await axios.post("http://localhost:5000/api/user/register", {
        name: fullName,
        email,
        password,
      });

      const { token1 } = res.data;
      localStorage.setItem("token", token1);
      navigate("/");
    }
  } catch (err) {
    console.error("Error during authentication:", err);
    alert("Authentication failed. Please try again.");
  }
};
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">
        {/* Left Image Section */}
        <div className="hidden md:block">
          <img
            src="https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg"
            alt="Furniture"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            {isLogin
              ? "Login to explore luxury furniture & interiors"
              : "Sign up to start your journey with premium designs"}
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-md transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p className="text-sm text-center text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-medium ml-1 hover:underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
