import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service'; // our translate service

@Pipe({
    name: 'i18n',
    // This has an impact on performance, be carefull.
    // refer to angular docs <https://angular.io/docs/ts/latest/guide/pipes.html>
    pure: false
})
export class I18nPipe implements PipeTransform {

    constructor(private i18nService: I18nService) { }

    transform(value: string, args?: any[]): string {
        if (!value) return '';
        return this.i18nService.instant(value);
    }
}