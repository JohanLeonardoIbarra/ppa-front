import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private _form: FormGroup = this.fb.group({
    'email': [''],
    'password': ['']
  });

  constructor(private fb: FormBuilder, private authService: AuthService){}

  get form(): FormGroup {
    return this._form
  }

  login(){
    const loginData: Login = {
      correo_electronico: this._form.controls['email'].value,
      password: this._form.controls['password'].value,
    };

    this.authService.login(loginData);
  }
}
