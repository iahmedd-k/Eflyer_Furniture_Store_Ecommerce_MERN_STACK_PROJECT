import { useRef, useEffect } from "react";

const galleryItems = [
  "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
  "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
  "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
  "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg",
  "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
  "https://images.pexels.com/photos/1866143/pexels-photo-1866143.jpeg",
];
const GalleryScroll = () => {
  const containerRef = useRef(null);

  // Optional: Auto scroll
  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;

    const autoScroll = setInterval(() => {
      if (container) {
        scrollAmount += 1;
        container.scrollLeft += 1;
        if (scrollAmount >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    }, 30); // speed

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <section className="bg-white py-16 px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Trending Layouts
      </h2>
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar space-x-6"
      >
        {galleryItems.concat(galleryItems).map((url, i) => (
          <div
            key={i}
            className="min-w-[300px] flex-shrink-0 rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={url}
              alt={`Gallery ${i}`}
              className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryScroll;
