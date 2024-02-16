import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { HeroService } from '../services/hero.service';
import { LoadingService } from '../services/loading-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let mockHeroService: any;
  let mockLoadingService;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj(['updateHero', 'createHero']);
    mockLoadingService = jasmine.createSpyObj(['setLoading']);
    mockDialogRef = jasmine.createSpyObj(['close']);

    await TestBed.configureTestingModule({
      declarations: [ HeroFormComponent ],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateHero and close the dialog when saving an existing hero', () => {
    component.hero = { id: 1, name: 'Test', description: 'Test description' };
    component.heroForm.setValue({ name: 'Updated Test', description: 'Updated description' });
    mockHeroService.updateHero.and.returnValue(of({}));
    component.saveHero();
    expect(mockHeroService.updateHero).toHaveBeenCalledWith(1, component.heroForm.value);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call createHero and close the dialog when saving a new hero', () => {
    component.heroForm.setValue({ name: 'New Test', description: 'New description' });
    mockHeroService.createHero.and.returnValue(of({}));
    component.saveHero();
    expect(mockHeroService.createHero).toHaveBeenCalledWith(component.heroForm.value);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
