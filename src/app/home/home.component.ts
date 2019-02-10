import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public firstImage;
  public secondImage;


  constructor() {
  }

  ngOnInit() {
    this.changeImage();
  }

  changeImage() {

    let images = [
        '../../assets/1.jpg',
        '../../assets/2.jpg',
        '../../assets/3.jpg',
        '../../assets/4.jpg',
        '../../assets/5.jpg',
        '../../assets/6.jpg'
      ],

      i = -1;

    setInterval(() => {
      i < images.length && i !== 5 ? i += 1 : i = 0;
      this.firstImage = images[i];
      if (i === 5) {
        this.secondImage = images[i - 1];
      } else {
        this.secondImage = images[i + 1];
      }
    }, 3000);
  }
}
