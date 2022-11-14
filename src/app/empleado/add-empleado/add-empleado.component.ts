import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultorioService } from 'src/app/services/consultorio.service';
declare var $: any;

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html'
})
export class AddEmpleadoComponent implements OnInit, OnChanges {
  @Input() consultorioID: any;
  @Output() reloadTable = new EventEmitter();
  ciudad?: any=[];
  puesto?: any=[];
  turno?: any=[];

  empleadoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ciudad: new FormControl('', [Validators.required]),
    puesto: new FormControl('', [Validators.required]),
    turno: new FormControl('', [Validators.required]),
  })

  constructor(private _authService: AuthServiceService,
    private _consultorio: ConsultorioService,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService) { 
      this.empleadoForm.setValue({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        ciudad: '',
        puesto: '',
        turno: '',
      })
    }

  ngOnInit(): void {
    this.getAllCity()
    this.getAllPuesto()
    this.getAllTurno()
  }

  ngOnChanges() {
      
  }

  getAllCity(){
    this._authService.getAllCiudad().then((response:any) => {
      this.ciudad = response;
      this._spinner.hide();
    })
  }

  getAllPuesto(){
    this._authService.getAllPuesto().then((response:any) => {
      this.puesto = response;
      this._spinner.hide();
    })
  }

  getAllTurno(){
    this._authService.getAllTurno().then((response:any) => {
      this.turno = response;
      this._spinner.hide();
    })
  }

  onAddEmpleado(form: any){
    this._spinner.show()
    let data = {
      name_empleado: form.nombre,
      email_empleado: form.email,
      phone_empleado: form.telefono,
      password_empleado: form.password,
      id_ciudadEmpFK: form.ciudad,
      id_turno: form.turno,
      id_puesto: form.puesto,
      id_consul: this.consultorioID
    }
    if(data.phone_empleado.length >= 10){
      if(data.password_empleado.length >= 6){  
        if(data.id_ciudadEmpFK > 0 && data.id_puesto > 0 && data.id_turno > 0){
          this._consultorio.registerEmpleado(data).then((response:any) => {
            if(response.StatusCode == 200){
              this._spinner.hide();
              this._toastr.success('Empleado dado de alta.');
              this.reloadTable.emit('saveOk');
              $('#closeModal').click();
              this.empleadoForm.reset()
              // location.reload();
            }else if(response.StatusCode == 100) {
              this._toastr.error('Hubo un error al dar de alta el empleado, intenta de nuevo.');
              this._spinner.hide();
            }
          }).catch((error:any) => {
            this._toastr.error('Hubo un error al dar de alta el empleado, intenta de nuevo.');
            this._spinner.hide();
          });
        }else{
          this._toastr.error('Faltan datos por proporcionar');
          this._spinner.hide();
        }    
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
