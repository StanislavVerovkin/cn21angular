import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../services/contact.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public form;

  constructor(
    private contactService: ContactService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
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
    this.spinner.show();
    this.contactService.sendMessage(value)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.router.navigate(['/products']);
        },
        error: err => console.log(err)
      });
  }
}
