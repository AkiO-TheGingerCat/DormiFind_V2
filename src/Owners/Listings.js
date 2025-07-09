import React, { useState } from "react";
import styles from "./Listings.module.css";

const Listings = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    rooms: "",
    type: "Single",
    maxOccupants: "",
    contactNumber: "",
    amenities: {
      wifi: false,
      kitchen: false,
      laundry: false,
      bathroom: false,
      parking: false,
    },
    description: "",
    availability: "Available",
  });

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.amenities) {
      setFormData({
        ...formData,
        amenities: {
          ...formData.amenities,
          [name]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: type === "number" ? +value : value });
    }
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can only upload up to 5 photos.");
      return;
    }
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();

      for (const key in formData) {
        if (key === "amenities") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }

      photos.forEach((photo) => {
        data.append("photos", photo);
      });

      const response = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add listing");
      }

      alert("Listing added successfully!");

      setFormData({
        title: "",
        location: "",
        price: "",
        rooms: "",
        type: "Single",
        maxOccupants: "",
        contactNumber: "",
        amenities: {
          wifi: false,
          kitchen: false,
          laundry: false,
          bathroom: false,
          parking: false,
        },
        description: "",
        availability: "Available",
      });
      setPhotos([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["listings-container"]}>
      <h2>Add New Listing</h2>
      <form className={styles["listings-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-grid"]}>
          <div>
            <label>Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label>Location / Address*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label>Price (₱)*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <label>Contact Number*</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="e.g. +63 912 345 6789"
              required
            />

            <label>Room Type*</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
            </select>

            <label>Amenities:</label>
            <div className={styles["checkbox-group"]}>
              {Object.keys(formData.amenities).map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    name={amenity}
                    checked={formData.amenities[amenity]}
                    onChange={handleChange}
                  />
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label>Number of Rooms*</label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              required
            />

            <label>Maximum Occupants*</label>
            <input
              type="number"
              name="maxOccupants"
              value={formData.maxOccupants}
              onChange={handleChange}
              required
            />

            <label>Description*</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>

            <label>Availability*</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Full">Full</option>
            </select>

            <label>Upload Photos (up to 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {photos.length > 0 && <p>{photos.length} photo(s) selected</p>}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Listing"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Listings;
