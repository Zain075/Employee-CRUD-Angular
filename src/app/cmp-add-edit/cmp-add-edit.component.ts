import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';
import { ServiceService } from '../core/service.service';

@Component({
  selector: 'app-cmp-add-edit',
  templateUrl: './cmp-add-edit.component.html',
  styleUrls: ['./cmp-add-edit.component.scss']
})
export class CmpAddEditComponent implements OnInit{
empForm: FormGroup;

education:string[]=[
  'Matric',
  'Diploma',
  'Intermediate',
  'Graduate',
  'Post Graduate',
]

constructor(private _fb: FormBuilder, 
            private _empService: EmployeeService, 
            private _dailogRef: MatDialogRef<CmpAddEditComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private _ServiceService: ServiceService
            ) {
  this.empForm = this._fb.group({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    education: '',
    company: '',
    experience: '',
    package: '',
  })
}
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next:(val:any)=>{
          this._ServiceService.openSnackBar('Employee detail Updated')
          this._dailogRef.close(true);
        },
        error: (err: any)=>{
          console.log(err);
          
        }
  
      });

    }
    else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          
          this._ServiceService.openSnackBar('Employee added Sucessfully')
          this._dailogRef.close(true);
        },
        error: (err: any)=>{
          console.log(err);
          
        }
  
      });
    }
    
    
  }
}



}
