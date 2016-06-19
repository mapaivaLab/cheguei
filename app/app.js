import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Alert, Modal} from 'ionic-angular';
import {StatusBar, Geolocation, Vibration} from 'ionic-native';

import {AppStorage} from './core/appStorage';

import {Homepage} from './pages/homepage/homepage';
import {SettingsPage} from './pages/settings/settings';
import {VisitReportList} from './pages/visit-report-list/visit-report-list';
import {LoginPage} from './pages/login/login';

// Global variables
window.Storage = new AppStorage();
window.CONFIGS = Storage.getConfigs();
window.VisitsReportDrafts = Storage.getVisitsReportDrafts();

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
        let loginModal = Modal.create(LoginPage);

        this.nav.present(loginModal);

        loginModal.onDismiss(() => {
          this.rootPage = Homepage;
        });
      }

      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  watchLocation() {
    // Starts Geolocation watcher
    let watch = Geolocation.watchPosition();

    // Notification Flag
    let canNotificate = true;

    watch.subscribe((data) => {
      console.log(data.coords);

      if (data.coords.latitude < -22 && data.coords.longitude < -45 && canNotificate) {
        // this.doConfirm();

        canNotificate = false;
      }
    });
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
}

ionicBootstrap(MyApp);
