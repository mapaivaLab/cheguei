import {Page, NavController} from 'ionic-angular';
import {NewReport} from '../newReport/newReport';

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

    // Fill repots lists
    this.visitsReportDrafts = [
      {
        cliente: "CODIT",
        data: new Date("2016-06-02T00:00:00-03:00"),
        descricao: "Dia de trabalho",
        detalheDespesa: "Outros gastos = transporte",
        detalheVisita: "",
        duracao: "1900-01-01T09:14:00-03:06",
        horaChegada: new Date("1900-01-01T08:02:00-03:06"),
        horaSaida: new Date("1900-01-01T17:16:00-03:06"),
        id_relatorioVisita:"xD20160602H201725976R000000080",
        intervaloEspera: "1900-01-01T00:00:00-03:06",
        outrosGastos: "7.6",
        pedagio: "0.0",
        quilometragem: "0.0",
        refeicao: "9.5",
        tempoImprodutivo: "1900-01-01T00:30:00-03:06",
        usuarioInsercao: "Matheus Paiva"
      }
    ];

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

  openNewReportPage() {
    this.nav.push(NewReport);
  }

  openEditPage(report) {

    if (report.selected) {
      this.toggleReport(report);
    } else if (this.isAnyReportSelected()) {
      this.toggleReport(report);
    } else {
      console.log('Open edit page', report);
    }
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
}
