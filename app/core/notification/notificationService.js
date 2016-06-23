import {GeolocationScheduler} from './geolocationScheduler';

export class NotificationService {

  constructor(nav) {
    this.nav = nav;
    this.started = false;
    this.scheduler = null;
  }

  start() {

    if (CONFIGS.notificationRole.geolocalization) {
      console.log('[INFO] Starting notification method by geolocation');

      this.scheduler = new GeolocationScheduler(this.nav);
      this.started = true;
    } else if (CONFIGS.notificationRole.hour) {
      console.log('[INFO] Starting notification method by hours');
      this.started = true;
    } else {
      console.warn('[WARN] No notification method defined');
    }

    if (this.scheduler) {
      this.scheduler.start();
    }
  }
}
