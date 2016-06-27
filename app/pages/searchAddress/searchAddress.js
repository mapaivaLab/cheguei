import {Page, NavController} from "ionic-angular";
import {Http} from '../../core/http';

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

    this.http = new Http();
  }

  getItems(searchbar) {
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    if (q.length > 4) {
      this.getLocations(q);
    }
  }

  getLocations(query) {
    let params = new Map();

    params.set('address', query.replace(' ', '+'));

    this.http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: params,
      useServerURL: false,
      handler: (resp) => {

        if (resp.status == 'OK') {
          this.locations = resp.results;
        }
      }
    });
  }

  saveLocation(location) {
    CONFIGS.notificationRole.geolocConfig.address = location.formatted_address;
    CONFIGS.notificationRole.geolocConfig.lat = location.geometry.location.lat;
    CONFIGS.notificationRole.geolocConfig.lng = location.geometry.location.lng;

    this.nav.pop();
  }
}
