import { useState, useEffect } from "react";

const UNSPLASH_API_KEY = "Rs9xs1yecMfD0khghyZ9BqpxGn1a35Q9DtUF6g6o_fM";

const App = () => {
  const [query, setQuery] = useState("switzerland");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (query.trim() !== "") {
      fetchImages();
    }
  }, [query, page]);

  const fetchImages = async () => {
    setLoading(true);
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${UNSPLASH_API_KEY}&per_page=16`;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      console.log("API Response:", data); // Debugging
  
      if (data.results && data.results.length > 0) {
        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
        }
      } else {
        console.log("No more results found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setPage(1);
      fetchImages();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold text-yellow-400">Image Search Gallery</h1>
        <form onSubmit={handleSearch} className="mt-4 md:flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search landscapes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 rounded-md text-black w-80"
          />
          <button
            type="submit"
            className="px-4 py-2 md:mt-0 mt-4 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </header>

      <main className="px-6 py-10">
        <h1 className="text-yellow-200">Click on Image To Download </h1>
        {/* Loader */}
        {loading && (
          <div className="text-center">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 mx-auto animate-spin"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        )}

        {/* Responsive Grid for Images */}
        {!loading && images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-lg ">
                {/* Link to the image source on Unsplash */}
                <a href={image.links.html} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && query.trim() !== "" && (
          <div className="text-center mt-10">
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition"
            >
              More Photos
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
