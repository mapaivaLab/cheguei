import {Page, NavController, ActionSheet, Alert, Toast} from 'ionic-angular';
import {NewReport} from '../newReport/newReport';

import {Draft} from '../../core/draft';

@Page({
  templateUrl: 'build/pages/visit-report-list/visit-report-list.html'
})
export class VisitReportList {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;

    this.selectedReportsCount = 0;

    this.monthList = [
      "Junho/2016",
      "Maio/2016",
      "Abril/2016",
      "Março/2016",
      "Fevereiro/2016",
      "Janeiro/2016",
      "Dezembro/2015",
      "Novembro/2015",
      "Outubro/2015",
      "Setembro/2015",
      "Agosto/2015",
      "Julho/2015",
      "Junho/2015",
      "Maio/2015",
      "Abril/2015",
      "Março/2015",
      "Fevereiro/2015",
      "Janeiro/2015"
    ];

    this.month = this.monthList[0];

    this.visitsReportDrafts = VisitsReportDrafts;

    this.visitsReport = [
      {
        cliente: "CODIT",
        data: new Date("2016-06-02T00:00:00-03:00"),
        descricao: "Dia de trabalho",
        detalheDespesa: "Outros gastos = transporte",
        detalheVisita: "",
        duracao: "1900-01-01T09:14:00-03:06",
        horaChegada: "1900-01-01T08:02:00-03:06",
        horaSaida:"1900-01-01T17:16:00-03:06",
        id_relatorioVisita:"xD20160602H201725976R000000080",
        intervaloEspera: "1900-01-01T00:00:00-03:06",
        outrosGastos: "55.6",
        pedagio: "0.0",
        quilometragem: "0.0",
        refeicao: "8",
        tempoImprodutivo: "1900-01-01T00:30:00-03:06",
        usuarioInsercao: "Matheus Paiva"
      },
      {
        cliente: "CODIT",
        data: new Date("2016-06-02T00:00:00-03:00"),
        descricao: "Dia de trabalho",
        detalheDespesa: "Outros gastos = transporte",
        detalheVisita: "",
        duracao: "1900-01-01T09:14:00-03:06",
        horaChegada: "1900-01-01T08:02:00-03:06",
        horaSaida:"1900-01-01T17:16:00-03:06",
        id_relatorioVisita:"xD20160602H201725976R000000080",
        intervaloEspera: "1900-01-01T00:00:00-03:06",
        outrosGastos: "55.6",
        pedagio: "0.0",
        quilometragem: "0.0",
        refeicao: "8",
        tempoImprodutivo: "1900-01-01T00:30:00-03:06",
        usuarioInsercao: "Matheus Paiva"
      },
      {
        cliente: "FEST COLOR",
        data: new Date("2016-06-02T00:00:00-03:00"),
        descricao: "Dia de trabalho",
        detalheDespesa: "Outros gastos = transporte",
        detalheVisita: "",
        duracao: "1900-01-01T09:14:00-03:06",
        horaChegada: "1900-01-01T08:02:00-03:06",
        horaSaida:"1900-01-01T17:16:00-03:06",
        id_relatorioVisita:"xD20160602H201725976R000000080",
        intervaloEspera: "1900-01-01T00:00:00-03:06",
        outrosGastos: "55.6",
        pedagio: "0.0",
        quilometragem: "0.0",
        refeicao: "8",
        tempoImprodutivo: "1900-01-01T00:30:00-03:06",
        usuarioInsercao: "Matheus Paiva"
      }
    ];
  }

  pressReport(report) {
    this.toggleReport(report);
  }

  sumReportCost(report) {
    return parseFloat(report.outrosGastos) + parseFloat(report.refeicao);
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

  approveReports() {
    console.log('Approve reports');
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
          }
        }
      ]
    });

    this.nav.present(alert);
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
