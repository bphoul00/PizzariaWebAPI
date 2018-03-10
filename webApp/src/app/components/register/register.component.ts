import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;

  constructor(private fb: FormBuilder) {
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
    console.log(this.form.valid);
  }

  isValid(control) {
    return this.form.controls[control].invalid && this.form.controls[control].touched;
  }

  ngOnInit() {
  }

}
