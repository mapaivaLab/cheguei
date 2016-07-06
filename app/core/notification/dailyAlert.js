import { Alert } from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';

import { Draft } from '../draft';

import moment from 'moment';
import uuid from 'node-uuid';

const TimeLimitList = {
  PRE_MOURNING: moment.duration(1, 'hours'),
  MOURNING: moment.duration(8, 'hours'),
  LUNCH: moment.duration(12, 'hours'),
  BACK_LUNCH: moment.duration(13, 'hours'),
  OUT: moment.duration(18, 'hours')
};

export class DailyAlert {

  constructor(nav) {
    this.nav = nav;
    this.delayedNotification = false;
    this.TimeLimitList = TimeLimitList;

    this.startWatchDog();
  }

  canNotify(ignoreDelayNotification = false) {
    let weekDayNow = moment().weekday();
    let canNotify = false;

    for(let weekDay of CONFIGS.notificationRole.weekDay) {

      if (weekDay.code === weekDayNow) {
        canNotify = weekDay.checked;
        break;
      }
    }

    return canNotify && !this.alerting && (!this.delayedNotification || ignoreDelayNotification);
  }

  startWatchDog() {

    if (!this.watchDog) {
      this.watchDog = setInterval(() => {

        if (this.canNotify()) {
          this.dailyDraft = this.checkPreviouslyDailyDraft();

          if (!this.dailyDraft) {
            this.createDailyDraft();
          }

          this.alert();
        }
      }, 3000); // Each 3 seconds
    }
  }

  stopWatchDog() {
    clearInterval(this.watchDog);

    this.watchDog = null;
  }

  start() {
    this.startWatchDog();
  }

  stop() {
    this.stopWatchDog();
  }

  checkPreviouslyDailyDraft() {
    let dailyDraft = Storage.getItem('dailyDraft');

    if (dailyDraft && moment(dailyDraft.draft.data).format('DD') != moment().format('DD')) {
      // this._popAlert('Dica!',
      //   `Existe um rascunho não salvo do dia ${moment(dailyDraft.draft.data).format('DD/MM/YYYY')}... Não esqueça de salvar ;)`,
      //   [ { text: 'Ok' } ]
      // );

      Storage.saveItem('dailyDraft', null);

      return null;
    } else {
      return dailyDraft;
    }
  }

  createDailyDraft() {
    this.dailyDraft = {
      draft: Draft.createEmptyDraft(),
      mourningNotification: false,
      lunchNotification: false,
      backLaunchNotification: false,
      outNotification: false
    };

    Storage.saveItem('dailyDraft', this.dailyDraft);
  }

  alert() {

    if (this.canNotify()) {
      this.alerting = true;

      let timeLimit = this.getTimeLimitFromNow();

      switch (timeLimit) {
        case TimeLimitList.MOURNING:

          if (!this.dailyDraft.mourningNotification) {
            this.popMourningNotification();
            // this._popLocalNotification('Chegando no trabalho?', timeLimit);
          } else {
            this.alerting = false;
          }
          break;
        case TimeLimitList.LUNCH:

          if (!this.dailyDraft.lunchNotification) {
            this.popLunchNotification();
            // this._popLocalNotification('Saindo para almoçar?', timeLimit);
          } else {
            this.alerting = false;
          }
          break;
        case TimeLimitList.BACK_LUNCH:

          if (!this.dailyDraft.backLaunchNotification) {
            this.popBackLunchNotification();
            // this._popLocalNotification('Chegou do almoço?', timeLimit);
          } else {
            this.alerting = false;
          }
          break;
        case TimeLimitList.OUT:

          if (!this.dailyDraft.outNotification) {
            this.popOutNotification();
            // this._popLocalNotification('Saindo do trabalho?', timeLimit);
          } else {
            this.alerting = false;
          }
          break;
        default:
          console.warn('[WARN] No notification limit caught');
          this.alerting = false;
          break;
      }
    }
  }

  getTimeLimitFromNow() {
    let time = this.getNowDuration();

    let timeLimit;
    let timeLimitArray = [
      TimeLimitList.MOURNING, TimeLimitList.LUNCH,
      TimeLimitList.BACK_LUNCH, TimeLimitList.OUT
    ];

    for (let i = 0; i < timeLimitArray.length; i++) {

      if (timeLimitArray[i + 1]) {

        if (time.asMilliseconds() >= timeLimitArray[i].asMilliseconds()
              && time.asMilliseconds() <= timeLimitArray[i + 1].asMilliseconds()) {
          timeLimit = timeLimitArray[i];
          break;
        }
      } else {

        if (time.asHours() > TimeLimitList.OUT.asHours()){
          timeLimit = TimeLimitList.OUT;
        } else {
          timeLimit = TimeLimitList.PRE_MOURNING;
        }
      }
    }

    return timeLimit;
  }

