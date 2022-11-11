import { empleadoData } from './../../models/dataEmpleado';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultorioService } from 'src/app/services/consultorio.service';
declare var $: any;

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html'
})
export class EditEmpleadoComponent implements OnInit, OnChanges {
  @Input() datosEditar: any;
  @Output() reloadTable = new EventEmitter();

  ciudad: any=[];
  puesto: any=[];
  turno: any=[];

  empleadoID: any;

  editEmpleadoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ciudad: new FormControl('', [Validators.required]),
    puesto: new FormControl('', [Validators.required]),
    turno: new FormControl('', [Validators.required])
  })

  constructor(private _authService: AuthServiceService,
    private _consultorio: ConsultorioService,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService) {
      this.editEmpleadoForm.setValue({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        ciudad: '',
        puesto: '',
        turno: ''
      })
     }

  ngOnInit(): void {
    this.getAllPuesto();
    this.getAllTurno();
    this.getAllCity();
  }

  ngOnChanges(){
    console.log(this.datosEditar);
    this.empleadoID = this.datosEditar.id_empleado;
    this.editEmpleadoForm.setValue({
      nombre: this.datosEditar.name_empleado,
      email: this.datosEditar.email_empleado,
      telefono: this.datosEditar.phone_empleado,
      password: this.datosEditar.password_empleado,
      ciudad: this.datosEditar.id_ciudadEmpFK,
      puesto: this.datosEditar.id_puesto,
      turno: this.datosEditar.id_turno
    })
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

  onEditEmpleado(data:any){
    this._spinner.show()
    console.log(this.empleadoID);
    data = {
      name_empleado: this.editEmpleadoForm.controls.nombre.value,
      email_empleado: this.editEmpleadoForm.controls.email.value,
      phone_empleado: this.editEmpleadoForm.controls.telefono.value,
      password_empleado: this.editEmpleadoForm.controls.password.value,
      id_ciudadEmpFK: this.editEmpleadoForm.controls.ciudad.value,
      id_turno: this.editEmpleadoForm.controls.turno.value,
      id_puesto: this.editEmpleadoForm.controls.puesto.value
    }
    if(data.phone_empleado.length >= 10){
      if(data.password_empleado.length >= 6){  
        if(data.id_ciudadEmpFK > 0 && data.id_puesto > 0 && data.id_turno > 0){
          this._consultorio.editEmpleado(data, this.empleadoID).then((response:any) => {
            if(response.StatusCode == 200){
              this._spinner.hide();
              this._toastr.success('Editaco correctamente.');
              this.reloadTable.emit('saveOk');
              $('#closeModal').click();
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
