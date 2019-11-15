import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/customvalidators';


@Component({
  selector: 'app-reactform',
  templateUrl: './reactform.component.html',
  styleUrls: ['./reactform.component.css']
})
export class ReactformComponent implements OnInit {
  employeeForm : FormGroup;

  formErrors = {
    'fullName' : '',
    'email' : '',
    'phone' : '',
    'skillName' : '',
    'experienceInYears' : '',
    'proficiency' : ''
  }

  validationMessages = {
    'fullName' : {
      'required' : 'Full name is required',
      'minlength' : 'Full name should be atleast two characters',
      'maxlength' : 'Full name should not be greater than 10 characters',
    },
    'email' : {
      'required' : 'Email is required',
    },
    'phone' : {
      'required' : 'Phone is required',
    },
    'skillName' : {
      'required' : 'Skill name is required',
    },
    'experienceInYears' : {
      'required' : 'Experience is required',
    },
    'proficiency' : {
      'required' : 'Proficiency is required',
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      'fullName' : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      'contactPreference' : ['email'],
      'email' : ['',[Validators.required,CustomValidators.emailDomain('test.com')]],
      'phone' : [''],
      'skills' : this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    
  }

  addSkillButtonClick() : void{
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  onSubmit() : void{

  }

  onContactPrefernceChange(selectedValue :string){
    const phoneFormControl = this.employeeForm.get('phone');

    if (selectedValue === 'phone'){
      phoneFormControl.setValidators(Validators.required);
    }
    else{
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();

  }




  logValidationErrors(group : FormGroup = this.employeeForm) : void {
    Object.keys(group.controls).forEach((key :string) =>{

      const abstractControl = group.get(key);

      this.formErrors[key] = '';  

      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors){
          if (errorKey){
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }

      if (abstractControl instanceof FormArray){
        for(const control of abstractControl.controls){
          if (control instanceof FormGroup){
            this.logValidationErrors(control);
          }
        }
    
      }

    });
  }


  onLoadDataClick() :void{

  }

  addSkillFormGroup() : FormGroup {
    return this.fb.group({
      skillName : ['',Validators.required],
      experienceInYears : ['',Validators.required],
      proficiency : ['',Validators.required],
    });
  }

}
