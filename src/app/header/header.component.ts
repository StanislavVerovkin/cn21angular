import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  appUser: User;

  constructor(private fb: AngularFireAuth,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.authService.appUser$
      .subscribe((appUser) => {
        this.appUser = appUser;
        this.spinner.hide();
      });
  }

  onLogout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.snackBar.open(error.message, 'Close');
      });
  }
}
