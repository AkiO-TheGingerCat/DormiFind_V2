import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DeleteListing.css";

const DeleteListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/listings");

      const normalizedListings = res.data.map((listing) => ({
        ...listing,
        id: listing._id || listing.id,
      }));

      setListings(normalizedListings);
      setError(null);
    } catch (err) {
      setError("Failed to load listings.");
      console.error("Fetch listings error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/listings/${id}`);
      alert("Listing deleted successfully!");
      fetchListings();
    } catch (err) {
      console.error("Delete listing error:", err);
      alert("Failed to delete the listing: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/listings/${editData.id}`, {
        ...editData,
        amenities_wifi: editData.amenities.wifi,
        amenities_kitchen: editData.amenities.kitchen,
        amenities_laundry: editData.amenities.laundry,
        amenities_bathroom: editData.amenities.bathroom,
        amenities_parking: editData.amenities.parking,
      });
      alert("Listing updated successfully!");
      setEditData(null);
      fetchListings();
    } catch (err) {
      console.error("Edit listing error:", err);
      alert("Failed to update the listing: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="delete-listing-container">
      <h2>Manage Listings</h2>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul className="listing-list">
          {listings.map((listing) => (
            <li key={listing.id} className="listing-item">
              <div className="listing-details">
                <h3>{listing.title}</h3>
                <p>{listing.location}</p>
                <p>₱{listing.price}/month</p>
                {listing.contactNumber && <p>Contact: {listing.contactNumber}</p>}
              </div>
              <div className="action-buttons">
                <button
                  className="edit-button"
                  onClick={() =>
                    setEditData({
                      ...listing,
                      amenities: {
                        wifi: listing.amenities_wifi || false,
                        kitchen: listing.amenities_kitchen || false,
                        laundry: listing.amenities_laundry || false,
                        bathroom: listing.amenities_bathroom || false,
                        parking: listing.amenities_parking || false,
                      },
                      contactNumber: listing.contactNumber || "",
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(listing.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editData && (
        <div className="edit-modal">
          <h3>Edit Listing</h3>
          <form onSubmit={handleEditSubmit} className="edit-form">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              placeholder="Title"
              required
            />
            <input
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              placeholder="Location"
              required
            />
            <input
              type="number"
              value={editData.price}
              onChange={(e) => setEditData({ ...editData, price: e.target.value })}
              placeholder="Price"
              required
            />
            <input
              type="number"
              value={editData.rooms}
              onChange={(e) => setEditData({ ...editData, rooms: e.target.value })}
              placeholder="Rooms"
              required
            />
            <input
              type="text"
              value={editData.type}
              onChange={(e) => setEditData({ ...editData, type: e.target.value })}
              placeholder="Type"
              required
            />
            <input
              type="number"
              value={editData.maxOccupants}
              onChange={(e) => setEditData({ ...editData, maxOccupants: e.target.value })}
              placeholder="Max Occupants"
              required
            />
            <input
              type="text"
              value={editData.contactNumber}
              onChange={(e) => setEditData({ ...editData, contactNumber: e.target.value })}
              placeholder="Contact Number"
              required
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              placeholder="Description"
            />
            <select
              value={editData.availability}
              onChange={(e) => setEditData({ ...editData, availability: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="not available">Not Available</option>
            </select>

            <div className="amenities-group">
              <label>
                <input
                  type="checkbox"
                  checked={editData.amenities.wifi}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amenities: { ...editData.amenities, wifi: e.target.checked },
                    })
                  }
                />
                WiFi
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={editData.amenities.kitchen}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amenities: { ...editData.amenities, kitchen: e.target.checked },
                    })
                  }
                />
                Kitchen
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={editData.amenities.laundry}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amenities: { ...editData.amenities, laundry: e.target.checked },
                    })
                  }
                />
                Laundry
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={editData.amenities.bathroom}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amenities: { ...editData.amenities, bathroom: e.target.checked },
                    })
                  }
                />
                Bathroom
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={editData.amenities.parking}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amenities: { ...editData.amenities, parking: e.target.checked },
                    })
                  }
                />
                Parking
              </label>
            </div>

            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditData(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteListing;
