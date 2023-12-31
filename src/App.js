import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpotifyLoginButton } from "./components/Home";
import { ArtistSearch } from "./components/ArtistSearch";
import { Album } from "./components/Album";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SpotifyLoginButton />} />
          <Route path="/search" element={<ArtistSearch />} />
          <Route
            path="*"
            element={
              <Album
                selectedArtistName={localStorage.getItem("name")}
                searchResults={JSON.parse(localStorage.getItem("res"))}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
