/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.data;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;


/** Class that maps tag-place relationships. */
public class PlaceTag {

  private Key place;
  private Key tag;

  /**
   * Constructs a new {@link PlaceTag} posted using only references to a tag and place
   */
  public PlaceTag(Key place, Key tag) {
    this(place);
    this(tag);
  }


  /**
   * Constructs a new {@link PlaceTag} using a place and the tag
   */
  public PlaceTag(Place place, Tag tag) {
    this(place.getId());
    this(tag.getLabel());
    // would PlaceTag(place.getId(), tag.getLabel()) work too,
    // as in using the constructor above? 
  }
  
  /** Return PlaceTag data using based on entity from search query. */
  public PlaceTag(Entity entity) {
    // create key based on the string returned from getting the place and tag
    this.place = KeyFactory.createKey("Place", entity.getProperty("place"))
    this.tag = KeyFactory.createKey("Tag", entity.getProperty("tag"));
  }

  public Key getPlace() {
    return place;
  }

  public Key getTag() {
    return tag;
  }


}
