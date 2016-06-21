import {Page, NavController, Loading, ViewController} from "ionic-angular";

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
    this.authInfo = {
      user: null,
      pass: null
    };

    this.invalidLogin = false;
  }

  login() {

    if (this.authInfo.user && this.authInfo.pass) {

      if (this.authInfo.user == 'matheus.paiva') {
        let loading = Loading.create({
          content: "Autenticando..."
        });

        loading.onDismiss(() => {
          this.viewCtrl.dismiss();
        });

        this.nav.present(loading);

        setTimeout(() => {
          Storage.saveAuthInfo(this.authInfo);
          loading.dismiss();
        }, 3000);
      } else {
        this.invalidLogin = true;
      }
    }
  }
}
