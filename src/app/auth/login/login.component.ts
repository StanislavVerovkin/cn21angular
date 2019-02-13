import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const {email, password} = this.form.value;

    this.spinner.show();
    this.authService.login(email, password)
      .then(() => {
          this.spinner.hide();
          this.router.navigate(['/products']);
        }
      )
      .catch((error) => {
        this.spinner.hide();
        this.snackBar.open(error.message, 'Close', {
          duration: 5000
        });
      });
  }
}
