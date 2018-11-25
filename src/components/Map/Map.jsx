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

const DEFAULT_ZOOM = 13

const markerID = id => (`marker-friend-id-${id}`)

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bounds: null,
      showingInfoWindow: false,
      activeMarker: {}
    }

    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onMapClicked = this.onMapClicked.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedFriends.length !== this.props.selectedFriends.length) {
      this._refitMapToMarkers()
      this.setState({showingInfoWindow: false})
    }
  }

  _refitMapToMarkers() {
    const { selectedFriends, user: { location: { latitude, longitude } }} = this.props
    const markers = selectedFriends.map(f => f.id).map(id => this.refs[markerID(id)].marker)
    const friendPositions = markers.map(marker => {
      return {lat: marker.position.lat(), lng: marker.position.lng()}
    })
    const positions = [{lat: latitude, lng: longitude}, ...friendPositions]
    const bounds = new this.props.google.maps.LatLngBounds()
    positions.forEach(position => bounds.extend(position))
    // Due to a bug in 'google-maps-react' I can't just set bounds to null
    this.setState({bounds}, () => { if (!selectedFriends.length) this._resetMapZoom() })
  }

  _resetMapZoom() {
    this.refs.map.map.setZoom(DEFAULT_ZOOM)
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
    const mapProps = {
      containerStyle: styles.map,
      ref: "map",
      google: this.props.google,
      zoom: DEFAULT_ZOOM,
      initialCenter: {
        lat: this.props.user.location.latitude,
        lng: this.props.user.location.longitude
      },
      onClick: this.onMapClicked,
      bounds: this.state.bounds
    }

    return (
      <Map {...mapProps}>
        {[this.props.user, ...this.props.selectedFriends].map(person => {
          const { id, firstName, location: { address, latitude, longitude } } = person
          return (
            <Marker
              key={markerID(id)}
              firstName={firstName}
              title={address /* this is the HTML tooltip text when hovering over the marker */}
              address={address}
              position={{lat: latitude, lng: longitude}}
              onClick={this.onMarkerClick}
              ref={markerID(id)}
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

const LoadingContainer = (props) => (
  <div style={{
    textAlign: 'center',
    fontSize: '2em',
    borderTop: '1px solid black',
    paddingTop: '1em'
  }}>Loading map...</div>
)

export default GoogleApiWrapper({
  apiKey: env.REACT_APP_GOOGLE_MAPS_API_KEY,
  LoadingContainer: LoadingContainer
})(MapContainer)
