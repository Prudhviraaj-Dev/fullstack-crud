import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';
import { ApiService } from './services/api.service';
import { user } from './model';
import { SnackbarService } from './snackbar/snackbar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  displayedColumns = ['S.No', 'name', 'email', 'phonenumber', 'actions'];
  dataSource!: user[];

  constructor(
    private dialog: MatDialog,
    private Api: ApiService,
    private snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.getData();
  }

  OnAdd() {
    const dialogref = this.dialog.open(AddStudentComponent, {
      disableClose: true,
    });
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  getData() {
    this.Api.getUsser().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: (err) => {
        alert('error');
      },
    });
  }

  editStudent(id: any) {
    const studentToEdit = this.dataSource.find((student) => student._id === id);
    const dialogRef = this.dialog.open(AddStudentComponent, {
      disableClose: true,
      data: studentToEdit,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  deleteStudent(id: any) {
    this.dataSource = this.dataSource.filter((student) => student._id !== id);
    this.snackbar.opensnackbar('Student Data Deleted');
    this.Api.deletestudent(id).subscribe({
      next: (res) => {
        this.getData();
      },
      error: (err) => {
        this.snackbar.opensnackbar('Student Data not Deleted');
      },
    });
  }
}
