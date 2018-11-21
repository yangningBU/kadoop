import React, { Component } from 'react'

import SelectedFriends from './components/SelectedFriends'
import FriendsToSelect from './components/FriendsToSelect'

import friends from './data/friends.json'
import profile from './data/profile.json'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {},
      friends: [],
      selectedFriends: []
    }

    this.selectFriend = this.selectFriend.bind(this)
  }

  componentWillMount() {
    this.setState({friends: friends, profile: profile})
  }

  selectFriend(e) {
    const input = e.target
    const friendId = input.dataset.friendId
    
    this.setState((previousState) => {
      const friend = previousState.friends.find(friend => friendId === `${friend.id}`)
      const alreadySelectedIndex = previousState.selectedFriends.findIndex(f => f.id === friend.id)

      if (alreadySelectedIndex > -1) {
        // Remove
        return Object.assign({}, {
          selectedFriends: [
            ...previousState.selectedFriends.slice(0, alreadySelectedIndex),
            ...previousState.selectedFriends.slice(alreadySelectedIndex + 1)
          ]
        })
      } else {
        // Add
        return Object.assign({}, {
          selectedFriends: [...previousState.selectedFriends, friend]
        })
      }
    })
  }
  
  render() {
    return (

      <div className="container">
        <section className="col">
          <SelectedFriends selectedFriends={this.state.selectedFriends} />
          <FriendsToSelect friends={this.state.friends} selectFriend={this.selectFriend}/>
        </section>
      </div>
    );
  }
}

export default App;
