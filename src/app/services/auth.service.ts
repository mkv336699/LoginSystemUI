import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return this.http.post('/auth/login', { email, password }).pipe(
      map((res: any) => {
        return res;
        // if (res.success == true) {
        //   return res.data;
        // } else {
        //   return res.errors;
        // }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('get login err', err.message);
        return of(false);
      })
    );
  }

  register(name: string, gender: string, email: string, password: string) {
    return this.http.post('/user', { name, email, gender, password }).pipe(
      map((res: any) => {
        // if (res.success == true) {
        return res;
        // } else {
        //   return null;
        // }
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('get login err', err.message);
        return of(false);
      })
    );
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider).then((result: any) => {
      console.log("sign in result", result);
      console.log('You have been successfully logged in!')
      return result;
    }).catch((error: any) => {
      console.log(error)
    })
  }

  loginViaGoogle(name: string, gender: string, email: string, profile_pic: string) {
    return this.http.post('/auth/loginViaGoogle', { name, email, gender, profile_pic }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('get login err', err.message);
        return of(false);
      })
    );
  }
}
