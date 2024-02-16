import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  template: `
  <mat-dialog-content class="container">
    <h1 class="form-title">Eliminar héroe</h1>
    <p>¿Estás seguro de que quieres eliminar a {{data.name}}?</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="onNoClick()">Cancelar</button>
    <button mat-raised-button color="primary" cdkFocusInitial (click)="onYesClick()">Aceptar</button>
  </mat-dialog-actions>
  `,
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}  
