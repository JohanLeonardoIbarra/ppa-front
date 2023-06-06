import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private _form: FormGroup;

  public constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this._form = fb.group({
      cedula: [''],
      nombre: [''],
      apellido: [''],
      numero_telefono: [''],
      correo_electronico: [''],
      password: [''],
      repeat_password: [''],
      type: [true],
    });
  }

  get form(): FormGroup {
    return this._form;
  }

  private resetForm() {
    const empty = {
      cedula: '',
      nombre: '',
      apellido: '',
      numero_telefono: '',
      correo_electronico: '',
      password: '',
      repeat_password: '',
      type: true,
    }

    this._form.reset(empty)
  }

  public register() {
    const user = {
      cedula: this._form.controls['cedula'].value,
      nombre: this._form.controls['nombre'].value,
      apellido: this._form.controls['apellido'].value,
      numero_telefono: this._form.controls['numero_telefono'].value,
      correo_electronico: this._form.controls['correo_electronico'].value,
      password: this._form.controls['password'].value,
    };

    this.authService.register(user, this._form.controls['type'].value).subscribe({
      next: () => {
        this.resetForm();
        this.toastr.success('Usuario registrado con exito')
      },
      error: (error) => console.log(error)
    });
  }
}
