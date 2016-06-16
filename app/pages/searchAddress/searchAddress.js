import {Page, NavController} from "ionic-angular";

@Page({
  templateUrl: 'build/pages/searchAddress/searchAddress.html'
})
export class SearchAddress {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;

    // Search location query
    this.searchQuery;

    // Locations list
    this.locations = [];
  }

  getItems(searchbar) {
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    if (q.length > 3) {
      this.getLocations(q);
    }
  }

  getLocations(query) {
    var xhr = new XMLHttpRequest();
    var me = this;

    xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${query.replace(' ', '+')}`);

    xhr.onreadystatechange = function(e) {

      if (this.readyState == 4 && this.status == 200) {
        var resp = JSON.parse(this.responseText);

        if (resp.status == 'OK') {
          me.locations = resp.results;
        }
      }
    };

    xhr.send();
  }

  saveLocation(location) {
    this.nav.pop();
  }
}
