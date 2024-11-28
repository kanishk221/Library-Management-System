import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import UserForm from "./components/UserForm";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Addbook from "./components/Addbook";
import Issuebook from "./components/Issuebook";
import Returnbook from "./components/Returnbook";
import Recentissue from "./components/Recentissue";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<Addbook />} />
          <Route path="/issue-book" element={<Issuebook />} />
          <Route path="/return-book" element={<Returnbook />} />
          <Route path="/users" element={<UserForm />} />
          <Route path="/recent" element={<Recentissue />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
