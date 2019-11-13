import { CanDeactivate } from '@angular/router';
import { FormComponent } from './form.component'
import { Injectable } from '@angular/core';

@Injectable()
export class CreateEmployeeCanDeactivate implements CanDeactivate<FormComponent>{
    canDeactivate(component : FormComponent ): boolean{
        if( component.CreateEmployeeForm.dirty){
            return confirm("Are you want to cancel?");
        }

        return true;
}
}
