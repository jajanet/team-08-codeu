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

/** A tag, which can map to many different places. */
public class Tag {

  private String label;
  private Set<Key> taggedPlaces

  /**
   * Constructs a new {@link Tag} posted using only a label
   */
  public Tag(String label) {
    this(label);
  }

  /**
   * Constructs a new {@link Tag} with place added
   */
  public Tag(String label, Place place) {
    this(label);
    this.addPlaceToTag(place);
  }
  
   /**
   * Constructs a new {@link Tag} while tagging a set of places to it
   */
  public Tag(String label, Set<Place> places) {
    this(label);
    for (Place place : places) {
      this.addPlaceToTag(place);
    }
  }
  
  /** Return Tag data using based on entity from search query. */
  public Tag(Entity entity) {
    this.label = (String)entity.getProperty("label");
    this.taggedPlaces = new HashSet<Key>(entity.getProperty("taggedPlaces"));
  }

  public String getLabel() {
    return label;
  }

  public Set<Key> getTaggedPlaces() {
    return taggedPlaces;
  }

  public void addPlaceToTag(Place place) {
    taggedPlaces.add(place.getKey());
  }

  public void removePlaceFromTag(Place place) {
    taggedPlaces.remove(place.getKey());
  }

}
