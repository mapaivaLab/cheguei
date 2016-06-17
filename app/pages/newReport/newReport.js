import {Page, NavController} from "ionic-angular";
import * as dateformatAll from 'dateformat';

@Page({
  templateUrl: 'build/pages/newReport/newReport.html'
})
export class NewReport {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.selectedItem = false;

    let dateformat = dateformatAll.default;

    this.newReport = {
      description: CONFIGS.defaultValues.reportDescription,
      date: dateformat(new Date(), 'yyyy-mm-dd'),
      meal: CONFIGS.defaultValues.launchPrice,
      othersExpenses: CONFIGS.defaultValues.transportPrice
    };
  }
}
