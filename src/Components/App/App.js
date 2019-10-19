import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import { tsConstructorType } from '@babel/types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          artist: 'Arcade Fire',
          name: 'Wake Up',
          album: 'Funeral'
        },
        {
          id: 2,
          artist: 'Bon Iver',
          name: 'Holocene',
          album: 'Bon Iver'
        },
        {
          id: 3,
          artist: 'Tom Waits',
          name: `I hope that i don't fall in Love with you.`,
          album: 'Closing time'
        },
      ],
      playlistName: 'Playlist Mock',
      playlist: [
        {
          id: 10,
          artist: 'Sigur Ros',
          name: 'Hoppipolla',
          album: 'Who knows'
        },
        {
          id: 20,
          artist: 'Ornatos Violeta',
          name: 'Ouvi Dizer',
          album: 'O monstro precisa de amigos'
        },
        {
          id: 30,
          artist: 'Britney Spears',
          name: `Toxic`,
          album: 'Toxic'
        },
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
    const trackURIs = [];
  }

  seacrh(term) {
    console.log(term);
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
