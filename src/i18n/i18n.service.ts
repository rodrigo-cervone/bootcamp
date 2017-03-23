import { Injectable } from '@angular/core';
import { LANG_ES_TRANS } from './lang/dict.es';
import { LANG_EN_TRANS } from './lang/dict.en';

export const LANG_EN_NAME = 'en';
export const LANG_ES_NAME = 'es';


@Injectable()
export class I18nService {
    private dict: any = {};
    private _currentLang: string;

    // inject our translations
    constructor() {
        this.dict = {
            [LANG_ES_NAME]: LANG_ES_TRANS,
            [LANG_EN_NAME]: LANG_EN_TRANS
        }
    }

    get currentLanguage(): string {
        return this._currentLang;
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;
        console.log(this.dict[this._currentLang][translation]);
        if (this.dict[this._currentLang] && this.dict[this._currentLang][translation]) {
            return this.dict[this._currentLang][translation];
        }

        return translation;
    }

    public instant(key: string) {
        // call translation
        return this.translate(key); 
    }
}
