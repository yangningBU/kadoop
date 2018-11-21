import React from 'react'
import SelectedFriends from './SelectedFriends'
import FriendsToSelect from './FriendsToSelect.jsx'
import './friend-selection.css'

const FriendSelection = ({friends, selectFriend, selectedFriends}) => {
  return (
    <section id="friend-selection">
      <SelectedFriends selectedFriends={selectedFriends} />
      <FriendsToSelect friends={friends} selectFriend={selectFriend}/>
    </section>
  )
}

export default FriendSelection