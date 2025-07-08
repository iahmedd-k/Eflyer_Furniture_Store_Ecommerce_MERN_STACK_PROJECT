

const categories = [
  {
    name: "Living Room",
    image: "/1.jfif",
  },
  {
    name: "Bedroom",
    image: "/2.jfif",
  },
  {
    name: "Office",
    image: "/3.jfif",
  },
  {
    name: "Dining Room",
    image: "/4.jfif",
  },
];


const PopularCategories = () => {
  return (
    <section className="py-16 bg-[#f7f9fc] px-6 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Design Your Perfect Home
        </h2>
        <p className="text-gray-500 text-lg">
          Browse through the most loved categories by our customers
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, index) => (
          <div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
