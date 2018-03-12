import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:3000';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  constructor(private http: Http, private router: Router) {}

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader () {
    var header = new Headers({'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
    return new ResponseOptions({ headers: header});
  }

  register(user) {
    delete user.confirmation;
    this.http.post(this.BASE_URL +'/auth'+ '/register', user).subscribe(res =>{
      this.authenticated(res);

    });
  }

  login(loginData) {
    this.http.post(this.BASE_URL +'/auth'+ '/login', loginData).subscribe(res =>{
      this.authenticated(res);

    });
   }

   logout() {
     localStorage.removeItem(this.NAME_KEY);
     localStorage.removeItem(this.TOKEN_KEY);
   }

   authenticated (res) {
     var authResponse = res.json();
     if(!authResponse.token){
       return;
     }

     localStorage.setItem(this.TOKEN_KEY, authResponse.token)
     localStorage.setItem(this.NAME_KEY, authResponse.name)
     this.router.navigate(['/']);

   }
/*
   getUser () {
     return this.http.get(this.BASE_URL + 'users/me').map(res => res.json());
   }
   */

}
