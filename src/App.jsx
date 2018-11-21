import React, { Component } from 'react'
import { StyleRoot } from 'radium';
import Header from './components/Header.jsx'
import FriendSelection from './components/FriendSelection/FriendSelection.jsx'
import Map from './components/Map/Map.jsx'
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

      if (alreadySelectedIndex === -1) {
        // Add
        return Object.assign({}, {
          selectedFriends: [...previousState.selectedFriends, friend]
        })
        
      } else {
        // Remove
        return Object.assign({}, {
          selectedFriends: [
            ...previousState.selectedFriends.slice(0, alreadySelectedIndex),
            ...previousState.selectedFriends.slice(alreadySelectedIndex + 1)
          ]
        })
      }
    })
  }
  
  render() {
    return (
      <StyleRoot style={{height: '100%'}}>
        <Header user={this.state.profile} />
        <FriendSelection
          friends={this.state.friends}
          selectedFriends={this.state.selectedFriends}
          selectFriend={this.selectFriend}
        />
        <Map profile={this.state.profile} />
      </StyleRoot>
    );
  }
}

export default App;
