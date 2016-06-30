import {Page, NavController, ActionSheet, Alert, Toast} from 'ionic-angular';
import {NewReport} from '../newReport/newReport';
import {ApproveReport} from '../approveReport/approveReport';

import {Draft} from '../../core/draft';
import {Http} from '../../core/http';

import moment from 'moment';

import {LongPressDirective} from '../../directives/longPress';

@Page({
  templateUrl: 'build/pages/visit-report-list/visit-report-list.html',
  directives: [LongPressDirective]
})
export class VisitReportList {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.http = new Http();

    this.selectedReportsCount = 0;

    this.monthList = [];
    this.clientList = [];
    this.userList = [];

    this.month = null;
    this.user = null;
    this.client = null;

    this.visitsReportDrafts = VisitsReportDrafts;

    this.visitsReport = [];

    this.getVisitReports();
  }

  onMonthChange() {
    console.log('Oloko');
    this.getVisitsReport();
  }

  getVisitReports() {
    let authInfo = Storage.getAuthInfo();
    let params = new Map();

    params.set('user', authInfo.user);

    if (this.month) {
      params.set('month', this.month);
    } else {
      params.set('month', `${this.getMonth()}/${moment().year()}`);
    }

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

          this.monthList = resp.monthList || [];
          this.clientList = resp.clientList || [];
          this.userList = resp.userList || [];
          this.visitsReport = resp.visitsReport || [];

          if (this.monthList.length > 0 && this.userList instanceof Array) {
            this.month = this.monthList[0];
          }

          if (this.clientList.length > 0 && this.userList instanceof Array) {
            this.client = this.clientList[0];
          }

          if (this.userList.length > 0 && this.userList instanceof Array) {
            this.user = this.clientList[0];
          }
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

  prettifyDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }

  pressReport(report) {
    this.toggleReport(report);
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

  openNewReportPage(params) {
    this.nav.push(NewReport, params);
  }

  openEditPage(report) {

    if (report.selected) {
      this.toggleReport(report);
    } else if (this.isAnyReportSelected()) {
      this.toggleReport(report);
    } else {
      this.openNewReportPage({ report: report });
    }
  }

  openEditDraft(report) {
    this.openNewReportPage({ report: report });
  }

  toggleReport(report) {

    if (report.selected) {
      report.selected = false;

      this.selectedReportsCount--;
    } else {
      report.selected = true;

      this.selectedReportsCount++;
    }
  }

  isAnyReportSelected() {
    return this.selectedReportsCount > 0;
  }

  presentActionList() {
    let buttons = [
      {
        text: 'Selecionar todos',
        handler: () => {
          this.selectAll();
        }
      },
    ];

    if (this.isAnyReportSelected()) {
      buttons.push({
        text: 'Desmarcar todos',
        handler: () => {
          this.deselectAll();
        }
      });
    }

    let actionSheet = ActionSheet.create({
      cssClass: 'action-sheets-basic-page',
      buttons: buttons
    });

    this.nav.present(actionSheet);
  }

  selectAll() {
    for (let i = 0; i < this.visitsReport.length; i++) {

      if (!this.visitsReport[i].selected) {
        this.toggleReport(this.visitsReport[i]);
      }
    }
  }

  deselectAll() {
    for (let i = 0; i < this.visitsReport.length; i++) {

      if (this.visitsReport[i].selected ) {
        this.toggleReport(this.visitsReport[i]);
      }
    }
  }

  deleteReports() {
    let alert = Alert.create({
      title: 'Deletar reembolsos',
      message: "Tem certeza que deseja deletar os reembolsos?",
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Sim',
          handler: data => {
            console.log('Sim clicado');
            this.deselectAll();
          }
        }
      ]
    });

    this.nav.present(alert);
  }

  openApproveReportsPage() {
    let params = {
      reports: []
    };

    for (let i = 0; i < this.visitsReport.length; i++) {

      if (this.visitsReport[i].selected) {
        params.reports.push(this.visitsReport[i]);
      }
    }

    this.nav.push(ApproveReport, params);
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

  // saveDraft(report) {
  //   const savingToast = Toast.create({
  //     message: 'Salvando reembolso...',
  //   });
  //
  //   this.nav.present(savingToast);
  //
  //   let bkpReport = report;
  //
  //   Draft.deleteDraft(report);
  //
  //   this.http.post('crm.visitsReport/saveVisitReport',  {
  //     params: new Map(),
  //     needAuth: true,
  //     data: report,
  //     handler: (resp, err) => {
  //       savingToast.dismiss();
  //
  //       if (err) {
  //         const errorToast = Toast.create({
  //           message: `Erro ao salvar relatório. ${err.message}`,
  //           duration: 5000,
  //           showCloseButton: true,
  //           closeButtonText: 'Ok'
  //         });
  //
  //         this.nav.present(errorToast);
  //         savingToast.destroy();
  //
  //         Draft.createDraft(bkpReport);
  //       } else {
  //         const successToast = Toast.create({
  //           message: 'Reembolso salvo com sucesso',
  //           duration: 3000,
  //           showCloseButton: true,
  //           closeButtonText: 'Ok'
  //         });
  //
  //         this.nav.present(successToast);
  //
  //         savingToast.destroy();
  //       }
  //     }
  //   });
  // }
}
