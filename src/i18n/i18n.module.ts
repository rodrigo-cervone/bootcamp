import { NgModule } from '@angular/core';

import { I18nPipe } from './i18n.pipe';
import { I18nService, LANGS } from './i18n.service';

interface i18nConfig {
    lang: string
};

@NgModule({
    declarations: [
        I18nPipe
    ],
    providers: [
        {provide: LANGS.EN, useValue: LANGS.EN},
        {provide: LANGS.ES, useValue: LANGS.ES},
        I18nService
    ],
    exports: [
        I18nPipe
    ]
})
export class I18nModule {};