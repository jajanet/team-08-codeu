/**
 * Creates navigation depending on whether user is logged in or not
 */

import React, { useState, useEffect } from 'react';

function Navigation() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => fetch("/login-status")
    .then(response => response.json())
    .then(loginStatus => {
      setLoggedIn(loginStatus.isLoggedIn);
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
        { loggedIn
        ? <React.Fragment>
          <NavLink url={"/user-page.html?user=" + user} text="Your Page" />
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