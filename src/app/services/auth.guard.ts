import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar
  ) {

  }

  canActivate() {
    return this.auth.user$.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this.router.navigate(['/login']);
        this.snackBar.open('Please Join us to order products', 'Close' , {
          duration: 5000
        });
        return false;
      })
    );
  }
}
