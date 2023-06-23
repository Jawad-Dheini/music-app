import React from "react";

export const SpotifyLoginButton = () => {
  // Spotify authentication parameters
  const clientId = "a3a246ae51074560bbea76541237548e";
  const redirectUri = "http://localhost:3000/search";
  const scope = "user-read-private user-read-email";

  const handleSpotifyLogin = () => {
    // Generate the authentication URL
    const authUrl =
      "https://accounts.spotify.com/authorize?" +
      "response_type=token" +
      "&client_id=" +
      encodeURIComponent(clientId) +
      "&redirect_uri=" +
      encodeURIComponent(redirectUri) +
      "&scope=" +
      encodeURIComponent(scope);

    // Redirect the user to the authentication URL
    window.location.href = authUrl;
  };

  return (
    <button id="login-btn" onClick={handleSpotifyLogin}>
      Login
    </button>
  );
};
