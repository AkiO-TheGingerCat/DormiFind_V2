import { useEffect, useState } from "react";
import axios from "axios";
import "./PublicListings.css";

const PublicListings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [searchLocation, setSearchLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [selectedListing, setSelectedListing] = useState(null);

  const [photoPage, setPhotoPage] = useState(0);
  const photosPerPage = 2;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/listings")
      .then((res) => {
        setListings(res.data);
        setFilteredListings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
      });
  }, []);

  const applyFilters = () => {
    let filtered = [...listings];

    if (searchLocation.trim() !== "") {
      filtered = filtered.filter((listing) =>
        listing.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (priceRange === "low") {
      filtered = filtered.filter(
        (listing) => listing.price >= 1000 && listing.price <= 1500
      );
    } else if (priceRange === "medium") {
      filtered = filtered.filter(
        (listing) => listing.price > 1500 && listing.price <= 2000
      );
    } else if (priceRange === "high") {
      filtered = filtered.filter((listing) => listing.price > 2000);
    }

    if (sortBy === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredListings(filtered);
  };

  const closeDetails = () => {
    setSelectedListing(null);
    setPhotoPage(0);
  };

  const nextPhotoPage = () => {
    if (!selectedListing) return;

    const maxPage = Math.floor(
      (selectedListing.images.length - 1) / photosPerPage
    );

    setPhotoPage((prev) => (prev < maxPage ? prev + 1 : 0));
  };

  return (
    <div className="listings-page">
      <div className="sidebar">
        <h2>Filter Listings</h2>
        <input
          type="text"
          placeholder="Search location..."
          className="search-input"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Price Range</option>
          <option value="low">₱1,000 - ₱1,500</option>
          <option value="medium">₱1,501 - ₱2,000</option>
          <option value="high">₱2,001+</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="listings-content">
        {!selectedListing && (
          <div className="listings-grid">
            {filteredListings.length === 0 && <p>No listings found.</p>}

            {filteredListings.map((listing) => {
              let imageUrl = "https://via.placeholder.com/300x180?text=No+Image";
              const images = listing.images;

              if (Array.isArray(images) && images.length > 0) {
                imageUrl = `http://localhost:5000${images[0]}`;
              }

              return (
                <div className="listing-card" key={listing._id || listing.id}>
                  <img src={imageUrl} alt={listing.title} />
                  <div className="listing-info">
                    <h2>{listing.title}</h2>
                    <p className="location">{listing.location}</p>
                    <p className="description">{listing.description}</p>
                    <p className="price">₱{listing.price}/month</p>
                    <button onClick={() => setSelectedListing(listing)}>
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedListing && (
          <div
            className="listing-details-container"
            style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}
          >
            <div
              className="listing-details"
              style={{ display: "flex", gap: 30, alignItems: "flex-start" }}
            >
              <div style={{ flex: 2 }}>
                <button
                  className="close-btn"
                  onClick={closeDetails}
                  style={{
                    backgroundColor: "#555",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    alignSelf: "flex-start",
                  }}
                  aria-label="Back to listings"
                >
                  &larr; Back
                </button>

                <h2>{selectedListing.title}</h2>
                <p>
                  <strong>Location:</strong> {selectedListing.location}
                </p>
                <p>
                  <strong>Price:</strong> ₱{selectedListing.price}/month
                </p>
                <p>
                  <strong>Rooms:</strong> {selectedListing.rooms}
                </p>
                <p>
                  <strong>Type:</strong> {selectedListing.type}
                </p>
                <p>
                  <strong>Max Occupants:</strong> {selectedListing.max_occupants}
                </p>
                <p>
                  <strong>Description:</strong> {selectedListing.description}
                </p>
                <p>
                  <strong>Availability:</strong> {selectedListing.availability}
                </p>
                <p>
                  <strong>Contact Number:</strong> {selectedListing.contact_number}
                </p>

                <p>
                  <strong>Amenities:</strong>
                </p>
                <ul>
                  {selectedListing.amenities_wifi && <li>WiFi</li>}
                  {selectedListing.amenities_kitchen && <li>Kitchen</li>}
                  {selectedListing.amenities_laundry && <li>Laundry</li>}
                  {selectedListing.amenities_bathroom && <li>Bathroom</li>}
                  {selectedListing.amenities_parking && <li>Parking</li>}
                </ul>
              </div>

              <div
                className="listing-photos"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 15,
                  maxWidth: 350,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>Photos:</h3>
                  <button
                    onClick={nextPhotoPage}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    disabled={
                      !selectedListing.images ||
                      selectedListing.images.length <= photosPerPage
                    }
                    aria-label="Next photos"
                  >
                    Next &rarr;
                  </button>
                </div>

                {Array.isArray(selectedListing.images) &&
                selectedListing.images.length > 0 ? (
                  selectedListing.images
                    .slice(
                      photoPage * photosPerPage,
                      (photoPage + 1) * photosPerPage
                    )
                    .map((imgPath, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000${imgPath}`}
                        alt={`${selectedListing.title} - photo ${
                          photoPage * photosPerPage + index + 1
                        }`}
                        style={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                        className="detail-photo"
                      />
                    ))
                ) : (
                  <p>No photos available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicListings;
