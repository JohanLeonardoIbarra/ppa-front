import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Token, User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TransversalAxis, TransversalAxisType } from '../interfaces/transversalAxis.interface';

@Injectable({
  providedIn: 'root',
})
export class AxisService {
  private _apiURl = environment.apiURL;

  constructor(private http: HttpClient, private router: Router) {}

  listTransversalAxis(): Observable<TransversalAxis[]> {
    return this.http.get<TransversalAxis[]>(`${this._apiURl}/eje/api/eje`);
  }

  listTransversalAxisTypes(): Observable<TransversalAxisType[]> {
    return this.http.get<TransversalAxisType[]>(`${this._apiURl}/tipo_eje/api/tipo_eje`);
  }
}
