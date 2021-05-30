import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidators } from '../../validators/passwordValidator';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    passwords: new FormGroup(
      {
        password: new FormControl("", [
          Validators.required,
          PasswordValidators.requiredLength,
        ]),
        verifyPassword: new FormControl("", [Validators.required]),
      },
    ),
  });

  showAddForm = true;
  rememberMe = false;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log("dialog", this.dialogData, this.loginForm.get('email'));

    if (this.dialogData.showAddForm == false) {
      this.registerForm.get('email')?.patchValue(this.dialogData.email);
      this.registerForm.get('passwords.password')?.patchValue(this.dialogData.password);
      this.registerForm.get('passwords.verifyPassword')?.patchValue(this.dialogData.password);
      this.showAddForm = this.dialogData.showAddForm;
    } else if (document.cookie != null) {
      this.loginForm.get('email')?.patchValue(this.getCookie('email'));
      this.loginForm.get('password')?.patchValue(this.getCookie('password'));
    }
  }

  getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  register() {
    this.showAddForm = false;
  }

  back() {
    this.showAddForm = true;
  }

  login() {
    if (this.showAddForm) {
      const obj = {
        data: this.loginForm.getRawValue(),
        type: 'add',
        rememberMe: this.rememberMe
      }
      this.dialogRef.close(obj);
    } else {
      const obj = {
        data: this.registerForm.getRawValue(),
        type: 'register'
      }
      obj.data['password'] = obj.data.passwords.password;
      // delete obj.data.passwords;
      this.dialogRef.close(obj);
    }
  }

  async onGoogleLogin() {
    console.log("inside google call");

    const test = await this.authService.GoogleAuth();
    console.log("dsadsadsaddsa", test);

    const obj = {
      data: {
        name: test.additionalUserInfo.profile.name,
        email: test.additionalUserInfo.profile.email,
        gender: '',
        profile_pic: test.user.photoURL
      },
      type: 'google'
    }

    this.dialogRef.close(obj);
  }

}
