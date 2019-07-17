/**
 * Creates navigation depending on whether user is logged in or not
 */

import React, { useState, useEffect } from 'react';

function Navigation() {
  const [username, setUsername] = useState(null");

  useEffect(() => fetch("/login-status")
    .then(response => response.json())
    .then(loginStatus => {
      setUser(loginStatus.username);
    })
    .catch(e => console.log(e)),
    []
  );

  return (
    <nav>
      <ul id="navigation">
        <NavLink url="/" text="Home" />
        <NavLink url="/aboutus.html" text="About Our Team" />
        { username !== null
        ? <React.Fragment>
          <NavLink url={"/user-page.html?user=" + username} text="Your Page" />
          <NavLink url="/community.html" text="Community" />
          <NavLink url="/logout" text="Logout" />
        </React.Fragment>
        : <NavLink url="/login" text="Login" />      
        }
      </ul>
    </nav>
  )
}

function NavLink({url, text}) {
  return <li><a href={url}>{text}</a></li>
}

export default Navigation;
