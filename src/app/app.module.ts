import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginConsultorioComponent } from './login-consultorio/login-consultorio.component';
import { LoginEmpleadoComponent } from './login-empleado/login-empleado.component';
import { RegisterComponent } from './register/register.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { PacienteComponent } from './paciente/paciente.component';
import { AddPacienteComponent } from './paciente/add-paciente/add-paciente.component';
import { AddEmpleadoComponent } from './empleado/add-empleado/add-empleado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from 'ngx-spinner';
import { GridModule } from '@progress/kendo-angular-grid';
import { EditEmpleadoComponent } from './empleado/edit-empleado/edit-empleado.component';
import { EditPacienteComponent } from './paciente/edit-paciente/edit-paciente.component';
import { AddConsultaComponent } from './paciente/add-consulta/add-consulta.component';
import { SecretarioComponent } from './secretario/secretario.component';
import { AddCitaComponent } from './secretario/add-cita/add-cita.component';
import { EditCitaComponent } from './secretario/edit-cita/edit-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginConsultorioComponent,
    LoginEmpleadoComponent,
    RegisterComponent,
    EmpleadoComponent,
    PacienteComponent,
    AddPacienteComponent,
    AddEmpleadoComponent,
    EditEmpleadoComponent,
    EditPacienteComponent,
    AddConsultaComponent,
    SecretarioComponent,
    AddCitaComponent,
    EditCitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-circus' }),
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
