import {Page, NavController, Alert, Toast} from 'ionic-angular';
import {NewReport} from '../newReport/newReport';

import {Draft} from '../../core/draft';
import {Report} from '../../core/report';

import moment from 'moment';

@Page({
  templateUrl: 'build/pages/homepage/homepage.html'
})
export class Homepage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.refreshing = true;

    this.visitsReport = [];
    this.mileage = 0;
    this.productiveHours = 0;
    this.total = 0;
    this.totalHours = 0;

    this.visitsReportDrafts = VisitsReportDrafts;

    this.getVisitReports();
  }

  getVisitReports() {
    Report.getReportInfo((reportInfo) => {
      this.visitsReport = reportInfo.visitsReport;
      this.mileage = parseFloat(reportInfo.mileage).toFixed(2);
      this.productiveHours = parseFloat(reportInfo.productiveHours).toFixed(2);
      this.total = parseFloat(reportInfo.total).toFixed(2);
      this.totalHours = parseFloat(reportInfo.totalHours).toFixed(2);

      this.refreshing = false;
    });
  }

  getTotalValue() {
    if (this.total && this.total != "NaN") {
      return this.total;
    } else {
      return 0;
    }
  }

  sumReportCost(report) {
    return Report.sumReportCost(report);
  }

  prettifyDate(date) {
    return Report.prettifyDate(date);
  }

  openNewReportPage(params) {
    this.nav.push(NewReport, params);
  }

  openEditPage(report) {
    this.openNewReportPage({ report: report });
  }

  // Drafts

  deleteDraft(report) {
    let alert = Alert.create({
      title: 'Deletar rascunho',
      message: "Tem certeza que deseja deletar o rascunho?",
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Sim',
          handler: data => {
            Draft.deleteDraft(report);
          }
        }
      ]
    });

    this.nav.present(alert);
  }

  saveDraft(report) {
    const savingToast = Toast.create({
      message: 'Salvando reembolso...',
    });

    this.nav.present(savingToast);

    let bkpReport = report;

    Draft.deleteDraft(report);

    setTimeout(() => {
      savingToast.dismiss();

      const successToast = Toast.create({
        message: 'Reembolso salvo com sucesso',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });

      this.nav.present(successToast);

      savingToast.destroy();
    }, 3000);
  }
}
