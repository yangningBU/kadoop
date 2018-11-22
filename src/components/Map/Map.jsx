import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl';
import { FaStreetView } from 'react-icons/fa';
import env from '../../env'

const styles = {
  marker: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: '0.85em',
    textAlign: 'center'
  }
}

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewport: {
        width: '100%',
        height: '100%',
        zoom: 15,
        latitude: props.user.location.latitude,
        longitude: props.user.location.longitude
      }
    }
  }
  render() {
    const { firstName, location: { latitude, longitude } } = this.props.user
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={env.REACT_APP_MAPBOX_API_KEY_PUBLIC}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
        <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
          <div style={styles.marker}>
            <h5><FaStreetView /></h5>
            <h5 style={{backgroundColor: 'white'}}>{firstName}</h5>
          </div>
        </Marker>
      </ReactMapGL>
    )
  }
}

export default Map;
