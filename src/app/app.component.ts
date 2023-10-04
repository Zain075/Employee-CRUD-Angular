import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CmpAddEditComponent } from './cmp-add-edit/cmp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from './core/service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Employee';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _dialog:MatDialog, 
    private _empService: EmployeeService,
    private _ServiceService: ServiceService
    ) {}

  ngOnInit(): void {
    this.getEmployeeList()
  }
    openAddEmpForm(){
    const DialogRef =   this._dialog.open(CmpAddEditComponent);
      DialogRef.afterClosed().subscribe({
        next: (val) =>{
          if(val) {
            this.getEmployeeList();
          }
        }
      })
  }

    getEmployeeList(){
      this._empService.getEmployeeList().subscribe({
        next: (res)=>{
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator
         
        },
        error: (err)=>{
          console.log(err);
          
        }
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

   deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res) =>{
        this._ServiceService.openSnackBar('Employee deleted', 'done')
        alert('Confirm Delete');
        this.getEmployeeList();
      },
      error: console.log,
       
    });
   }

   openEditForm(data:any){
     const DialogRef = this._dialog.open(CmpAddEditComponent,{
      data,
     });

     DialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val) {
          this.getEmployeeList();
        }
      }
    })
    }



}