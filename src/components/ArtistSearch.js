import React, { useState, useEffect } from "react";

export const ArtistSearch = () => {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("query") || ""
  );
  const [searchResults, setSearchResults] = useState(
    JSON.parse(localStorage.getItem("results")) || []
  );
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedArtistName, setSelectedArtistName] = useState(
    localStorage.getItem("name") || null
  );
  const [artistClicked, setArtistClicked] = useState(false);

  // Debouncing in the useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && !artistClicked) {
        searchArtists();
      } else if (!searchQuery && !artistClicked) {
        setSearchResults([]);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [searchQuery, artistClicked]);

  useEffect(() => {
    if (selectedArtistName && searchResults.length > 0) {
      localStorage.setItem("name", selectedArtistName);
      localStorage.setItem("res", JSON.stringify(searchResults));
      localStorage.setItem("query", searchQuery);
      localStorage.setItem("results", JSON.stringify(searchResults));
    }
  }, [selectedArtistName, searchResults]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    searchArtists();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchArtists();
    }
  };

  const searchArtists = async () => {
    const url = window.location.href;
    const params = new URLSearchParams(url.split("#")[1]);
    const accessToken = params.get("access_token");
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchQuery
        )}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ` + accessToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.artists.items);
      } else {
        console.error("Search request failed.");
      }
    } catch (error) {
      console.error("Error occurred while searching artists:", error);
    }
  };

  const handleArtistClick = async (artistId, artistName) => {
    setArtistClicked(true);
    const url = window.location.href;
    const params = new URLSearchParams(url.split("#")[1]);
    const accessToken = params.get("access_token");

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
          headers: {
            Authorization: `Bearer ` + accessToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedArtist(artistId);
        setSelectedArtistName(artistName);
        setSearchResults(data.items);
        console.log(selectedArtistName);
        console.log(searchResults);

        window.location = `/${artistId}`;
      } else {
        console.error("Error retrieving artist albums.");
      }
    } catch (error) {
      console.error("Error occurred while retrieving artist albums:", error);
    }
  };

  return (
    <div>
      {selectedArtist ? (
        // Render albums for the selected artist
        <p>Loading</p>
      ) : (
        // Render artist search results
        <div>
          <input
            id="search-box"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
            placeholder="Search for an artist..."
          />

          <div id="container">
            {searchResults.map((artist) => (
              <div
                id="artist-profile"
                onClick={() => handleArtistClick(artist.id, artist.name)}
              >
                <div key={artist.id}>
                  <img
                    id="artist-img"
                    src={artist.images[0]?.url}
                    alt={artist.name}
                  />
                  <p id="artist-name">{artist.name}</p>
                  <p id="followers">{artist.followers?.total} followers</p>
                  <p id="popularity">
                    Rating: {Math.round(artist.popularity / 20)} stars
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
