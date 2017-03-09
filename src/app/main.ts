import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import {Querystring} from "request/lib/querystring.js";

Querystring.prototype.unescape = function(val: string) {
    return val; // TODO should unescape it
};
platformBrowserDynamic().bootstrapModule(AppModule);
