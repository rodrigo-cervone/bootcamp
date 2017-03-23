import { NgModule } from '@angular/core';

import { I18nPipe } from './i18n.pipe';
import { I18nService, LANG_EN_NAME, LANG_ES_NAME } from './i18n.service';

interface i18nConfig {
    lang: string
};

@NgModule({
    declarations: [
        I18nPipe
    ],
    providers: [
        {provide: LANG_EN_NAME, useValue: LANG_EN_NAME},
        {provide: LANG_ES_NAME, useValue: LANG_ES_NAME},
        I18nService
    ],
    exports: [
        I18nPipe
    ]
})
export class I18nModule {};