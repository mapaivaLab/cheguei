import {Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';

@Directive({
    selector: '[longPress]',
    outputs: ['longPress']
})
export class LongPressDirective {
  static get parameters() {
    return [[ElementRef]];
  }

  constructor(el) {
    this.el = el.nativeElement;
    this.longPress = new EventEmitter();

    this.pressGesture = new Gesture(this.el);
    this.pressGesture.listen();
    this.pressGesture.on('press', e => {
        this.longPress.emit(e);
    });
  }

  ngOnDestroy() {
    this.pressGesture.destroy();
  }
}
