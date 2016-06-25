import uuid from 'node-uuid';
import moment from 'moment';

class DraftUtils {
  constructor(){}

  createDraft(draft) {
    draft.data = new Date(moment(draft.datePicker).toDate());
    draft.id_draft = uuid.v1();

    VisitsReportDrafts.push(draft);

    Storage.saveVisitsReportDrafts(VisitsReportDrafts);
  }

  updateDraft(draft) {
    let draftInfo = this.findDraft(draft.id_draft, true);

    if (draftInfo.draft) {
      draft.data = new Date(moment(draft.datePicker).toDate());
      VisitsReportDrafts[draftInfo.index] = draft;
      Storage.saveVisitsReportDrafts(VisitsReportDrafts);
    }
  }

  deleteDraft(draft) {
    let draftInfo = this.findDraft(draft.id_draft, true);

    if (draftInfo.draft) {
      VisitsReportDrafts.splice(draftInfo.index, 1);
      Storage.saveVisitsReportDrafts(VisitsReportDrafts);
    }
  }

  findDraft(id_draft, returnIndex) {
    let draft;
    let index = -1;

    for (let i = 0; i < VisitsReportDrafts.length; i++) {

      if (VisitsReportDrafts[i].id_draft == id_draft) {
        draft = VisitsReportDrafts[i];
        index = i;
        break;
      }
    }

    if (returnIndex) {
      return {
        draft: draft,
        index: index
      };
    }

    return draft;
  }
}

let Draft = new DraftUtils();

export { Draft };
