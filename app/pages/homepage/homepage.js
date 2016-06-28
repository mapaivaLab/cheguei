import {Page, NavController, Alert, Toast} from 'ionic-angular';
import {NewReport} from '../newReport/newReport';

import {Draft} from '../../core/draft';
import {Http} from '../../core/http';

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
    this.http = new Http();

    this.getVisitReports();

    // Fill consolidated fields
    this.mileage = 0;
    this.productiveHours = 0;
    this.total = 0;
    this.totalHours = 0;

    // Fill repots lists
    this.visitsReportDrafts = VisitsReportDrafts;

    this.visitsReport = [];
  }

  getVisitReports() {
    let authInfo = Storage.getAuthInfo();
    let params = new Map();

    params.set('user', authInfo.user);
    params.set('month', `${this.getMonth()}/${moment().year()}`);

    this.http.get('crm.visitsReport/getVisitsReport', {
      params: params,
      needAuth: true,
      handler: (resp, err) => {

        if (err) {
          const failureToast = Toast.create({
            message: `Erro buscando reembolsos. ${err.message}`,
            duration: 5000,
            showCloseButton: true,
            closeButtonText: 'Ok'
          });

          this.nav.present(failureToast);
        } else {
          // Fill consolidated fields
          this.mileage = parseFloat(resp.mileage).toFixed(2);
          this.productiveHours = parseFloat(resp.productiveHours).toFixed(2);
          this.total = parseFloat(resp.total).toFixed(2);
          this.totalHours = parseFloat(resp.totalHours).toFixed(2);

          this.visitsReport = resp.visitsReport;
        }

        this.refreshing = false;
      }
    });

    this.getMonth();
  }

  getMonth() {
    let monthNum = moment().month();

    switch (monthNum) {
      case 0:
        return 'Janeiro';
      case 1:
        return 'Fevereiro';
      case 2:
        return 'Março';
      case 3:
        return 'Abril';
      case 4:
        return 'Maio';
      case 5:
        return 'Junho';
      case 6:
        return 'Julho';
      case 7:
        return 'Agosto';
      case 8:
        return 'Setembro';
      case 9:
        return 'Outubro';
      case 10:
        return 'Novembro';
      case 11:
        return 'Dezembro';
      default:
        return '';
    }
  }

  sumReportCost(report) {
    let amount = 0;

    if (report.outrosGastos) {
      amount += parseFloat(report.outrosGastos);
    }

    if (report.refeicao) {
      amount += parseFloat(report.refeicao);
    }

    return amount.toFixed(2);
  }

  prettifyDate(date) {
    return moment(date).format('DD/MM/YYYY');
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

      console.log(bkpReport);

      savingToast.destroy();
    }, 3000);
  }
}
