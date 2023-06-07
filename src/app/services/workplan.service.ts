import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivityPT, WorkPlan } from '../interfaces/workplan.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkplanService {
  private _apiURl = environment.apiURL;

  constructor(private http: HttpClient) {}

  list(): Observable<WorkPlan[]> {
    return this.http.get<WorkPlan[]>(`${this._apiURl}/pt/api/plantrabajo`);
  }

  create(workPlan: WorkPlan): Observable<unknown> {
    return this.http.post(`${this._apiURl}/pt/api/plantrabajo`, workPlan);
  }

  createActivity(activity: ActivityPT, id: number): Observable<unknown> {
    return this.http.post(
      `${this._apiURl}/apt/api/actividadpt/${id}`,
      activity
    );
  }

  listActivitys(id: number): Observable<ActivityPT[]> {
    return this.http.get<ActivityPT[]>(
      `${this._apiURl}/pt/api/actividadespt/${id}`
    );
  }
}
