import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('DeleteConfirmationComponent', () => {
  let component: DeleteConfirmationComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockDialogData = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationComponent ],
      imports: [ MatDialogModule ]
    })
    .compileComponents();
  });
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
