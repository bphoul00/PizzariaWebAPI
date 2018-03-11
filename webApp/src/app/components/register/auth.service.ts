import { Injectable } from '@angular/core';
import { Http} from '@angular/http';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:3000';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  constructor(private http: Http) {}

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  register(user) {
    delete user.confirmation;
    this.http.post(this.BASE_URL +'/auth'+ '/register', user).subscribe(res =>{
      localStorage.setItem(this.TOKEN_KEY, res.json().token)
      localStorage.setItem(this.NAME_KEY, res.json().name)
    });
  }
}
