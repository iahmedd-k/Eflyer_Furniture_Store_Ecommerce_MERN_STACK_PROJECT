import { Link } from "react-router-dom";

const AmbitionSection = () => {
  return (
    <section className="py-16 px-6 lg:px-20 bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="/abc.jpg"
            alt="Ambition"
            className="rounded-xl w-full h-auto object-cover shadow-lg"
          />
        </div>

        {/* Right Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Our Ambitions</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Pioneering innovation and excellence in furniture
          </h2>
          <p className="text-gray-600 mb-6">
            Striving for excellence in every detail, we are committed to revolutionizing the online shopping experience.
            Our ambition is to set new standards in quality, customer satisfaction, and sustainability, ensuring that
            every purchase from our platform is a step towards a brighter, more innovative future.
          </p>
          <Link to="/about">
  <button className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-900 transition">
    Learn more
  </button>
</Link>

        </div>
      </div>
    </section>
  );
};

export default AmbitionSection;
