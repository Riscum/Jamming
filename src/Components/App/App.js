import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import { tsConstructorType } from '@babel/types';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
      ],
      playlistName: 'Playlist Mock',
      playlist: [
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.seacrh = this.seacrh.bind(this);
  }

  addTrack(track) {

    let playlist = this.state.playlist;

    if ( !playlist.includes(track) ) {
      playlist.push(track);
    };
    this.setState({
      playlist: playlist
    })
  }

  removeTrack(track) {
    let playlist = this.state.playlist;
    const trackIndex = playlist.indexOf(track);
    if ( trackIndex > -1 ) {
      playlist.splice(trackIndex, 1);
    };
    this.setState({
      playlist: playlist
    })
  }

  updatePlaylistName(playlistName){
    this.setState({
      playlistName: playlistName
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlist.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlist: []
    })
  }

  seacrh(term) {
    Spotify.search(term).then(searchResults => {
    this.setState({
      searchResults: searchResults
    })
  })
  }

  render() {
    return <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar  onSearch={this.seacrh}/>
        <div className="App-playlist">
          <SearchResults  searchResults={this.state.searchResults} 
                          onAdd = {this.addTrack}
                          />
          <Playlist playlistName={this.state.playlistName} 
                    playlist={this.state.playlist} 
                    onRemove = {this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}
                    />
        </div>
      </div>
    </div>
  };
}

export default App;
