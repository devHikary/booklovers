import { TranslationWidth } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

const I18N_VALUES = {
  'pt-br': {
    weekdays: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
    months: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
  },
};

@Injectable()
export class I18n {
  language: any = 'pt-br';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  readonly DELIMITER = '/';
  readonly LANGUAGE = this._i18n.language;

  constructor(private _i18n: I18n) {
    super();
  }
  override getWeekdayLabel(
    weekday: number,
    width?: TranslationWidth | undefined
    ): string {
      return I18N_VALUES['pt-br'].weekdays[weekday - 1];
    }
    override getDayAriaLabel(date: NgbDateStruct): string {
      return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : " erro na data";
    }
    override getMonthShortName(month: number, year?: number | undefined): string {
      return I18N_VALUES['pt-br'].months[month - 1];
    }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}
