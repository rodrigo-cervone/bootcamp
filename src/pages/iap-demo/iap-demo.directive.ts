import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'iap-player-player-drv'
})
export class IapPlayerPlayerDrv extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('iapPlayerPlayerDrv', elementRef, injector);
  }
}