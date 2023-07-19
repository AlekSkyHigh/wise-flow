import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(email: string, password: string, firstName: string, lastName: string) {
    return this.http.post(environment.apiUrl + 'users/register', { email, password, firstName, lastName });
  }

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl + 'users/login', { email, password });
  }

  logout() {
    // Clear the local storage
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check if the token exists and is valid
    return !!token;
  }



  //** Functions of my first (legacy) approach that I dont use anymore, but I value:
  //* Decode the token with a pure js and returns the user _id:
  // getCurrentUserId(): string {
  //   const token = localStorage.getItem('token');
    // Decoding the token to extract the user ID
  //   const decodedToken = JSON.parse(atob(token!.split('.')[1]));

  //   return decodedToken._id;
  // }
  // * Get user data:
  // fetchUserData(userId: string): Observable<string> {
  //   const url = `${environment.apiUrl}users/${userId}`;
  //   return this.http.get<string>(url);
  // }
}
