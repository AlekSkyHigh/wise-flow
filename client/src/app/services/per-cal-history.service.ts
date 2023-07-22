import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalcHistory } from '../types/percentage-cal-history.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PerCalHistoryService {

  constructor(private http: HttpClient) { }

  saveHistory(userId: string, history: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'calchistories', {userId, history});
  }

  // Add a new method to fetch calculation history by userId
  getHistoryByUserId(userId: string): Observable<CalcHistory[]> {
    return this.http.get<CalcHistory[]>(environment.apiUrl + `calchistories/${userId}`);
  }
}
