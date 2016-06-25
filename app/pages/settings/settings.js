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

    this.notificationRole = CONFIGS.notificationRole;
    this.defaultValues = CONFIGS.defaultValues;
  }

  toggleNotificationRole(hideRole) {
    this.notificationRole[hideRole] = !this.notificationRole[hideRole];
  }

  saveConfigs() {
    Storage.saveConfigs(CONFIGS);

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

  toggleWeekDay(weekDay) {
    weekDay.checked = !weekDay.checked;
  }

  getWeekButtonState(weekDay) {

    if (!weekDay.checked) {
      return 'clear';
    }
  }
}
