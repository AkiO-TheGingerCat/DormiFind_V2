import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Reviews from "./components/Reviews";
import Login from "./Owners/Login";
import PublicListings from "./components/PublicListings";
import Ownersdashboard from "./Owners/AdminDashboard";
import Signup from "./Owners/Signup";
import ProtectedRoute from "./ProtectedRoute";

const AppWrapper = () => {
  const location = useLocation();
  
  const shouldHideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/owners-dashboard");

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/public-listings" element={<PublicListings />} />
        <Route
          path="/owners-dashboard/*"
          element={
            <ProtectedRoute>
              <Ownersdashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
