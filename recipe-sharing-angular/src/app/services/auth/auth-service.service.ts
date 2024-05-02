import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseURL = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  authSubject = new BehaviorSubject<any>({
    user: null,
  });

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/auth/sign-in`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/auth/sign-up`, userData);
  }

  getUserProfile(): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });

    return this.http
      .post<any>(`${this.baseURL}/api/user/profile`, { header })
      .pipe(
        tap((user) => {
          console.log('User profile');
          const currentState = this.authSubject.value;
          this.authSubject.next({
            ...currentState,
            user,
          });
        })
      );
  }

  logout() {
    localStorage.clear();
    this, this.authSubject.next({});
  }
}
