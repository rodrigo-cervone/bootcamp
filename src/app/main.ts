import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppModule } from './app.module';

import {Querystring} from "request/lib/querystring.js";
import 'iap/dist/iap-tpls';
import 'iap/dist/iap';

Querystring.prototype.unescape = function(val: string) {
    return val; // @TODO should unescape it
};
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.body, [
      'iap'
    ], {strictDi: true});
});
