import React from 'react'
import Radium from 'radium'
import coffeeCup from '../assets/images/coffee-cup.png'
import c from '../constants'

const styles = {
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '.5em 0',
    borderBottom: '1px solid darkgrey',
    [`@media all and (min-width: ${c.breakPoints.sm})`]: {
      padding: '1em 0'
    }
  },
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  company: {
    fontSize: '1.1em',
    fontFamily: 'Pacifico',
    display: 'inline',
    [`@media all and (min-width: ${c.breakPoints.sm})`]: {
      fontSize: '2em'
    }
  },
  image: {
    width: '2em',
    marginRight: '0.5em',
    [`@media all and (min-width: ${c.breakPoints.sm})`]: {
      width: '4em'
    }
  }
}

const LoginButton = () => (
  <button>Login</button> 
)

const UserDropdown = ({user}) => {
  const firstName = user.name.split(" ")[0]
  return (
    <span>{firstName}</span>
  )
}

const Header = ({user}) => {
  return (
    <header style={styles.header}>
      <span style={styles.wrapper}>
        <img
          src={coffeeCup}
          alt="logo, sketch of steaming cup of coffee, black on white background"
          style={styles.image}
          />
        <span style={styles.company}>Kadoop</span>
      </span>
      {user ? <UserDropdown user={user} /> : <LoginButton />}
    </header>
  )
}
export default Radium(Header)