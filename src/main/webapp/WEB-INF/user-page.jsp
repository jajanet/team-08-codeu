<!--
Copyright 2019 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<!DOCTYPE html>
<html>
  <head>
    <title>User Page</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/user-page.css" />
    <script src="https://maps.googleapis.com/maps/api/js?key=<%= request.getAttribute("MAPS_API_KEY") %>&libraries=places"></script>
    <script src="<%= request.getAttribute("SERVER_ROOT") %>user_page.js"></script>
  </head>

  <style>
    #map {
      width: 500px;
      height: 500px;
      border: thin solid black;
    }
    #infowindow-content {
        display: none;
      }

      #map #infowindow-content {
        display: inline;
      }
      .pac-card {
        margin: 10px 10px 0 0;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
        font-family: Roboto;
      }
    #pac-container {
        padding-bottom: 12px;
        margin-right: 12px;
      }

      .pac-controls {
        display: inline-block;
        padding: 5px 11px;
      }

      .pac-controls label {
        font-family: Roboto;
        font-size: 13px;
        font-weight: 300;
      }

      #pac-input {
        background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 400px;
      }

      #pac-input:focus {
        border-color: #4d90fe;
      }
  </style>
  
  <body onload="buildUI();">
    <nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/aboutus.html">About Our Team</a></li>
      </ul>
    </nav>
    <h1 id="page-title">User Page</h1>

    <input id="pac-input" class="controls" type="text" placeholder="Search Box">
    <div id="map"></div>
    <div id="PinList"></div>
    <div id="about-me-container">Loading...</div>
    <div id="about-me-form" class="hidden">
      <form action="/about" method="POST">
        <textarea
          name="about-me"
          placeholder="about me"
          rows="4"
          required
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>

    <form
      id="message-form"
      method="POST"
      class="hidden"
      enctype="multipart/form-data"
    >
      Enter a new message:
      <br />
      <textarea name="message" id="message-input"></textarea>
      <br />
      <p>Upload an image:</p>
      <input type="file" name="image" />
      <br /><br />
      <input type="submit" value="Submit" />
    </form>
    <hr />
    <div id="message-container">Loading...</div>
  </body>
</html>
