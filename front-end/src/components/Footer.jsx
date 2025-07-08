import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-6 lg:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Eflyer</h2>
          <p className="text-sm leading-relaxed">
            Elevating your living spaces with handpicked furniture and elegant
            interiors. Discover quality, comfort, and creativity.
          </p>
          <div className="flex gap-4 mt-6 text-xl text-gray-400">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            <FaPinterestP className="hover:text-red-400 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li> <Link to='/home' className="hover:text-blue-400 cursor-pointer">Home</Link> </li>
            <li> <Link to='/about' className="hover:text-blue-400 cursor-pointer">About Us</Link> </li>
            <li> <Link to='/products' className="hover:text-blue-400 cursor-pointer">Shop</Link> </li>
            <li> <Link to='/contact' className="hover:text-blue-400 cursor-pointer">Contact</Link> </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-3 text-sm">
           <li> <Link to='/products?category=Living Room' className="hover:text-blue-400 cursor-pointer">Living Room</Link> </li>
         <li>  <Link to='/products?category=Bedroom' className="hover:text-blue-400 cursor-pointer">Bedroom</Link> </li>
            <li> <Link to='/products?category=Dining' className="hover:text-blue-400 cursor-pointer">Dining</Link> </li>
            <li> <Link to='/products?category=Office' className="hover:text-blue-400 cursor-pointer">Office</Link> </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li>📍 Shop 1 i8 Markaz, Islamabad</li>
            <li>📞 +92 300 1234567</li>
            <li>📧 ahmedkhanofficials@gmail.com</li>
            <li className="hover:text-blue-400 cursor-pointer">Help Center</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Eflyer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
