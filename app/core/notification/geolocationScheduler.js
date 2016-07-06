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

    if (CONFIGS.notificationRole.geolocConfig.lat && CONFIGS.notificationRole.geolocConfig.lng) {
      let watch = Geolocation.watchPosition();

      watch.subscribe((data) => {
        let tLNow = this.dailyAlert.getTimeLimitFromNow();

        switch (tLNow) {
          case this.dailyAlert.TimeLimitList.MOURNING:
          case this.dailyAlert.TimeLimitList.PRE_MOURNING:

            if (this.dailyAlert.canNotify(true)) {

              if (this.amIInTheSavedPlace(data) && !this.dailyAlert.dailyDraft.mourningNotification) {
                this.dailyAlert.popMourningNotification();
              } else if (this.dailyAlert.getNowDuration().asHours() >= 11
                && !this.dailyAlert.dailyDraft.lunchNotification) {
                this.dailyAlert.popLunchNotification();
              }
            }
            break;
          case this.dailyAlert.TimeLimitList.LUNCH:

            if (!this.amIInTheSavedPlace(data) && this.dailyAlert.canNotify(true)
              && !this.dailyAlert.dailyDraft.lunchNotification) {
              this.dailyAlert.popLunchNotification();
            }
            break;
          case this.dailyAlert.TimeLimitList.BACK_LUNCH:

            if (this.amIInTheSavedPlace(data) && this.dailyAlert.canNotify(true)
              && !this.dailyAlert.dailyDraft.backLaunchNotification) {
              this.dailyAlert.popBackLunchNotification();
            }
            break;
          case this.dailyAlert.TimeLimitList.OUT:

            if (!this.amIInTheSavedPlace(data) && this.dailyAlert.canNotify(true)
              && !this.dailyAlert.dailyDraft.outNotification) {
              this.dailyAlert.popOutNotification();
            }
            break;
        }
      });
    } else {
      console.warn('[WARN] No geolocConfig set');
    }
  }

  amIInTheSavedPlace(data) {
    let dDistance = this.getDistance(CONFIGS.notificationRole.geolocConfig.lng,
      CONFIGS.notificationRole.geolocConfig.lat,
      data.coords.longitude, data.coords.latitude);

    // console.log(data.coords);
    console.log('Distance', dDistance);
    console.log(CONFIGS.notificationRole.geolocConfig);

    if (Math.floor(dDistance) < data.coords.accuracy) {
      return true;
    } else {
      return false;
    }
  }

  stop() {
    this.dailyAlert.stop();
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
}
