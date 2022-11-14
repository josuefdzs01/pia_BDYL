import { PacienteService } from './../../services/paciente.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultorioService } from 'src/app/services/consultorio.service';
declare var $: any;

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html'
})
export class AddPacienteComponent implements OnInit {
  @Input() id_empleado: any;
  @Output() savePaciente = new EventEmitter();
  @Output() reloadTable = new EventEmitter();

  ciudad?: any=[];
  puesto?: any=[];
  turno?: any=[];

  pacienteForm = new FormGroup({
    namePaciente: new FormControl('', [Validators.required]),
    birthPaciente: new FormControl('', [Validators.required]),
    emailPaciente: new FormControl('', [Validators.required]),
    phonePaciente: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    contactoEmergID: new FormControl('', [Validators.required]),
    ciudad_pac: new FormControl('', [Validators.required])
  })

  contactoEmergForm = new FormGroup({
    nameEmergencia: new FormControl('', [Validators.required]),
    emailEmergencia: new FormControl('', [Validators.required]),
    phoneEmergencia: new FormControl('', [Validators.required]),
    ciudad_contacto: new FormControl('', [Validators.required])
  })

  constructor(private _authService: AuthServiceService,
    private _consultorio: ConsultorioService,
    private _paciente: PacienteService,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllCity()
    this.getAllPuesto()
    this.getAllTurno()
  }

  onAddPaciente(dataPac:any, dataCont:any){
    let contacto = {
      name_contacto: dataCont.nameEmergencia,
      email_contacto: dataCont.emailEmergencia,
      phone_contacto: dataCont.phoneEmergencia,
      id_ciudadContFK: dataCont.ciudad_contacto
    }
    this._paciente.registerContacto(contacto).then((response: any) => {
      this._paciente.getAllContactos(contacto.email_contacto).then((response2:any) => {
        let pacienteNew = {
          name_paciente: dataPac.namePaciente,
          email_paciente: dataPac.emailPaciente,
          phone_paciente: dataPac.phonePaciente,
          fechaNac_paciente: dataPac.birthPaciente,
          id_ciudadPacFK: dataPac.ciudad_pac,
          id_contacto:response2[0]['id_contacto'],
          id_empleado: this.id_empleado
        }
        this._paciente.registerPaciente(pacienteNew).then((response3:any) => {
          if(response.StatusCode == 200){
            this._spinner.hide();
            this._toastr.success('Paciente dado de alta.');
            this.reloadTable.emit('saveOk');
            this.pacienteForm.reset()
            this.contactoEmergForm.reset()
            $('#closeModal').click();
          }else if(response.StatusCode == 100) {
            this._toastr.error('Hubo un error al dar de alta el empleado, intenta de nuevo.');
            this._spinner.hide();
          }
        })
      })
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

  resetForm(){
    this.pacienteForm.reset();
    this.contactoEmergForm.reset();
  }

}
