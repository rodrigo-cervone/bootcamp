import { Injectable } from '@angular/core';
import { LANG_ES_TRANS } from './lang/dict.es';
import { LANG_EN_TRANS } from './lang/dict.en';

export const LANGS = {
    EN: 'en',
    ES: 'es'
}

@Injectable()
export class I18nService {
    private dict: any = {};
    private _currentLang: string;

    // inject our translations
    constructor() {
        this.dict = {
            [LANGS.ES]: LANG_ES_TRANS,
            [LANGS.EN]: LANG_EN_TRANS
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
