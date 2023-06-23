export const Album = ({ selectedArtistName, searchResults }) => {
  return (
    <div>
      <h2 id="title-in">{selectedArtistName}</h2>
      <h3 id="subtitle-in">Albums</h3>
      <div id="container">
        {searchResults.map((album) => (
          <div id="album-info">
            <div key={album.id}>
              <img
                id="artist-img"
                src={album.images[0]?.url}
                alt={album.name}
              />
              <p id="artist-name">{album.name}</p>
              <p id="followers">
                {album.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p id="followers">{album.release_date}</p>
              <p id="followers">{album.total_tracks} tracks</p>
              <div id="preview-div">
                <a
                  id="preview"
                  href={album.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preview on Spotify
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
