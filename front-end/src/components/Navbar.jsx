import { useState, useRef, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 lg:px-20 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600">Eflyer</h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              Categories <FiChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md py-2 w-40 z-10">
                <Link to="/products?category=Living Room" className="block px-4 py-2 hover:bg-blue-50">Living Room</Link>
                <Link to="/products?category=Office Interiors" className="block px-4 py-2 hover:bg-blue-50">Office Interiors</Link>
                <Link to="/products?category=House Interiors" className="block px-4 py-2 hover:bg-blue-50">House Interiors</Link>
              </div>
            )}
          </div>

          <Link to="/products" className="hover:text-blue-600">Shop Now</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </nav>

        {/* Icons Section */}
        <div className="flex items-center gap-5 text-gray-600 text-xl relative">
          {/* Search Toggle */}
          <div className="relative" ref={searchRef}>
            <FiSearch
              onClick={() => setShowSearch(!showSearch)}
              className="cursor-pointer hover:text-blue-600"
            />
            {showSearch && (
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                className="absolute right-0 top-8 w-48 pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all z-50"
              />
            )}
          </div>

          {/* Cart Icon with Badge */}
          <div className="relative">
            <Link to="/cart">
              <FiShoppingCart className="cursor-pointer hover:text-blue-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <FiUser
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="cursor-pointer hover:text-blue-600"
            />
            {showProfileMenu && (
              <div className="absolute right-0 top-8 w-40 bg-white shadow-md rounded-md py-2 text-sm z-50">
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-50">Admin Dashboard</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 hover:bg-blue-50">Login</Link>
                    <Link to="/signup" className="block px-4 py-2 hover:bg-blue-50">Signup</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
