import * as moment from 'moment';

export class DateHelper {
  public static date(input: moment.MomentInput = null) {
    return input ? moment(input) : moment();
  }
}
