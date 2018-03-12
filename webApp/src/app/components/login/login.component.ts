import { Component, OnInit } from '@angular/core';
import { AuthService } from './../register/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  loginData = {
    email: '',
    password: ''
  }

  login(){
    this.auth.login(this.loginData);
  }



  ngOnInit() {
  }

}
