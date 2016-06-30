import moment from 'moment';

class ReportUtils {
  constructor() {}

  getReportInfo(handler) {
    let reportList = {
    	error: "false",
    	serverDate: "2016-06-30T18:34:34.735-03:00",
    	clientList: [
        "CAMARGO",
      	"CODIT",
      	"FESTCOLOR",
      	"MACRON",
      	"SARAIVA",
      	"SIGMAPLAST"
      ],
    	mileage: "0.0",
    	monthList: [
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
      ],
    	productiveHours: "148.23334",
    	total: "379.88",
    	totalHours: "162.31667",
    	userList: [
        "Alex Pereira",
      	"Daniela",
      	"David Bonafé",
      	"Francisco Filizola ",
      	"Gustavo Giroldo",
      	"Lucas Vinicius",
      	"Luiz Fernando",
      	"Matheus Paiva",
      	"Rodrigo Lourenço",
    	   "Vinicius Lopes"
       ],
    	visitsReport: [
        {
      		cliente: "CODIT",
      		data: "2016-06-28T00:00:00-03:00",
      		descricao: "Dia de trabalho",
      		detalheDespesa: "Outros gastos = transporte",
      		detalheVisita: "",
      		duracao: "1900-01-01T08:40:00-03:06",
      		horaChegada: "1900-01-01T09:07:00-03:06",
      		horaSaida: "1900-01-01T17:47:00-03:06",
      		id_relatorioVisita: "xD20160628H120808038R000000205",
      		intervaloEspera: "1900-01-01T00:00:00-03:06",
      		outrosGastos: "7.6",
      		pedagio: "0.0",
      		quilometragem: "0.0",
      		refeicao: "0.0",
      		tempoImprodutivo: "1900-01-01T00:00:00-03:06",
      		usuarioInsercao: "Matheus Paiva"
      	},
      	{
      		cliente: "CODIT",
      		data: "2016-06-27T00:00:00-03:00",
      		descricao: "Dia de trabalho",
      		detalheDespesa: "Outros gastos = transporte",
      		detalheVisita: "",
      		duracao: "1900-01-01T09:22:00-03:06",
      		horaChegada: "1900-01-01T08:30:00-03:06",
      		horaSaida: "1900-01-01T17:52:00-03:06",
      		id_relatorioVisita: "xD20160627H205256218R000000160",
      		intervaloEspera: "1900-01-01T00:00:00-03:06",
      		outrosGastos: "13.7",
      		pedagio: "0.0",
      		quilometragem: "0.0",
      		refeicao: "7.6",
      		tempoImprodutivo: "1900-01-01T00:30:00-03:06",
      		usuarioInsercao: "Matheus Paiva"
    	   },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-24T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T08:50:00-03:06",
      	// 	"horaChegada": "1900-01-01T09:30:00-03:06",
      	// 	"horaSaida": "1900-01-01T18:20:00-03:06",
      	// 	"id_relatorioVisita": "xD20160624H212108620R000000111",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "14.5",
      	// 	"tempoImprodutivo": "1900-01-01T01:00:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-22T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T08:30:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:30:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:00:00-03:06",
      	// 	"id_relatorioVisita": "xD20160622H195602384R000000053",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "15.93",
      	// 	"tempoImprodutivo": "1900-01-01T00:45:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-21T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:06:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:50:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:56:00-03:06",
      	// 	"id_relatorioVisita": "xD20160621H115532473R000000035",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "20.0",
      	// 	"tempoImprodutivo": "1900-01-01T01:10:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-20T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:00:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:40:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:40:00-03:06",
      	// 	"id_relatorioVisita": "xD20160620H204141070R000000003",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "14.0",
      	// 	"tempoImprodutivo": "1900-01-01T00:45:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-17T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T07:46:00-03:06",
      	// 	"horaChegada": "1900-01-01T10:04:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:50:00-03:06",
      	// 	"id_relatorioVisita": "xD20160617H204608445R000000027",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "20.0",
      	// 	"tempoImprodutivo": "1900-01-01T01:00:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-16T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T08:47:00-03:06",
      	// 	"horaChegada": "1900-01-01T09:30:00-03:06",
      	// 	"horaSaida": "1900-01-01T18:17:00-03:06",
      	// 	"id_relatorioVisita": "xD20160616H210237645R000000019",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "9.5",
      	// 	"tempoImprodutivo": "1900-01-01T00:45:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-15T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:00:00-03:06",
      	// 	"horaChegada": "1900-01-01T09:40:00-03:06",
      	// 	"horaSaida": "1900-01-01T18:40:00-03:06",
      	// 	"id_relatorioVisita": "xD20160616H210157177R000000017",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "13.7",
      	// 	"tempoImprodutivo": "1900-01-01T01:00:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-14T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:06:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:45:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:51:00-03:06",
      	// 	"id_relatorioVisita": "xD20160614H155009987R000000216",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "20.0",
      	// 	"tempoImprodutivo": "1900-01-01T01:00:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-13T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:05:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:40:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:45:00-03:06",
      	// 	"id_relatorioVisita": "xD20160613H204511650R000000210",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "13.9",
      	// 	"tempoImprodutivo": "1900-01-01T00:40:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-10T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T08:21:00-03:06",
      	// 	"horaChegada": "1900-01-01T09:30:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:51:00-03:06",
      	// 	"id_relatorioVisita": "xD20160610H205206580R000000167",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "19.8",
      	// 	"tempoImprodutivo": "1900-01-01T01:00:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-09T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:15:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:35:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:50:00-03:06",
      	// 	"id_relatorioVisita": "xD20160609H203703810R000000147",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "10.1",
      	// 	"tempoImprodutivo": "1900-01-01T00:40:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-08T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:56:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:30:00-03:06",
      	// 	"horaSaida": "1900-01-01T18:26:00-03:06",
      	// 	"id_relatorioVisita": "xD20160609H203539183R000000144",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "12.2",
      	// 	"tempoImprodutivo": "1900-01-01T01:00:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-07T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:25:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:25:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:50:00-03:06",
      	// 	"id_relatorioVisita": "xD20160607H113739397R000000078",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "6.9",
      	// 	"tempoImprodutivo": "1900-01-01T00:50:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-06T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:29:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:03:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:32:00-03:06",
      	// 	"id_relatorioVisita": "xD20160606H110653428R000000005",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "9.0",
      	// 	"tempoImprodutivo": "1900-01-01T00:50:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	// {
      	// 	"cliente": "CODIT",
      	// 	"data": "2016-06-02T00:00:00-03:00",
      	// 	"descricao": "Dia de trabalho",
      	// 	"detalheDespesa": "Outros gastos = transporte",
      	// 	"detalheVisita": "",
      	// 	"duracao": "1900-01-01T09:14:00-03:06",
      	// 	"horaChegada": "1900-01-01T08:02:00-03:06",
      	// 	"horaSaida": "1900-01-01T17:16:00-03:06",
      	// 	"id_relatorioVisita": "xD20160602H201725976R000000080",
      	// 	"intervaloEspera": "1900-01-01T00:00:00-03:06",
      	// 	"outrosGastos": "7.6",
      	// 	"pedagio": "0.0",
      	// 	"quilometragem": "0.0",
      	// 	"refeicao": "9.5",
      	// 	"tempoImprodutivo": "1900-01-01T00:30:00-03:06",
      	// 	"usuarioInsercao": "Matheus Paiva"
      	// },
      	{
      		cliente: "CODIT",
      		data: "2016-06-01T00:00:00-03:00",
      		descricao: "Dia de trabalho",
      		detalheDespesa: "Outros gastos = transporte",
      		detalheVisita: "",
      		duracao: "1900-01-01T09:27:00-03:06",
      		horaChegada: "1900-01-01T08:13:00-03:06",
      		horaSaida: "1900-01-01T17:40:00-03:06",
      		id_relatorioVisita: "xD20160601H112059419R000000451",
      		intervaloEspera: "1900-01-01T00:00:00-03:06",
      		outrosGastos: "7.6",
      		pedagio: "0.0",
      		quilometragem: "0.0",
      		refeicao: "20.35",
      		tempoImprodutivo: "1900-01-01T00:40:00-03:06",
      		usuarioInsercao: "Matheus Paiva"
      	}
      ]
    };

    // let authInfo = Storage.getAuthInfo();
    // let params = new Map();
    //
    // params.set('user', authInfo.user);
    //
    // if (this.month) {
    //   params.set('month', this.month);
    // } else {
    //   params.set('month', `${this.getMonth()}/${moment().year()}`);
    // }
    //
    // this.http.get('crm.visitsReport/getVisitsReport', {
    //   params: params,
    //   needAuth: true,
    //   handler: (resp, err) => {
    //
    //     if (err) {
    //       const failureToast = Toast.create({
    //         message: `Erro buscando reembolsos. ${err.message}`,
    //         duration: 5000,
    //         showCloseButton: true,
    //         closeButtonText: 'Ok'
    //       });
    //
    //       this.nav.present(failureToast);
    //     } else {
    //
    //       // Fill consolidated fields
    //       this.mileage = parseFloat(resp.mileage).toFixed(2);
    //       this.productiveHours = parseFloat(resp.productiveHours).toFixed(2);
    //       this.total = parseFloat(resp.total).toFixed(2);
    //       this.totalHours = parseFloat(resp.totalHours).toFixed(2);
    //
    //       this.monthList = resp.monthList || [];
    //       this.clientList = resp.clientList || [];
    //       this.userList = resp.userList || [];
    //       this.visitsReport = resp.visitsReport || [];
    //
    //       if (this.monthList.length > 0 && this.userList instanceof Array) {
    //         this.month = this.monthList[0];
    //       }
    //
    //       if (this.clientList.length > 0 && this.userList instanceof Array) {
    //         this.client = this.clientList[0];
    //       }
    //
    //       if (this.userList.length > 0 && this.userList instanceof Array) {
    //         this.user = this.clientList[0];
    //       }
    //     }
    //
    //     this.refreshing = false;
    //   }
    // });
    //
    // this.getMonth();

    if (handler && typeof handler == 'function') {
      handler.call(this, reportList);
    }
  }

  getMonthName() {
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
}

let Report = new ReportUtils();

export { Report };
