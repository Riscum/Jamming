import React from 'react';
import Track from '../Track/Track';

class TrackList extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return <div className="TrackList">
         {this.props.tracks.map( (track) => {
            return <Track track={track} 
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}
                    />
         })}
    </div>
    }
}

export default TrackList;