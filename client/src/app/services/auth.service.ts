import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {}
  
    // login(email: string, password: string) {
    //   // Implementation for login functionality
    //   return this.http.post('/api/login', { email, password });
    // }
  
    register(email: string, password: string, firstName: string, lastName: string) {
      // Implementation for user registration functionality
      return this.http.post('http://localhost:3030/users/register', { email, password, firstName, lastName });
    }
  
    // logout() {
    //   // Implementation for logout functionality
    //   return this.http.post('/api/logout', {});
    // }
}
