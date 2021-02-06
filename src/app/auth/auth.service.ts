import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  idToken: string;     //	A Firebase Auth ID token for the newly created user.
  email: string;       //	The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	  // The number of seconds in which the ID token expires.
  localId: string;      //	The uid of the newly created user.
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = environment.firebaseApiKey;
  user = new BehaviorSubject<User>(null);
  private tokenExpTimer: any = null;


  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(this.handleAuth.bind(this))
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),
        tap(this.handleAuth.bind(this))
      );
  }

  private handleAuth(respData: AuthResponseData): void {
    const expiresDate = new Date(new Date().getTime() + +respData.expiresIn * 1000);
    const usnewUserer = new User(respData.email, respData.localId, respData.idToken, expiresDate);
    this.user.next(usnewUserer);
    this.autoLogout(+respData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(usnewUserer));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationMillSec: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationMillSec);
    }
  }

  private handleError(erroresp: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown Error Occured!';
    if (!erroresp.error || !erroresp.error.error) {
      return throwError(errorMessage);
    }
    switch (erroresp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account!';
        break;
      case 'INVALID_ID_TOKEN':
        errorMessage = 'The user\'s credential is no longer valid.The user must sign in again!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier.The user may have been deleted!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password!';
        break;
      default:
        break;
    }
    return throwError(errorMessage);
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogout(expDurationMilliSec: number) {
    console.log(+expDurationMilliSec / 60000);

    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDurationMilliSec);

  }

}
