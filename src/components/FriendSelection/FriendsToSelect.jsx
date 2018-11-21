import React from 'react'

const FriendsToSelect = ({friends, selectFriend}) => {
  return (
    <div className="row">
      <form>
        {friends.map((friend) => {
          const name = `checkbox-friend-${friend.id}`

          return (
            <div className="form-check" key={friend.id}>
              <input
                type="checkbox"
                className="form-check-input"
                name={name}
                id={name}
                data-friend-id={friend.id}
                onClick={selectFriend}
              />
              <label htmlFor={name} className="form-check-label">
                {friend.name}
              </label>
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default FriendsToSelect