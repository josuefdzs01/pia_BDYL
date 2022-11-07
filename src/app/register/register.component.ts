import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { user } from '../models/registro-auth';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public documentId: any;
  public currentStatus = 1;

  consul: user[] = []

  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })


  constructor(private _authService: AuthServiceService,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService) {
    this.registerForm.setValue({
      nombre: '',
      telefono: '',
      email: '',
      address: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }

  onRegister(form: any){
    this._spinner.show()
    let data = {
      name_consul: form.nombre,
      email_consul: form.email,
      phone_consul: form.telefono,
      address: form.address,
      password_consul: form.password
    }
    console.log(data);
    if(data.phone_consul.length >= 10){
      if(data.password_consul.length >= 6){        
        this._authService.registerConsultorio(data).then((response:any) => {
          console.log(response);
          if(response.StatusCode == 200){
            this._spinner.hide();
            this._toastr.success('Consultorio creado con exito.');
            this._router.navigate(['/loginConsultorio']);
          }else if(response.StatusCode == 100) {
            this._toastr.error('Hubo un error al crear el consultorio, intenta de nuevo.');
            this._spinner.hide();
          }
        }).catch((error:any) => {
          this._toastr.error('Hubo un error al crear el consultorio, intenta de nuevo.');
          this._spinner.hide();
        });
      }else{
          this._toastr.error('La contraseña debe ser mayor a 6 digitos');
          this._spinner.hide();
      }
    }else{
      this._toastr.error('Verifique el telefono proporcionado');
      this._spinner.hide();
    }
  }

}
