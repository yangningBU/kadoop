import React from 'react'

const SelectedFriends = ({selectedFriends}) => (
  <p>Kadooping with: {selectedFriends.map((friend) => (
    <span className="selected-friend" key={friend.id}>{friend.name}</span>
  ))}
  </p>
)

export default SelectedFriends