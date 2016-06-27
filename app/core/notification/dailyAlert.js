import { Alert } from 'ionic-angular';

import { Draft } from '../draft';

import moment from 'moment';

const TimeLimitList = {
  MOURNING: moment.duration(8, 'hours'),
  LUNCH: moment.duration(12, 'hours'),
  BACK_LUNCH: moment.duration(13, 'hours'),
  OUT: moment.duration(18, 'hours')
};

export class DailyAlert {

  constructor(nav) {
    this.nav = nav;
    this.dailyDraft = this.checkPreviouslyDailyDraft();

    if (this.canNotify() && !this.dailyDraft) {
      this.createDailyDraft();
    }
  }

  canNotify() {
    let weekDayNow = moment().weekday();
    let canNotify = false;

    for(let weekDay of CONFIGS.notificationRole.weekDay) {

      if (weekDay.code === weekDayNow) {
        canNotify = weekDay.checked;
        break;
      }
    }

    return canNotify;
  }

  checkPreviouslyDailyDraft() {
    let dailyDraft = Storage.getItem('dailyDraft');

    if (dailyDraft && moment(dailyDraft.draft.data).format('DD') != moment().format('DD')) {
      this._popAlert('Dica!',
        `Existe um rascunho não salvo do dia ${moment(dailyDraft.draft.data).format('DD/MM/YYYY')}... Não esqueça de salvar ;)`,
        [ { text: 'Ok' } ]
      );

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
      let time = moment.duration(parseInt(moment().format('HH')), 'hours')
        .add(parseInt(moment().format('MM')), 'minutes');

      let timeLimit;
      let timeLimitArray = [TimeLimitList.MOURNING, TimeLimitList.LUNCH, TimeLimitList.BACK_LUNCH, TimeLimitList.OUT];

      for (let i = 0; i < timeLimitArray.length; i++) {

        if (timeLimitArray[i + 1]) {

          if (time.asMilliseconds() >= timeLimitArray[i].asMilliseconds()
                && time.asMilliseconds() <= timeLimitArray[i + 1].asMilliseconds()) {
            timeLimit = timeLimitArray[i];
            break;
          }
        } else {
          timeLimit = TimeLimitList.OUT;
        }
      }

      switch (timeLimit) {
        case TimeLimitList.MOURNING:

          if (!this.dailyDraft.mourningNotification) {
            this.popMourningNotification();
          }
          break;
        case TimeLimitList.LUNCH:

          if (!this.dailyDraft.lunchNotification) {
            this.popLunchNotification();
          }
          break;
        case TimeLimitList.BACK_LUNCH:

          if (!this.dailyDraft.backLaunchNotification) {
            this.popBackLunchNotification();
          }
          break;
        case TimeLimitList.OUT:

          if (!this.dailyDraft.outNotification) {
            this.popOutNotification();
          }
          break;
        default:
          console.warn('[WARN] No notification limit caught');
          break;
      }
    }
  }

  popMourningNotification() {
    this._popAlert('Bom dia!',
      `Chegou no trabalho?`,
      [
        { text: 'Ainda não' },
        {
          text: 'Cheguei!',
          handler: () => {
            this.dailyDraft.draft.horaChegada = new Date().toISOString();

            Draft.updateDraft(this.dailyDraft.draft);

            this.dailyDraft.mourningNotification = true;

            Storage.saveItem('dailyDraft', this.dailyDraft);
          }
        }
      ]
    );
  }

  popLunchNotification() {
    this._popAlert('Chegou a hora boa!',
      `Saindo para almoçar?`,
      [
        { text: 'Ainda não' },
        {
          text: 'Sim',
          handler: () => {
            this.dailyDraft.lunchOut = new Date();
            this.dailyDraft.lunchNotification = true;

            Storage.saveItem('dailyDraft', this.dailyDraft);
          }
        }
      ]
    );
  }

  popBackLunchNotification() {
    this._popAlert('Um cafezinho iria bem agora...',
      `Chegou do almoço?`,
      [
        { text: 'Ainda não' },
        {
          text: 'Cheguei!',
          handler: () => {

            if (this.dailyDraft.lunchOut) {
              this.dailyDraft.draft.tempoImprodutivo = moment().subtract(this.dailyDraft.lunchOut);
            } else {
              this.dailyDraft.draft.tempoImprodutivo = moment().subtract(TimeLimitList.LUNCH, 'hours');
            }

            Draft.updateDraft(this.dailyDraft.draft);

            this.dailyDraft.backLaunchNotification = true;

            Storage.saveItem('dailyDraft', this.dailyDraft);
          }
        }
      ]
    );
  }

  popOutNotification() {
    this._popAlert('Bora pra casa!',
      `Saindo do trabalho?`,
      [
        { text: 'Não, mais tarde' },
        {
          text: 'Sim',
          handler: () => {
            this.dailyDraft.draft.horaChegada = new Date().toISOString();

            Draft.updateDraft(this.dailyDraft.draft);

            this.dailyDraft.outNotification = true;

            Storage.saveItem('dailyDraft', this.dailyDraft);
          }
        }
      ]
    );
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

    setTimeout(() => {
      this.nav.present(confirm);
    }, 3000);
  }
}
