import {Page, NavController, Alert, NavParams, Toast, Loading} from "ionic-angular";

import moment from 'moment';

@Page({
  templateUrl: 'build/pages/approveReport/approveReport.html'
})
export class ApproveReport {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.approveDate = moment().format('YYYY-MM-DD');

    console.log(navParams);
  }

  approveReport() {
    console.log("Aprovar relatório");

    this.nav.pop();
  }
}
