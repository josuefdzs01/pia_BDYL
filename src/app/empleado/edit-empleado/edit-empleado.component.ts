import { empleadoData } from './../../models/dataEmpleado';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultorioService } from 'src/app/services/consultorio.service';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html'
})
export class EditEmpleadoComponent implements OnInit, OnChanges {
  @Input() datosEditar: any;

  ciudad: any=[];
  puesto: any=[];
  turno: any=[];

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

  }

}
