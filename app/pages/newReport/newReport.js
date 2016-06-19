import {Page, NavController, Alert, ActionSheet, Platform} from "ionic-angular";
import * as dateformatAll from 'dateformat';
import {Camera} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/newReport/newReport.html'
})
export class NewReport {
  static get parameters() {
    return [[NavController], [Platform]];
  }

  constructor(nav, platform) {
    this.nav = nav;
    this.platform = platform;

    let dateformat = dateformatAll.default;

    this.newReport = {
      description: CONFIGS.defaultValues.reportDescription,
      date: dateformat(new Date(), 'yyyy-mm-dd'),
      meal: CONFIGS.defaultValues.launchPrice,
      othersExpenses: CONFIGS.defaultValues.transportPrice,
      image: {
        title: 'Imagem de nota de reembolso',
        data: null
      }
    };
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
}
