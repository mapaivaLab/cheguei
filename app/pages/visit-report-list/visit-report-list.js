import {Page, NavController, ActionSheet, Alert, Toast} from 'ionic-angular';
import {NewReport} from '../newReport/newReport';
import {ApproveReport} from '../approveReport/approveReport';

import {Draft} from '../../core/draft';
import {Report} from '../../core/report';
import {LongPressDirective} from '../../directives/longPress';

import moment from 'moment';

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
    this.refreshing = true;

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

  getVisitReports() {
    Report.getReportInfo((reportInfo) => {
      this.visitsReport = reportInfo.visitsReport;
      this.monthList = reportInfo.monthList;
      this.clientList = reportInfo.clientList;
      this.userList = reportInfo.userList;

      this.user = this.userList[7];
      this.month = this.monthList[0];
      this.client = this.clientList[1];

      this.refreshing = false;
    });
  }

  prettifyDate(date) {
    return Report.prettifyDate(date);
  }

  pressReport(report) {
    this.toggleReport(report);
  }

  sumReportCost(report) {
    return Report.sumReportCost(report);
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
}
