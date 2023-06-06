import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Token, User } from '../interfaces/user.interface';
import { Observable, timer } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiURl = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User, type: Boolean): Observable<User> {
    const userType = type ? 1 : 2;
    return this.http.post<User>(
      `${this._apiURl}/usuario/api/usuario/${userType}`,
      user
    );
  }

  login(loginData: Login): void {
    this.http
      .post<Token>(`${this._apiURl}/auth/api/login`, loginData)
      .subscribe({
        next: (token: Token) => {
          localStorage.setItem('session', token.token);
          this.router.navigate(['pl', 'dashboard']);
        },
      });
  }

  logout(): void {
    localStorage.removeItem('session');
    this.router.navigate(['auth', 'login']);
  }
}
