import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {User} from '../models/user.model';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private http: HttpClient,
              private fb: AngularFireAuth,
              private userService: UserService
  ) {
    this.user$ = this.fb.authState;
  }

  registration(email, password) {
    return this.fb.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email, password) {
    return this.fb.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fb.auth.signOut();
  }

  get appUser$(): Observable<User> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.userService.getUserObject(user.uid).valueChanges()
          }
          return of(null);
        })
      );
  }
}