  getNowDuration() {
    return moment.duration(parseInt(moment().format('HH')), 'hours')
      .add(parseInt(moment().format('MM')), 'minutes');
  }

  _popLocalNotification(text, timeLimit) {
    LocalNotifications.schedule({
      id: uuid.v1(),
      text: text,
      at: new Date(),
      led: "FF0000",
      data: { timeLimit: timeLimit.asMilliseconds() }
    });

    LocalNotifications.on('canceled', () => {
      this.alerting = false;

      console.log('Notificatio');
    });

    LocalNotifications.on('click', (notification) => {
      console.log(notification);

      let tl = JSON.parse(notification.data).timeLimit;

      switch (tl) {
        case TimeLimitList.MOURNING.asMilliseconds():
          this.popMourningNotification();
          break;
        case TimeLimitList.LUNCH.asMilliseconds():
          this.popLunchNotification();
          break;
        case TimeLimitList.BACK_LUNCH.asMilliseconds():
          this.popBackLunchNotification();
          break;
        case TimeLimitList.OUT.asMilliseconds():
          this.popOutNotification();
          break;
      }
    });
  }

  popMourningNotification() {
    this.alerting = true;

    this._popAlert('Bom dia!',
      `Chegou no trabalho?`,
      [
        {
          text: 'Ainda não',
          handler: () => {
            this.alerting = false;
            this._delayNotification();
          }
        },
        {
          text: 'Cheguei!',
          handler: () => {
            this.dailyDraft.mourningNotification = true;

            this._updateDraft({ name: 'horaChegada', value: moment().format() });

            this.alerting = false;
          }
        }
      ]
    );
  }

  popLunchNotification() {
    this.alerting = true;

    this._popAlert('Chegou a hora boa!',
      `Saindo para almoçar?`,
      [
        {
          text: 'Ainda não',
          handler: () => {
            this.alerting = false;
            this._delayNotification();
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.dailyDraft.lunchOut = moment().format();
            this.dailyDraft.lunchNotification = true;

            Storage.saveItem('dailyDraft', this.dailyDraft);
            this.alerting = false;
          }
        }
      ]
    );
  }

  popBackLunchNotification() {
    this.alerting = true;

    this._popAlert('Um cafezinho iria bem agora...',
      `Chegou do almoço?`,
      [
        {
          text: 'Ainda não',
          handler: () => {
            this.alerting = false;
            this._delayNotification();
          }
        },
        {
          text: 'Cheguei!',
          handler: () => {
            let startDate;

            if (this.dailyDraft.lunchOut) {
              startDate = moment(this.dailyDraft.lunchOut);
            } else {
              startDate = moment().hours(TimeLimitList.LUNCH.asHours()).minutes(0);
            }

            let duration = moment.duration( moment().diff(startDate) );

            this.dailyDraft.backLaunchNotification = true;

            this._updateDraft({ name: 'tempoImprodutivo', value: moment().hour(duration.hours()).minutes(duration.minutes()).format() });

            this.alerting = false;
          }
        }
      ]
    );
  }

  popOutNotification() {
    this.alerting = true;

    this._popAlert('Bora pra casa!',
      `Saindo do trabalho?`,
      [
        {
          text: 'Não, mais tarde',
          handler: () => {
            this.alerting = false;
            this._delayNotification();
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.dailyDraft.outNotification = true;

            this._updateDraft({ name: 'horaSaida', value: moment().format() });

            this.alerting = false;
          }
        }
      ]
    );
  }

  /**
  * @private
  */
  _updateDraft(field = {}) {
    let searchedDraft = Draft.findDraft(this.dailyDraft.draft.id_draft);

    if (searchedDraft && field.name) {
      searchedDraft[field.name] = field.value;

      Draft.updateDraft(searchedDraft);

      this.dailyDraft.draft = searchedDraft;

      Storage.saveItem('dailyDraft', this.dailyDraft);
    }
  }

  /**
   * @private
  */
  _delayNotification() {
    this.delayedNotification = true;

    setTimeout(() => {
      this.delayedNotification = false;
    }, 900000); // 15 min
  }

  /**
   * @private
  */
  _popAlert(title, message, buttons) {
    let confirm = Alert.create({
      title: title,
      message: message,
      buttons: buttons
    });

    // confirm.onDismiss(() => {
    //   this.alerting = false;
    //
    //   this._delayNotification();
    // });

    setTimeout(() => {
      this.nav.present(confirm);
    }, 1000);
  }
}
