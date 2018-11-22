import React from 'react'
import './selected-friends.css'

const SelectedFriends = ({selectedFriends}) => (
  <div className="row">
    Kadooping with:
    {selectedFriends.map((friend) => (
      <p className="selected-friend" key={friend.id}>{friend.fullName}</p>
    ))}
  </div>
)

export default SelectedFriends