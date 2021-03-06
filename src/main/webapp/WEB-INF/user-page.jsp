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
    <script src="/js/navigation-loader.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=<%= request.getAttribute("MAPS_API_KEY") %>"></script>
    <script src="<%= request.getAttribute("SERVER_ROOT") %>user_page.js"></script>
  </head>
  <style>
    #map {
      width: 500px;
      height: 500px;
      border: thin solid black;
    }
  </style>
  <body onload="buildUI(); addLoginOrLogoutLinkToNavigation();">
    <nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/aboutus.html">About Our Team</a></li>
      </ul>
    </nav>
    <h1 id="page-title">User Page</h1>

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
