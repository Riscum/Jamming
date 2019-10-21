let userAccessToken  = '';
const redirectUri = 'http://localhost:3000/';
const clientId = '2f47e23c803b4680a707038318d03bfd';

const Spotify = {

    getAccessToken: () => {
        if (userAccessToken){
            return userAccessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch){
            userAccessToken = accessTokenMatch[1];
            const expirationTime = Number(expiresInMatch[1]);
            window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;            
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
          }
//https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=token&scope=playlist-modify-public&redirect_uri=REDIRECT_URI

    },
    search: (term) => {
        fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {Authorization: `Bearer ${userAccessToken}`}
        }).then( response => {
            return response.json();
        }).then( jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            } else {
                return jsonResponse.tracks.item.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                })
                )
            }
        })
    }
};


export default Spotify;