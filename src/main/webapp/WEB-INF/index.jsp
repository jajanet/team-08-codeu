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
    <meta charset="UTF-8" />
    <title>CodeU 2019 Team 8 Project</title>
    <link rel="stylesheet" href="/css/main.css" />
    <script src="/js/navigation-loader.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=<%= request.getAttribute("MAPS_API_KEY") %>"></script>
    <script src="/js/index.js"></script>
  </head>
  <body onload="addLoginOrLogoutLinkToNavigation(), createMap();">
    <nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/aboutus.html">About Our Team</a></li>
      </ul>
    </nav>
    <h1>Hello Google Maps</h1>
    <div id="map"></div>
    <p>This page shows a Google Map!</p>
  </body>
  <style>
    #map {
      width: 500px;
      height: 500px;
      border: thin solid black;
    }
  </style>
</html>