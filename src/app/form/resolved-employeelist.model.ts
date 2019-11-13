import { Employee } from 'src/model/employee';

export class ResolvedEmployeeList{
    constructor(public employeeList : Employee[], public error : any = null){}

}