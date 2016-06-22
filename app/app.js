import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Alert, Modal} from 'ionic-angular';
import {StatusBar, Geolocation, Vibration} from 'ionic-native';

import {AppStorage} from './core/appStorage';

import {Homepage} from './pages/homepage/homepage';
import {SettingsPage} from './pages/settings/settings';
import {VisitReportList} from './pages/visit-report-list/visit-report-list';
import {LoginPage} from './pages/login/login';

import {LocalNotifications} from 'ionic-native';

// Global variables
window.Storage = new AppStorage();
window.CONFIGS = Storage.getConfigs();
window.VisitsReportDrafts = Storage.getVisitsReportDrafts();

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

/**
 * @private
 * Returns a distance difference between two lat, logn coordinates in meters
 * @return {Number}
*/
function distance(lon1, lat1, lon2, lat2) {
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

@Component({
  templateUrl: 'build/app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
class MyApp {
  static get parameters() {
    return [[Platform], [MenuController]];
  }

  constructor(platform, menu, nav) {
    this.platform = platform;
    this.menu = menu;
    this.nav = nav;

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Resumo', component: Homepage, icon: 'paper' },
      { title: 'Reembolsos', component: VisitReportList, icon: 'grid' }
      // { title: 'Cheguei com música', component: null, icon: 'headset' }
    ];

    this.bottomPages = [
      { title: 'Configurações', component: SettingsPage, icon: 'settings' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let authInfo = Storage.getAuthInfo();

      if (authInfo.user) {
        this.rootPage = Homepage;

        this.watchLocation();
      } else {
        this.showLoginModal();
      }

      StatusBar.styleDefault();
    });
  }

  showLoginModal() {
    let loginModal = Modal.create(LoginPage);

    this.nav.present(loginModal);

    loginModal.onDismiss(() => {
      this.rootPage = Homepage;
    });
  }

  logout() {
    Storage.saveAuthInfo({ user: null, pass: null });

    this.menu.close();
    this.showLoginModal();
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  watchLocation() {

    if (CONFIGS.notificationRole.geolocalization && CONFIGS.notificationRole.geolocConfig.lat
        && CONFIGS.notificationRole.geolocConfig.lng) {
      // Start Geolocation watcher
      let watch = Geolocation.watchPosition();

      // Notification Flag
      let canNotificate = true;

      watch.subscribe((data) => {
        let dDistance = distance(CONFIGS.notificationRole.geolocConfig.lng, CONFIGS.notificationRole.geolocConfig.lat,
          data.coords.longitude, data.coords.latitude);

        console.log(data.coords);
        console.log('Distance', dDistance);

        if (dDistance < data.coords.accuracy && canNotificate) {
          this.notificationTest();

          canNotificate = false;
        }
      });
    } else {
      console.log('No geolocConfig set');
    }
  }

  doConfirm() {
    Vibration.vibrate(500);

    let confirm = Alert.create({
      title: 'Chegando?',
      message: 'Chegando em casa Jhow?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });

    this.nav.present(confirm);
  }

  notificationTest() {
    // Schedule a single notification
    LocalNotifications.schedule({
      id: 1,
      text: "Oloko bixu",
      at: new Date(new Date().getTime() + 10),
      led: "FF0000",
      icon: "http://i.imgur.com/nL1nDYI.gif?1",
      data: { secret: '123 Bamos a la praia' }
    });
  }
}

ionicBootstrap(MyApp);
