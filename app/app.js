import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Modal} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {AppStorage} from './core/appStorage';
import {NotificationService} from './core/notification/notificationService';

import {Homepage} from './pages/homepage/homepage';
import {SettingsPage} from './pages/settings/settings';
import {VisitReportList} from './pages/visit-report-list/visit-report-list';
import {LoginPage} from './pages/login/login';

import {Http} from './core/http';

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
        this.notiService = new NotificationService(this.nav);

        this.notiService.start();
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
      this.notiService = new NotificationService(this.nav);

      this.notiService.start();
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
}

ionicBootstrap(MyApp, null, {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
    'Outubro', 'Novembro', 'Dezembro'
  ],
  monthShortNames: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set',
    'Out', 'Nov', 'Dez'
  ],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sábado'],
  dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Quin', 'Sex', 'Sab']
});
