import {Alert} from 'ionic-angular';
import {Geolocation, LocalNotifications} from 'ionic-native';

import {DailyAlert} from './dailyAlert';

/**
  * Workaround if "Number" doesn't have the "toRad" method.
 * Converts numeric degrees to radians
*/
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

export class GeolocationScheduler {

  constructor(nav) {
    this.nav = nav;
    this.dailyAlert = new DailyAlert(this.nav);
  }

  /**
   * {SchedulerInterface} start method
  */
  start() {
    this.dailyAlert.alert();

    if (CONFIGS.notificationRole.geolocConfig.lat && CONFIGS.notificationRole.geolocConfig.lng) {
      let watch = Geolocation.watchPosition();

      // Notification Flag
      let canNotificate = true;

      watch.subscribe((data) => {
        let dDistance = this.getDistance(CONFIGS.notificationRole.geolocConfig.lng, CONFIGS.notificationRole.geolocConfig.lat,
          data.coords.longitude, data.coords.latitude);

        console.log(data.coords);
        console.log('Distance', dDistance);

        if (dDistance < data.coords.accuracy && canNotificate) {
          this.popTestNotification();

          canNotificate = false;
        }
      });
    } else {
      console.warn('[WARN] No geolocConfig set');
    }
  }

  /**
   * Returns a distance difference between two lat, logn coordinates in meters
   * @return {Number}
  */
  getDistance(lon1, lat1, lon2, lat2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2-lat1).toRad();
    const dLon = (lon2-lon1).toRad();

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km

    return d * 1000;
  }

  popTestNotification() {
    LocalNotifications.schedule({
      id: 1,
      text: "Oloko bixu",
      at: new Date(),
      led: "FF0000",
      icon: "http://i.imgur.com/nL1nDYI.gif",
      data: { secret: '123 Bamos a la praia' }
    });

    LocalNotifications.on('click', (notification) => {
      this.doConfirm(notification);
    });
  }
}
