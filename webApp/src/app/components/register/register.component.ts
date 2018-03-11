import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group ({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmation: ['', Validators.required],
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  onSubmit() {
    this.auth.register(this.form.value);
  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched;
  }

  ngOnInit() {
  }

}
