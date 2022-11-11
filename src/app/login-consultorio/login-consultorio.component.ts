import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login-consultorio',
  templateUrl: './login-consultorio.component.html'
})
export class LoginConsultorioComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  dataLogin: any;

  constructor(private _authService: AuthServiceService,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onLogin(){
    this._spinner.show()
    const{email, password} = this.loginForm.value;
    let data = {
      email_consul: email,
      password_consul: password
    }
    this._authService.loginConsultorio(data).then((response:any) => {
      if(response.StatusCode == 200){
        this._toastr.success('Inicio sesión con exito');
        this._spinner.hide();
        this._router.navigate(['/empleado']);
      }else{
        this._toastr.error('Hubo un error al iniciar sesion, intenta nuevamente');
        this._spinner.hide();
      }
    })
  }

}
