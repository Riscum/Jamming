let userAccessToken;
const redirectUri = 'http://dfjamming.surge.sh/';
const clientId = '2f47e23c803b4680a707038318d03bfd';

const Spotify = {

    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
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
    search(term) {
        const userAccessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                })
                )
            }
        })
    },

    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length){
            return;
        };

        const userAccessToken = Spotify.getAccessToken();
        const header = {
                Authorization: `Bearer ${userAccessToken}`
        };
        let userID;



        fetch('https://api.spotify.com/v1/me', {
            headers: header
        }).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify( { name: playlistName })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                console.log(playlistId);
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: header,
                    body: JSON.stringify ({ uris: trackUris})
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                })
            })

        })    
    }
};


export default Spotify;