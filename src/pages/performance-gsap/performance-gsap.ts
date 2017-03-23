import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import gsap from 'gsap';

/*
  Generated class for the PerformanceGSAP page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-performance-gsap',
  templateUrl: 'performance-gsap.html'
})
export class PerformanceGSAPPage {
  @ViewChild('oneteam')
  img:ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  /**
   * Playing with the opacity of the image.
   */
  fade() {
    let el = this.img.nativeElement;
    gsap.TweenLite.to(el, 0.5, {opacity: 0});
    gsap.TweenLite.to(el, 0.5, {delay: 1, opacity: 1});
  }

  /**
   * Moving the width and height.
   */
  shrinkit() {
    let el = this.img.nativeElement;
    gsap.TweenLite.to(el, 0.5, {width: '50%', height: '50%'});
    gsap.TweenLite.to(el, 0.5, {delay: 1, width: '100%', height: '100%'});
  }

  /**
   * Lets shake the baby.
   */
  shakeit() {
    let el = this.img.nativeElement;
    gsap.TweenLite.fromTo(el, 1, {x:-1}, {
      x:1, 
      ease: new gsap.RoughEase({
        strength: 8, 
        points: 20, 
        template: gsap.Linear.easeNone, 
        randomize:false
      }) , clearProps:"x"});
  }

  /**
   * Applies 3d transformations.
   */
  rotate() {
    let el = this.img.nativeElement;
    gsap.TweenLite.set(el.parentElement, {perspective:400});
    gsap.TweenLite.to(el, 3, {shortRotationX:180});
    gsap.TweenLite.to(el, 3, {shortRotationY:180});
    gsap.TweenLite.to(el, 3, {delay: 3, shortRotationX:360});
    gsap.TweenLite.to(el, 3, {delay: 3, shortRotationY:360});
  }

  /**
   * Cleaning the properties of the image.
   */
  reset() {
    gsap.TweenMax.killAll(true, false, false);
    gsap.TweenMax.set(this.img.nativeElement, {clearProps:"all"});
  }
}
