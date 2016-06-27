import {Page, NavController, Loading, ViewController} from "ionic-angular";

import {Http} from '../../core/http';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [ViewController]];
  }

  constructor(nav, viewCtrl) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
    this.http = new Http();
    this.authInfo = {
      user: null,
      pass: null
    };

    this.invalidLoginMsg = null;
  }

  login() {

    if (this.authInfo.user && this.authInfo.pass) {
      let authenticated = false;
      let loading = Loading.create({
        content: "Autenticando..."
      });

      loading.onDismiss(() => {

        if (authenticated) {
          this.viewCtrl.dismiss();
        }
      });

      this.nav.present(loading);

      let params = new Map();

      params.set('userName', this.authInfo.user);
      params.set('password', this.authInfo.pass);

      this.http.get('core.sec.auth/logon', {
        params: params,
        handler: (resp, err) => {

          if (!err) {
            authenticated = true;
            Storage.saveAuthInfo(this.authInfo);
          } else {
            this.invalidLoginMsg = err.message;
          }

          loading.dismiss();
        }
      });
    }
  }
}
