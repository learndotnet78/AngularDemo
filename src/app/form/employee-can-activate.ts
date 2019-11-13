import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ConcatSource } from 'webpack-sources';
import { EmployeeService } from 'src/services/employeeservice';

export class EmployeeDetailsGuardService implements CanActivate{

    constructor(private _empService : EmployeeService, private _router : Router) {}
        
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const employeeExists =  !!this._empService.getEmployee(+route.paramMap.get('id'));

      if (employeeExists){
          return true;
      }
      else{
          this._router.navigate(['notfound']);
          return false;
      }
    }
}