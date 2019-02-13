import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.email,
        Validators.required
      ])
    });
  }

  onSubmit(value) {
    this.spinner.show();
    this.authService.resetPassword(value.email)
      .then(() => {
        this.router.navigate(['/login']);
        this.spinner.hide();
        this.snackBar.open('Link for change password successfully sent', 'Close', {
          duration: 5000
        });
      });
  }
}
