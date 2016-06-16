import {Page, Toast, NavController} from 'ionic-angular';
import {SearchAddress} from '../searchAddress/searchAddress';

@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;

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
  }

  toggleNotificationRole(hideRole) {
    this.notificationRole[hideRole] = !this.notificationRole[hideRole];
  }

  saveConfigs() {
    const toast = Toast.create({
      message: 'Configurações salvas com sucesso',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });

    this.nav.present(toast);
  }

  openSearchAddressPage() {
    this.nav.push(SearchAddress);
  }
}
