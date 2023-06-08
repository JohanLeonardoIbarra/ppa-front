import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivityAP, ActivityAPCreation, AulaProject, Grade } from '../interfaces/aulaProject.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AulaProjectsService {
  private _apiURl = environment.apiURL;

  constructor(private http: HttpClient) {}

  create(aulaProject: AulaProject): Observable<unknown> {
    return this.http.post(`${this._apiURl}/pa/api/proyectoaula`, aulaProject, {
      headers: {
        Authorization: [localStorage.getItem('session')!],
      },
    });
  }

  list(): Observable<AulaProject[]> {
    return this.http.get<AulaProject[]>(`${this._apiURl}/pa/api/proyectoaula`);
  }

  grades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this._apiURl}/grado/api/grado`);
  }

  createActivity(body: ActivityAPCreation, id: number): Observable<unknown> {
    return this.http.post(`${this._apiURl}/apa/api/actividadpa/${id}`, body, {
      headers: {
        Authorization: [localStorage.getItem('session')!]
      }
    });
  }

  listActivities(id: number): Observable<ActivityAP[]> {
    return this.http.get<ActivityAP[]>(`${this._apiURl}/pa/api/actividadespa/${id}`)
  }
}
