const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 to-white py-20 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Get in <span className="text-blue-600">Touch</span></h1>
        <p className="text-lg text-gray-600 mb-12">
          Have questions about our furniture, design services, or delivery? We’re here to help.
        </p>

        <form className="bg-white shadow-xl rounded-xl p-8 space-y-6 text-left">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-md text-lg transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-gray-600 text-sm">
          <p>Email: support@eflyer.pk | Phone: +92 300 1234567</p>
          <p className="mt-1">Office: 123 i8 Markaz, Islamabad, Pakistan</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;