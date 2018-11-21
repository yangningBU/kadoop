import React from 'react'

const styles = {
  map: {
    height: '100%',
    border: '1px solid darkgrey',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const Map = ({profile}) => {
  const { name, location: {address} } = profile
  return (
    <section id="map" style={styles.map}>
      <p>Hi {name}.</p>
      <p>You're currently kadooping from {address}</p>
    </section>
  )
}

export default Map;