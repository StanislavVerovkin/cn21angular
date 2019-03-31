import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {WelcomeDialogComponent} from '../dialogs/welcome-dialog/welcome-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public firstImage;
  public secondImage;

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    // this.welcomeBanner();
    this.changeImage();
  }

  changeImage() {

    let images = [
        '../../assets/images/1.jpg',
        '../../assets/images/1.jpg',
        // '../../assets/images/3.jpg',
        // '../../assets/images/4.jpg',
        // '../../assets/images/5.jpg',
        // '../../assets/images/6.jpg',
      ],

      i = -1;

    setInterval(() => {
      i < images.length && i !== 5 ? i += 1 : i = 0;
      this.firstImage = images[i];
      this.secondImage = images[i];
      if (i === 5) {
        this.secondImage = images[i - 1];
      }
    }, 2000);
  }

  // welcomeBanner() {
  //   setTimeout(() => {
  //     this.dialog.open(WelcomeDialogComponent, {
  //       height: '400px',
  //       width: '600px',
  //     });
  //   }, 5000);
  // }
}
