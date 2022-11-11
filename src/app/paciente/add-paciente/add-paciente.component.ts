import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html'
})
export class AddPacienteComponent implements OnInit {

  pacienteForm = new FormGroup({
    namePaciente: new FormControl('', [Validators.required]),
    emailPaciente: new FormControl('', [Validators.required]),
    phonePaciente: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    addressPaciente: new FormControl('', [Validators.required]),
    contactoEmergID: new FormControl('', [Validators.required])
  })

  contactoEmergForm = new FormGroup({
    nameEmergencia: new FormControl('', [Validators.required]),
    emailEmergencia: new FormControl('', [Validators.required]),
    phoneEmergencia: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
    
  }

  onAddConsulta(data:any){
    console.log(data)
  }

}
