const Hero = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
            Elevate Your <span className="text-blue-600">Living Space</span>
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Discover modern furniture and interior designs that blend style with comfort. Crafted to perfection, designed for you.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <button className="bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-500 transition">
              Shop Furniture
            </button>
            <button className="border border-blue-600 text-blue-600 py-3 px-6 rounded-full hover:bg-blue-50 transition">
              Explore Interior
            </button>
          </div>
        </div>

        {/* Right Image Content */}
        <div className="w-full lg:w-1/2 relative flex justify-center">
          <div className="relative w-full max-w-md">
            <img
              src="/hero1.avif"
              alt="Modern Sofa"
              className="rounded-xl shadow-xl w-full h-full object-cover"
            />
            <img
              src="/hero2.jfif"
              alt="Interior"
              className="absolute bottom-[-30px] right-[-30px] w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
