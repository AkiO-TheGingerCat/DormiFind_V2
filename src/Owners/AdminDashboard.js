import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Listings from "./Listings";
import DeleteListing from "./deleteListing";
import ManageReview from "./ManageReview";
import "./AdminDashboard.css";

import dev1Image from "../assets/Blaise.jpg";
import dev2Image from "../assets/Shane.jpg";
import dev3Image from "../assets/Whyzl.jpg";

const fallbackDevelopers = [
  {
    id: 1,
    name: "Blaise Tyrel B. Daga",
    role: "Lead Developer",
    photo: dev1Image,
  },
  {
    id: 2,
    name: "Shane B. Bobis",
    role: "Frontend Developer",
    photo: dev2Image,
  },
  {
    id: 3,
    name: "Whyzl V. Salarda",
    role: "Frontend Developer",
    photo: dev3Image,
  },
];

const Ownersdashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [listingCount, setListingCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings/count")
      .then((res) => res.json())
      .then((data) => setListingCount(data.count))
      .catch((err) => {
        console.error("Error fetching listing count:", err);
      });
  }, []);

  const developers = fallbackDevelopers;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard__container">
      <aside className="admin-dashboard__sidebar">
        <div className="admin-dashboard__logo">
          <span className="logo-bold">Admin's</span>
          <span className="logo-light">Dashboard</span>
        </div>
        <button onClick={() => navigate("/owners-dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/owners-dashboard/listings")}>
          Listings
        </button>
        <button onClick={() => navigate("/owners-dashboard/delete-listing")}>
          Delete Listing
        </button>
        <button onClick={() => navigate("/owners-dashboard/manage-review")}>
          Manage Reviews
        </button>
        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main className="admin-dashboard__content">
        {location.pathname === "/owners-dashboard" && (
          <>
            <h2>Welcome Admins</h2>

            <div className="admin-dashboard__developers">
              {developers.map((dev) => (
                <div key={dev.id} className="admin-dashboard__developer-card">
                  <img
                    src={dev.photo}
                    alt={`${dev.name}'s avatar`}
                    className="admin-dashboard__photo"
                  />
                  <h3>{dev.name}</h3>
                  <p>{dev.role}</p>
                </div>
              ))}
            </div>

            <div className="admin-dashboard__overview">
              <div className="admin-dashboard__stat-box">
                <h3>{listingCount}</h3>
                <p>Total Boarding Houses Listed</p>
              </div>
            </div>
          </>
        )}

        <Routes>
          <Route path="listings" element={<Listings />} />
          <Route path="delete-listing" element={<DeleteListing />} />
          <Route path="manage-review" element={<ManageReview />} />
          <Route path="*" element={<Navigate to="/owners-dashboard" />} />
        </Routes>
      </main>
    </div>
  );
};

export default Ownersdashboard;
