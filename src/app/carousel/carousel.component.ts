import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-carousel',
  animations: [
    trigger('thumbState', [
      state('inactive', style({
        opacity: 0, transform: 'scale(0.5)'
      })),
      state('active', style({
        opacity: 1, transform: 'scale(1)'
      })),
      transition('inactive => active', animate('500ms cubic-bezier(0.785, 0.135, 0.15, 0.86)')),
      transition('active => inactive', animate('500ms cubic-bezier(0.785, 0.135, 0.15, 0.86)'))
    ])
  ],
  styles: [`
    .carousel {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
    }

    .tmb img {
      width: 400px;
      cursor: pointer;
      box-shadow: 0 0 35px rgba(0, 0, 0, 0.5);
      margin: -200px;
    }
  `],
  template: `
    <div class="carousel">
      <div [@thumbState]="idx === counter ? 'active' : 'inactive'" class="tmb"
           *ngFor="let img of images; let idx = index">
        <img [src]="img" (click)="onClickThumb($event)"/>
      </div>
    </div>
  `
})

export class CarouselComponent {
  @Input() images: Array<string>;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  counter = 1;

  onClickThumb(event) {
    const total = this.images.length - 1;
    this.counter = event.layerX < 150 ? this.dec(total) : this.inc(total);
    this.change.emit(this.counter);
  }

  inc(total) {
    return (this.counter < total) ? this.counter + 1 : 0;
  }

  dec(total) {
    return (this.counter > 0) ? this.counter - 1 : total;
  }
}
