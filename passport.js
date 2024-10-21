import React, { useEffect, useState } from 'react';

const GoogleLoginButton = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const loadGoogleApi = () => {
      window.gapi.load('client:auth2', initClient);
    };

    const initClient = () => {
      window.gapi.client.init({
        clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        scope: 'chandanegc@gmail.com',
      }).then(() => {
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    };

    loadGoogleApi();
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      const user = window.gapi.auth2.getAuthInstance().currentUser.get();
      const profile = user.getBasicProfile();
      setUserProfile({
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl(),
      });
    } else {
      setUserProfile(null);
    }
  };

  const handleLogin = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogout = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <div>
      {userProfile ? (
        <div>
          <h2>Welcome, {userProfile.name}</h2>
          <img src={userProfile.imageUrl} alt="Profile" />
          <p>Email: {userProfile.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
