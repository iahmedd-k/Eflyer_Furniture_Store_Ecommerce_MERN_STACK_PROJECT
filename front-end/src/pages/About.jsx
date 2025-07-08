// About.jsx
const About = () => {
  return (
    <section className="min-h-screen bg-white px-6 lg:px-20 py-20 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About <span className="text-blue-600">Eflyer</span></h1>
        <p className="text-lg text-gray-600 mb-10">
          At Eflyer, we believe furniture should inspire. Founded with a passion for aesthetics and comfort,
          our mission is to bring premium interiors into every home across Pakistan.
        </p>
        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              From a small design studio to one of the fastest growing furniture brands in the country,
              we’ve always put quality and creativity first. Every piece is handpicked, reviewed, and tested
              for durability, comfort, and visual impact.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
              <li>Modern and luxury furniture collections</li>
              <li>Customizable designs</li>
              <li>Interior layout consultancy</li>
              <li>Nationwide delivery & 7-day return</li>
            </ul>
          </div>
        </div>
        <div className="mt-16">
          <img
            src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
            alt="Showroom"
            className="rounded-xl w-full object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;


// 
