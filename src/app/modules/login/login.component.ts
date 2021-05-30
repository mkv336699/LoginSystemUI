import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDialogComponent } from 'src/app/general/dialogs/login-dialog/login-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dialogRef: any;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("email") != null) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.dialogRef = this.dialog.open(LoginDialogComponent, {
      width: "600px",
      data: {}
    });
    this.dialogRef.afterClosed().subscribe((action: any) => {
      console.log("dialog afterclose", action);

      // 3 cases - add, register, google
      if (action && action.type == 'add') {

        this.authService.login(action.data.email, action.data.password).subscribe(res => {
          console.log("login", res);

          // If user found then login else register the user
          if (res.success == true) {
            this._snackBar.open('Login Successful', '', { duration: 5 * 1000 });
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('name', res.data.name);
            if (action.rememberMe) {
              document.cookie = `password=${res.data.password}`;
              document.cookie = `email=${res.data.email}`;
            }
            this.router.navigate(['/dashboard']);
          } else {
            if (res.errors[0] == 'No such user found') {

              this.dialogRef = this.dialog.open(LoginDialogComponent, {
                width: "600px",
                data: {
                  email: action.data.email,
                  password: action.data.password,
                  showAddForm: false,
                }
              });

              this.dialogRef.afterClosed().subscribe((action: any) => {
                this.authService.register(action.data.name, action.data.gender, action.data.email, action.data.password).subscribe(res => {
                  console.log("register", res);
                  if (res) {
                    localStorage.setItem('email', action.data.email);
                    localStorage.setItem('name', action.data.name);
                    this.router.navigate(['/dashboard']);
                  }
                });
              });

            }
          }
        });

      } else if (action && action.type == 'register') {
        this.authService.register(action.data.name, action.data.gender, action.data.email, action.data.password).subscribe(res => {
          console.log("register", res);
          if (res) {
            localStorage.setItem('email', action.data.email);
            localStorage.setItem('name', action.data.name);
            this.router.navigate(['/dashboard']);
          }
        });
      } else if (action && action.type == "google") {
        this.authService.loginViaGoogle(action.data.name, '', action.data.email, action.data.profile_pic).subscribe(res => {
          console.log("loginViaGoogle", res);
          if (res.success == true) {
            this._snackBar.open('Login Successful', '', { duration: 5 * 1000 });
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('name', res.data.name);
            this.router.navigate(['/dashboard']);
          }
        });
      }
    });
  }

}
