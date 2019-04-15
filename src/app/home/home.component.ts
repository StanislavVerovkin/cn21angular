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

  public images = [
    '../../assets/images/1.jpg',
    '../../assets/images/1.jpg',
  ];

  public i = -1;

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    // this.welcomeBanner();
    this.changeImage();
  }

  changeImage() {
    setInterval(() => {
      this.i < this.images.length ? this.i += 1 : this.i = 0;
      this.firstImage = this.images[this.i];
      this.secondImage = this.images[this.i];
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
