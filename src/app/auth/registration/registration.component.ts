import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material';
import {concat} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
  ) {
    this.authService.user$
      .subscribe(user => {
        if (user) {
          this.userService.addUserToDb(user);
        }
      });
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      'address': new FormControl('', [
        Validators.required
      ]),
      'mobile': new FormControl('', [
        Validators.required
      ]),
      'city': new FormControl('', [
        Validators.required
      ]),
      'postal_code': new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(value) {
    const {email, password} = value;

    this.spinner.show();

    concat(
      this.authService.registration(email, password),
      this.userService.addUserToDbWithParameters(value)
    )
      .subscribe({
        complete: () => {
          this.router.navigate(['/']);
          this.spinner.hide();
        },
        error: (error) => {
          this.spinner.hide();
          this.snackBar.open(error.message, 'Close', {
            duration: 5000
          });
        }
      });
  }
}

