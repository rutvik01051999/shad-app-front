// App.js
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Layout from "../src/components/Layout";
import Home from "../src/components//Home";
import About from "../src/components//About";
import Contact from "../src/components//Contact";
import Login from "../src/components/Login";
import Profile from "../src/components/Profile";
import NotFound from "../src/components/NotFound";
import Signup from "../src/components/Signup";
import OtpVerification from "../src/components/OtpVerification";
import 'bootstrap/dist/css/bootstrap.min.css';



/*************  ✨ Codeium Command ⭐  *************/
/**
 * The main application component, which wraps the entire app in a
 * BrowserRouter and renders a set of routes.
 *
 * The routes are defined as follows:
 * - The root route renders a Layout component, which contains a
 *   top-level navigation bar and a main content area.
 * - The index route of the Layout component renders a Home component.
 * - The "about" route renders an About component.
 * - The "contact" route renders a Contact component.
 * - The "login" route renders a Login component, wrapped in an
 *   AuthRoute to ensure that only unauthenticated users can access
 *   it.
 * - The "profile" route renders a Profile component, wrapped in a
 *   PrivateRoute to ensure that only authenticated users can access
 *   it.
 */
/******  eae516a5-aefe-4cfc-8e6e-d76c5e3a9ad5  *******/function App() {
  return (
    <Router>
     
      
      <Routes>
      <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
       <Route path="/signup" element={<Signup/>} />
       <Route path="/verify-otp" element={<OtpVerification/>} />
      
        {/* Define the layout and its nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Default route for the layout */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="notfound" element={<NotFound />} />

        </Route>
      </Routes>
    </Router>
  );
}
// Protect the Profile page (accessible only if logged in)

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token'); // Check if user is logged in
  return token ? children : <Navigate to="/login" />;
}
// Protect the Login page (redirect if already logged in)
function AuthRoute({ children }) {
  const token = localStorage.getItem('token'); // Check if the user is already logged in
  return token ? <Navigate to="/profile" /> : children;
}
export default App;
