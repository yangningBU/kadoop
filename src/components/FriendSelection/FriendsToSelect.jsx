import React from 'react'

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  friend: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '5rem'
  },
  label: {
    margin: '0.5rem'
  }
}

const FriendsToSelect = ({friends, selectFriend}) => {
  return (
    <div>
      <form style={styles.wrapper}>
        {friends.map((friend) => {
          const name = `checkbox-friend-${friend.id}`

          return (
            <div key={friend.id} style={styles.friend}>
              <input
                type="checkbox"
                name={name}
                id={name}
                data-friend-id={friend.id}
                onClick={selectFriend}
              />
              <label htmlFor={name} style={styles.label}>
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