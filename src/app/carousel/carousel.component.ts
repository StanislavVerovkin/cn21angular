import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
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
})

export class CarouselComponent implements OnInit {
  @Input() images: Array<string>;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  public counter = 0;

  ngOnInit() {
    // this.changeImages();
  }

  onClickThumb(event) {
    const total = this.images.length - 1;
    this.counter = event.layerX < 150 ? this.dec(total) : this.inc(total);
    this.change.emit(this.counter);
  }

  // changeImages() {
  //   setInterval(() => {
  //     const total = this.images.length;
  //     this.counter = this.counter >= 0 && this.counter !== 2 ? this.inc(total) : this.dec(total);
  //     this.change.emit(this.counter);
  //   }, 4000);
  // }

  inc(total) {
    return (this.counter < total) ? this.counter + 1 : 0;
  }

  dec(total) {
    return (this.counter > 0) ? this.counter - 1 : total;
  }
}
