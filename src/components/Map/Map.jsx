import React from 'react'
import './map.css'

const Map = ({profile}) => {
  const { name, location: {address} } = profile
  return (
    <section id="map">
      <p>Hi {name}.</p>
      <p>You're currently kadooping from {address}</p>
    </section>
  )
}

export default Map;