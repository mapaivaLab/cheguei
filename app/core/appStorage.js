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
          },

          weekDay: [
            {
              description: 'Segunda-feira',
              code: 'S',
              checked: true
            },
            {
              description: 'Terça-feira',
              code: 'T',
              checked: true
            },
            {
              description: 'Quarta-feira',
              code: 'Q',
              checked: true
            },
            {
              description: 'Quinta-feira',
              code: 'Q',
              checked: true
            },
            {
              description: 'Sexta-feira',
              code: 'S',
              checked: true
            },
            {
              description: 'Sábado',
              code: 'S',
              checked: false
            },
            {
              description: 'Domingo',
              code: 'S',
              checked: false
            }
          ]
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

  getVisitsReportDrafts() {
    let drafts = this.getItem('drafts');

    if (!drafts) {
      drafts = [];

      this.saveItem('drafts', drafts);
    }

    for (let i = 0; i < drafts.length; i++) {
      drafts[i].data = new Date(drafts[i].data);
    }

    return drafts;
  }

  saveVisitsReportDrafts(drafts) {
    this.saveItem('drafts', drafts);
  }

  getAuthInfo() {
    let auth = this.getItem('auth');

    if (!auth) {
      auth = { user: null, pass: null };

      this.saveItem('auth', auth);
    }

    return auth;
  }

  saveAuthInfo(auth) {
    this.saveItem('auth', auth);
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
