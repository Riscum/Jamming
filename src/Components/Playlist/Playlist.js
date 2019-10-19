import React from 'react';
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {

    render() {
        return <div className="Playlist">
        <input defaultValue ={"New Playlist"}/>
        <TrackList  tracks={this.props.playlist} 
                    onRemove={this.props.onRemove}
                    isRemoval={true}
        />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    }
}

export default Playlist;