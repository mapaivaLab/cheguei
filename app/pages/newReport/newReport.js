import {Page, NavController, Alert, ActionSheet, Platform, NavParams, Toast, Loading} from "ionic-angular";
import {Camera} from 'ionic-native';

import {Draft} from '../../core/draft';

import moment from 'moment';

// Enum to save report method
let SaveMode = {
  CREATE: 0,
  UPDATE: 1
};

@Page({
  templateUrl: 'build/pages/newReport/newReport.html'
})
export class NewReport {
  static get parameters() {
    return [[NavController], [Platform], [NavParams]];
  }

  constructor(nav, platform, navParams) {
    this.nav = nav;
    this.platform = platform;

    if (navParams.get('report')) {
      this.saveMode = SaveMode.UPDATE;

      let report = navParams.get('report');

      report.datePicker = moment(report.data).format('YYYY-MM-DD');

      this.newReport = report;
    } else {
      this.saveMode = SaveMode.CREATE;

      this.newReport = {
        cliente: null,
        descricao: CONFIGS.defaultValues.reportDescription,
        datePicker: moment().format('YYYY-MM-DD'),
        refeicao: CONFIGS.defaultValues.launchPrice,
        outrosGastos: CONFIGS.defaultValues.transportPrice,
        duracao: null,
        image: {
          title: 'Imagem de nota de reembolso',
          data: null
        }
      };
    }
  }

  pickImage() {
    Camera.getPicture({ destinationType: Camera.DestinationType.DATA_URL, quality: 50 }).then((imageData) => {
      this.newReport.image.data = 'data:image/jpeg;base64,' + imageData;
    },
    (err) => {

      if (err != 'Camera cancelled') {
        let confirm = Alert.create({
          title: 'Erro obtendo imagem',
          message: err,
          buttons: ['OK']
        });

        this.nav.present(confirm);
      }
    });
  }

  openImageActionSheet() {
    let actionSheet = ActionSheet.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Tirar outra foto',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.pickImage()
          }
        },
        {
          text: 'Deletar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.newReport.image.data = null;
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }

  saveReport() {

    if (this.newReport.horaChegada && this.newReport.horaSaida) {
      let loading = Loading.create({
        content: "Salvando reembolso, aguarde..."
      });

      loading.onDismiss(() => {
        this.nav.pop();
      });

      this.nav.present(loading);

      switch (this.saveMode) {
        case SaveMode.CREATE:
          console.log('Create a new report in the database');
          break;
        case SaveMode.UPDATE:
          console.log('Update a new report in the database');
          break;
      }

      setTimeout(() => {
        loading.dismiss();
      }, 3000);
    } else {

      switch (this.saveMode) {
        case SaveMode.CREATE:
          Draft.createDraft(this.newReport);
          break;
        case SaveMode.UPDATE:
          Draft.updateDraft(this.newReport);
          break;
      }

      this.nav.pop();
    }
  }
}
