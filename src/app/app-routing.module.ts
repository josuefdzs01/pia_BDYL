import { EmpleadoComponent } from './empleado/empleado.component';
import { PacienteComponent } from './paciente/paciente.component';
import { RegisterComponent } from './register/register.component';
import { LoginEmpleadoComponent } from './login-empleado/login-empleado.component';
import { LoginConsultorioComponent } from './login-consultorio/login-consultorio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'loginConsultorio', component:LoginConsultorioComponent},
  {path: 'loginEmpleado', component:LoginEmpleadoComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'paciente', component:PacienteComponent},
  {path: 'empleado', component:EmpleadoComponent},
  {path: '', redirectTo: '/loginConsultorio', pathMatch: 'full'},
  {path: '**', redirectTo: '/loginConsultorio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
