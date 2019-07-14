import React from "react";
import ReactDOM from "react-dom";

function addLocation(){
  const [messages, setMessages] = React.useState([]);
  React.useEffect(fetchLocation, []);

  // Fetch messages and add them to the page.
  function fetchLocation() {
    const url = "/api/add-location-loader";
    fetch(url)
      .then(response => response.json())
      .then(messages => setMessages(messages))
      .catch(error => console.log(error.message));
  }

}