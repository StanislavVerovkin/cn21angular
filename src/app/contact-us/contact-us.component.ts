import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public form;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      'name': new FormControl('', [
        Validators.required
      ]),
      'message': new FormControl('', [
        Validators.required
      ]),
    });
  }

  get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }

  get message() {
    return this.form.get('message');
  }

  onSubmit(value) {
    this.contactService.sendMessage(value)
      .subscribe({
        next: data => console.log(data),
        error: err => console.log(err)
      });
  }
}
