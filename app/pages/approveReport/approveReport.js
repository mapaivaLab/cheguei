import {Page, NavController, Alert, NavParams, Toast, Loading} from "ionic-angular";

import * as dateformatAll from 'dateformat';

@Page({
  templateUrl: 'build/pages/approveReport/approveReport.html'
})
export class ApproveReport {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;

    let dateformat = dateformatAll.default;

    this.approveDate = dateformat(new Date(), 'yyyy-mm-dd');

    console.log(navParams);
  }

  approveReport() {
    console.log("Aprovar relatório");

    this.nav.pop();
  }
}
