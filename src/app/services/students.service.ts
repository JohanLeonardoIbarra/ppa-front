import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private _apiUrl: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  list(code: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this._apiUrl}/estudiante/api/estudiante`, {
      params: {
        q: code
      }
    });
  }
}
