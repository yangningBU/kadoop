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
      activeMarker: {}
    }

    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onMapClicked = this.onMapClicked.bind(this)
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const { activeMarker } = this.state

    return (
      <Map
        containerStyle={styles.map}
        google={this.props.google}
        zoom={13}
        initialCenter={{
          lat: this.props.user.location.latitude,
          lng: this.props.user.location.longitude
        }}
        onClick={this.onMapClicked}
      >
        {[this.props.user, ...this.props.selectedFriends].map(person => {
          const { id, firstName, location: { address, latitude, longitude } } = person
          return (
            <Marker
              key={`marker-friend-id-${id}`}
              firstName={firstName}
              address={address}
              position={{lat: latitude, lng: longitude}}
              onClick={this.onMarkerClick}
            />
          )
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <>
              <h5><FaStreetView /> {activeMarker && activeMarker.firstName}</h5>
              <p>{activeMarker && activeMarker.address}</p>
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