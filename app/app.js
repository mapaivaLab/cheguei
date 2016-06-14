import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {Homepage} from './pages/homepage/homepage';
import {SettingsPage} from './pages/settings/settings';
import {VisitReportList} from './pages/visit-report-list/visit-report-list';


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

  constructor(platform, menu) {
    this.platform = platform;
    this.menu = menu;
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

    // make HelloIonicPage the root (or first) page
    this.rootPage = Homepage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
