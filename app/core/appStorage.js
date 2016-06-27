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
              name: 'Domingo',
              shortName: 'D',
              code: 0,
              checked: false
            },
            {
              name: 'Segunda-feira',
              shortName: 'S',
              code: 1,
              checked: true
            },
            {
              name: 'Terça-feira',
              shortName: 'T',
              code: 2,
              checked: true
            },
            {
              name: 'Quarta-feira',
              shortName: 'Q',
              code: 3,
              checked: true
            },
            {
              name: 'Quinta-feira',
              shortName: 'Q',
              code: 4,
              checked: true
            },
            {
              name: 'Sexta-feira',
              shortName: 'S',
              code: 5,
              checked: true
            },
            {
              name: 'Sábado',
              shortName: 'S',
              code: 6,
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
