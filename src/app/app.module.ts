import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule,Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator-directive';
import { EmployeeService } from 'src/services/employeeservice';
import { DisplayEmployeeComponent } from './home/display-employee.component';
import { CreateEmployeeCanDeactivate } from './form/employee-can-deactivate';
import { EmployeeDetailsComponent } from './form/employee-details.component';
import { CreateEmployeeComponent } from './form/create-employee.component';
import { EmployeeListResolverService } from './form/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './form/employee-can-activate';
import { AccordionComponent } from './shared/accordion.component';
import { EmpoyeeApiService } from 'src/services/employeeapi.service';
import { DemoapiComponent } from './demoapi/demoapi.component';


const appRoutes : Routes = [
  { path: 'home', component: HomeComponent, resolve : { employeeList : EmployeeListResolverService}},
  { path: 'edit/:id', component: FormComponent, canDeactivate : [CreateEmployeeCanDeactivate]},
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate : [EmployeeDetailsGuardService]},
  { path: '', redirectTo : '/home', pathMatch : 'full'},
  { path: 'notfound', component: PageNotFoundComponent},
  { path: 'demoapi', component: DemoapiComponent},
  { path: '**', component: HomeComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    SelectRequiredValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    CreateEmployeeComponent,
    PageNotFoundComponent,
    AccordionComponent,
    DemoapiComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService,CreateEmployeeCanDeactivate,EmployeeListResolverService,EmployeeDetailsGuardService,EmpoyeeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
