import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { user } from '../model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private Api: ApiService,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: user,
  ) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      email: [this.data?.email || '', [Validators.required]],
      phonenumber: [this.data?.phonenumber || '', [Validators.required]],
    });

    if (this.data) {
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      if (this.isEditMode) {
        // Edit existing student
        this.Api.editstudent(this.data._id, studentData).subscribe({
          next: () => {
            this.snackbar.opensnackbar('Updated');
            this.onCancel();
          },
          error: (err) => {
            console.log('Error', err);
          },
        });
      } else {
        // Add new student
        this.Api.createStudent(studentData).subscribe({
          next: () => {
            this.snackbar.opensnackbar('Student Added');
            this.onCancel();
          },
          error: (err) => {
            console.log('Error', err);
          },
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(true);
  }
}
