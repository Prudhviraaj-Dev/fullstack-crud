import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackbar: MatSnackBar) {}

  opensnackbar(message: any, action: string = 'done') {
    this._snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
