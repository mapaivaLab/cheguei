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

  toggleWeakDay(ev, day) {
    let btn = ev.target.parentNode;

    if (btn.className.indexOf('button-clear') > -1) {
      btn.setAttribute('class', btn.className.replace('button-clear-secondary', 'button-secondary')
        .replace('button-clear', 'button-default'));
      btn.removeAttribute('clear');
    } else {
      btn.setAttribute('class', btn.className.replace('button-secondary', 'button-clear-secondary')
      .replace('button-default', 'button-clear'));
      btn.setAttribute('clear', 'true');
    }
  }
}
