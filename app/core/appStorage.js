/**
 * @private ls {Storage}
*/
let ls = localStorage;

export class AppStorage {
  constructor() {
  }

  getConfigs() {
    let configs = this.getItem('configs');

    if (!configs) {
      configs = {

        notificationRole: {
          geolocalization: true,
          hour: false,

          geolocConfig: {
            address: null,
            lat: 0,
            lng: 0
          },

          hourConfig: {
            arriveTime: '08:00',
            launchTime: '12:00',
            backLaunchTime: '13:00',
            endDayTime: '17:30'
          }
        },

        defaultValues: {
          launchPrice: 20,
          transportPrice: null,
          reportDescription: null
        }
      };

      this.saveItem('configs', configs);
    }

    return configs;
  }

  saveConfigs(configs) {
    this.saveItem('configs', configs);
  }

  getItem(name) {
    let item = ls.getItem(name);

    if (item) {
      return JSON.parse(item);
    }
  }

  saveItem(name, item) {
    ls.setItem(name, JSON.stringify(item));
  }
}
