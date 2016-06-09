import {Page} from "ionic-angular";

@Page({
  templateUrl: 'build/pages/newReport/newReport.html'
})
export class NewReport {
  constructor() {
    this.selectedItem = false;
  }
}
