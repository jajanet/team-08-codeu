import { createMap, PinList } from "./home.js";
import React from "react";
import ReactDOM from "react-dom";

// Get ?user=XYZ parameter value
const urlParams = new URLSearchParams(window.location.search);
const parameterUsername = urlParams.get("user");

// URL must include ?user=XYZ parameter. If not, redirect to homepage.
if (!parameterUsername) {
  window.location.replace("/");
}

/** Sets the page title based on the URL parameter username. */
function setPageTitle() {
  document.getElementById("page-title").innerText = parameterUsername;
  document.title = parameterUsername + " - User Page";
}

/**
 * Shows the message form if the user is logged in and viewing their own page.
 */
function showMessageFormIfViewingSelf() {
  fetch("/login-status")
    .then(response => {
      return response.json();
    })
    .then(loginStatus => {
      if (loginStatus.isLoggedIn && loginStatus.username == parameterUsername) {
        const messageForm = document.getElementById("message-form");
        messageForm.classList.remove("hidden");
        document.getElementById("about-me-form").classList.remove("hidden");
      }
    });
}

/** Fetches messages and add them to the page. */
function fetchMessages() {
  const url = "/messages?user=" + parameterUsername;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(messages => {
      const messagesContainer = document.getElementById("message-container");
      if (messages.length == 0) {
        messagesContainer.innerHTML = "<p>This user has no posts yet.</p>";
      } else {
        messagesContainer.innerHTML = "";
      }
      messages.forEach(message => {
        const messageDiv = buildMessageDiv(message);
        messagesContainer.appendChild(messageDiv);
      });
    });
}

/**
 * Builds an element that displays the message.
 * @param {Message} message
 * @return {Element}
 */
function buildMessageDiv(message) {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("message-header");
  headerDiv.appendChild(
    document.createTextNode(message.user + " - " + new Date(message.timestamp))
  );

  const bodyDiv = document.createElement("div");
  bodyDiv.classList.add("message-body");
  bodyDiv.innerHTML = message.text;

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message-div");
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);

  return messageDiv;
}

/** Fetches data and populates the UI of the page. */
window.buildUI = function buildUI() {
  setPageTitle();
  showMessageFormIfViewingSelf();
  fetchMessages();
  fetchAboutMe();
  fetchBlobstoreUrlAndShowForm();
  fetchPlaces().then(rows => {
    const map = createMap(rows);
    buildSearchBar(map);
    const rootElement = document.getElementById("PinList");
    ReactDOM.render(<PinList rows={rows} />, rootElement);
  });
};

function fetchAboutMe() {
  const url = "/about?user=" + parameterUsername;
  fetch(url)
    .then(response => {
      return response.text();
    })
    .then(aboutMe => {
      const aboutMeContainer = document.getElementById("about-me-container");
      if (aboutMe == "") {
        aboutMe = "This user has not entered any information yet.";
      }
      aboutMeContainer.innerHTML = aboutMe;
    });
}

function fetchBlobstoreUrlAndShowForm() {
  fetch("/api/blobstore-upload-url")
    .then(response => {
      return response.text();
    })
    .then(imageUploadUrl => {
      const messageForm = document.getElementById("message-form");
      messageForm.action = imageUploadUrl;
      messageForm.classList.remove("hidden");
    });
}

function fetchPlaces() {
  return fetch("/api/place?user=" + parameterUsername)
    .then(response => {
      return response.json();
    })
}

function buildSearchBar(map) {

  // Create the search box and link it to the UI element.
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.Autocomplete(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });

  var marker = null;
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("place_changed", function() {
    var place = searchBox.getPlace();
    console.log(place.geometry.location.lat(),place.geometry.location.lng());

    // Clear out the old markers.
    if(marker != null) {
      marker.setMap(null);
    };
    marker = null;

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      marker =
        new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    map.fitBounds(bounds);
  });
}
