import {Page, NavController} from "ionic-angular";

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
  }
}
