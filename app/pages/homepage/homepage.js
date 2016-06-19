import {Page, NavController, Alert} from 'ionic-angular';
import {NewReport} from '../newReport/newReport';

import {Draft} from '../../core/draft';

@Page({
  templateUrl: 'build/pages/homepage/homepage.html'
})
export class Homepage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;

    // Fill consolidated fields
    this.mileage = parseFloat("0.0").toFixed(2);
    this.monthList = ["Junho/2016", "Maio/2016", "Abril/2016", "Março/2016", "Fevereiro/2016", "Janeiro/2016"];
    this.productiveHours = parseFloat("17.516666").toFixed(2);
    this.total = parseFloat("45.050000000000004").toFixed(2);
    this.totalHours = parseFloat("18.683332").toFixed(2);

    // Fill repots lists
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
      }
    ];
  }

  sumReportCost(report) {
    return parseFloat(report.outrosGastos) + parseFloat(report.refeicao);
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
}
