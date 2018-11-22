import React from 'react'
import Radium from 'radium'
import coffeeCup from '../assets/images/coffee-cup.png'
import c from '../constants'

const styles = {
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '.5rem 0',
    borderBottom: '1px solid darkgrey',
    [`@media all and (min-width: ${c.breakPoints.sm})`]: {
      padding: '1rem 0'
    }
  },
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  company: {
    fontSize: '1.2rem',
    fontFamily: 'Pacifico',
    display: 'inline',
    [`@media all and (min-width: ${c.breakPoints.sm})`]: {
      fontSize: '2rem'
    }
  },
  image: {
    width: '2rem',
    marginRight: '0.5rem',
    [`@media all and (min-width: ${c.breakPoints.sm})`]: {
      width: '4rem'
    }
  }
}

const LoginButton = () => (
  <button>Login</button> 
)

const UserDropdown = ({user}) => {
  return (
    <span style={{fontSize: '1.1em'}}>{user.firstName}</span>
  )
}

const Header = ({user}) => {
  return (
    <header style={styles.header}>
      <span style={styles.wrapper}>
        <img
          src={coffeeCup}
          alt="Steaming Coffee Cup Logo"
          style={styles.image}
          />
        <span style={styles.company}>Kadoop</span>
      </span>
      {user ? <UserDropdown user={user} /> : <LoginButton />}
    </header>
  )
}
export default Radium(Header)