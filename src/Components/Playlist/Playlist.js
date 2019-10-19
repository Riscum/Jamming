import React from 'react';
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
    constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSaveClick = this.handleSaveClick.bind(this);
    }
    handleNameChange(e) {
      this.props.onNameChange(e.target.value);
    }
    handleSaveClick(e) {
      this.props.onSave();
    }
    render() {
        return <div className="Playlist">
        <input defaultValue ={"New Playlist"} onChange={this.handleNameChange} />
        <TrackList  tracks={this.props.playlist} 
                    onRemove={this.props.onRemove}
                    isRemoval={true}
        />
        <button className="Playlist-save" onClick={this.handleSaveClick} >SAVE TO SPOTIFY</button>
      </div>
    }
}

export default Playlist;