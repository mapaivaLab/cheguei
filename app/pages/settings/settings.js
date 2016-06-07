import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
  constructor() {
    this.notificationRole = {
      geolocalization: true,
      hour: false
    };

    this.hourConfig = {
      arriveTime: '08:00',
      launchTime: '12:00',
      backLaunchTime: '13:00',
      endDayTime: '17:30'
    };

    this.toggleNotificationRole = function(hideRole) {
      this.notificationRole[hideRole] = !this.notificationRole[hideRole];
    };
  }
}
