import {Page, NavController, Alert, ActionSheet, Platform, NavParams} from "ionic-angular";
import {Camera} from 'ionic-native';

import {Draft} from '../../core/draft';

import * as dateformatAll from 'dateformat';

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

    let dateformat = dateformatAll.default;

    if (navParams.get('report')) {
      this.saveMode = SaveMode.UPDATE;
      this.newReport = navParams.get('report');
    } else {
      this.saveMode = SaveMode.CREATE;

      this.newReport = {
        cliente: null,
        descricao: CONFIGS.defaultValues.reportDescription,
        data: dateformat(new Date(), 'yyyy-mm-dd'),
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
    Camera.getPicture({ destinationType: Camera.DestinationType.DATA_URL }).then((imageData) => {
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
      console.log('Salva relatório no banco');
    } else {

      switch (this.saveMode) {
        case SaveMode.CREATE:
          Draft.createDraft(this.newReport);
          break;
        case SaveMode.UPDATE:
          Draft.updateDraft(this.newReport);
          break;
      }
    }

    this.nav.pop();
  }
}
