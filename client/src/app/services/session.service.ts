import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  createSession(token: any): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): any | null {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }

    return null;
  }

  clearSession(): void {
    localStorage.removeItem('token');
  }

  get hasUser(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

}
