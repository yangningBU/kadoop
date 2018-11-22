import React, { Component } from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { FaStreetView } from 'react-icons/fa';
import env from '../../env'

const styles = {
  map: {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    position: 'relative'
  },
  marker: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: '0.85em',
    textAlign: 'center'
  }
}

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

  }

  onMarkerClick = (props, marker, e) => {
    console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const { firstName, location: { address, latitude, longitude } } = this.props.user
    return (
      <Map
        containerStyle={styles.map}
        google={this.props.google}
        zoom={15}
        initialCenter={{
          lat: latitude,
          lng: longitude
        }}
      >
        <Marker
          name={firstName}
          address={address}
          position={{lat: latitude, lng: longitude}}
          onClick={this.onMarkerClick}
          style={{color: 'yellow'}}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <>
              <h5><FaStreetView /> {this.state.selectedPlace.name}</h5>
              <p>{this.state.selectedPlace.address}</p>
            </>
        </InfoWindow>
      </Map>
    )
  }
}

/*
<Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
  <div style={styles.marker}>
    <h5><FaStreetView /></h5>
    <h5 style={{backgroundColor: 'white'}}>{firstName}</h5>
  </div>
</Marker>
*/

const LoadingContainer = (props) => (
  <div>Loading map...</div>
)

export default GoogleApiWrapper({
  apiKey: env.REACT_APP_GOOGLE_MAPS_API_KEY,
  LoadingContainer: LoadingContainer
})(MapContainer)