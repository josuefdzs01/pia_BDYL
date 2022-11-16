import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { PacienteService } from 'src/app/services/paciente.service';
declare var $: any;

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.component.html'
})
export class EditCitaComponent implements OnInit, OnChanges {
  @Input() datosEditar: any;
  @Input() id_consultorio: any; 
  @Output() reloadTable = new EventEmitter();
  pacienteID: any;

  ciudad: any=[];
  puesto: any=[];
  turno: any=[];
  doctores?: any=[];

  idEmpleado:any ;

  nameConsultorio:any ;
  idConsultorio:any ;

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
    ciudad_contacto: new FormControl('', [Validators.required]),
    doctor: new FormControl('', [Validators.required]),
    dateCita: new FormControl('', [Validators.required])
  })

  constructor(private _authService: AuthServiceService,
    private _consultorio: ConsultorioService,
    private _paciente: PacienteService,
    private _router: Router,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService) {
    this.pacienteForm.setValue({
      namePaciente: '',
      birthPaciente: '',
      emailPaciente: '',
      phonePaciente: '',
      contactoEmergID: '',
      ciudad_pac: ''
    })
    this.contactoEmergForm.setValue({
      nameEmergencia: '',
      emailEmergencia: '',
      phoneEmergencia: '',
      ciudad_contacto: '',
      doctor: '',
      dateCita: ''
    })
  }

  ngOnInit(): void {
    this.getAllCity();
    this.idConsultorio = this._authService.responseEmpleado[0]['id_consul'];
    this.getDoctores(this.idConsultorio);
  }
  
  ngOnChanges(): void {
    if(this.datosEditar != undefined){
      this.pacienteID = this.datosEditar.id_pacConsulta;
      this.pacienteForm.setValue({
        namePaciente: this.datosEditar.name_paciente,
        birthPaciente: this.datosEditar.fechaNac_paciente,
        emailPaciente: this.datosEditar.email_paciente,
        phonePaciente: this.datosEditar.phone_paciente,
        contactoEmergID: this.datosEditar.id_pacContacto,
        ciudad_pac: this.datosEditar.id_ciudadPaciente
      })
      this.contactoEmergForm.setValue({
        nameEmergencia: this.datosEditar.name_pacContacto,
        emailEmergencia: this.datosEditar.email_pacContacto,
        phoneEmergencia: this.datosEditar.phone_pacContacto,
        ciudad_contacto: this.datosEditar.id_ciudadContFK,
        doctor: this.datosEditar.id_empleado,
        dateCita: this.datosEditar.fechaCita
      })
    }
  }

  getAllCity(){
    this._authService.getAllCiudad().then((response:any) => {
      this.ciudad = response;
      this._spinner.hide();
    })
  }

  onEditPaciente(dataPaciente:any, dataContacto:any){
    let contacto = {
      name_contacto: dataContacto.nameEmergencia,
      email_contacto: dataContacto.emailEmergencia,
      phone_contacto: dataContacto.phoneEmergencia,
      id_ciudadContFK: dataContacto.ciudad_contacto
    }
    console.log(this.datosEditar);
    this._paciente.editContacto(contacto, this.datosEditar.id_pacContacto).then((response: any) => {
      this._paciente.getAllContactos(contacto.email_contacto).then((response2:any) => {
        let pacienteNew = {
          name_paciente: dataPaciente.namePaciente,
          email_paciente: dataPaciente.emailPaciente,
          phone_paciente: dataPaciente.phonePaciente,
          fechaNac_paciente: dataPaciente.birthPaciente,
          id_ciudadPacFK: dataPaciente.ciudad_pac,
          id_contacto:response2[0]['id_contacto'],
          id_empleado: dataContacto.doctor,
        }
        this._paciente.editPaciente(pacienteNew, this.datosEditar.id_pacConsulta).then((response3:any) => {
          this._toastr.success('Paciente dado de alta.');
            let cita = {
              id_pacConsulta: this.datosEditar.id_pacConsulta,
              id_empConsulta: this.datosEditar.id_empleado,
              fechaCita: dataContacto.dateCita,
              peso: '1',
              altura: '1',
              temperatura: '1',
              padecimiento: '1'
            }
            this._paciente.editCita(cita, cita.id_pacConsulta).then((response5:any) => {
              if(response.StatusCode == 200){
                this._toastr.success('Cita editada.');
                this._spinner.hide();
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
    })
  }

  getDoctores(idConsultorio: any){
    this._consultorio.getDoctor(1, idConsultorio).then((doctor: any) => {
      this.doctores = doctor;
    })
  }
}
