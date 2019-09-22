import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {
  }

  sendMessage(value) {
    return this.http.post('https://c-n-21.com/server/mailer.php', value);
  }
}
