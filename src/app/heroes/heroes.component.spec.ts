import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.model';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;
  let getAllHeroesSpy: jasmine.Spy;
  let service: HeroService;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Hero One', description: 'Description One' },
    { id: 2, name: 'Hero Two', description: 'Description Two' },
  ];

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getAllHeroes']);
    getAllHeroesSpy = heroServiceSpy.getAllHeroes;
  
    await TestBed.configureTestingModule({
      imports: [MatTableModule,
                MatToolbarModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                BrowserAnimationsModule,
                FlexLayoutModule,
                MatDialogModule],
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: heroServiceSpy }],
    }).compileComponents();
  
    heroService = TestBed.inject(HeroService);
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    getAllHeroesSpy.and.returnValue(of(mockHeroes));
    fixture.detectChanges();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesComponent, HeroService]
    });

    component = TestBed.inject(HeroesComponent);
    service = TestBed.inject(HeroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroes on init', () => {
    spyOn(component, 'getHeroes');
    component.ngOnInit();
    expect(component.getHeroes).toHaveBeenCalled();
  });

  it('should set dataSource after calling getHeroes', () => {
    component.getHeroes();
    expect(component.dataSource.data).toEqual(mockHeroes);
  });

  it('should apply filter', () => {
    const event = { target: { value: 'Hero One' } } as any as Event;
    component.applyFilter(event);
    expect(component.dataSource.filter).toEqual('hero one');
  });

  it('should edit a hero', () => {
    const hero = { id: 1, name: 'Test', description: '' }; // Add the missing 'description' property
    const updatedHero = { ...hero, name: 'Updated Test', description: 'Updated Description' };
    spyOn(service, 'updateHero').and.returnValue(of(updatedHero));
    spyOn(component, 'getHeroes');
  
    component.editHero(hero);
  
    expect(service.updateHero).toHaveBeenCalledWith(hero.id, updatedHero); // Fix the argument to pass both the hero ID and the updated hero object
    expect(component.getHeroes).toHaveBeenCalled();
  });

  it('should delete a hero', () => {
    const hero = { id: 1, name: 'Test', description: 'Test Description' }; // Add the missing 'description' property
    spyOn(service, 'deleteHero').and.returnValue(of(undefined));
    spyOn(component, 'getHeroes');

    component.deleteHero(hero);

    expect(service.deleteHero).toHaveBeenCalledWith(hero.id);
    expect(component.getHeroes).toHaveBeenCalled();
  });

  it('should add a hero', () => {
    const hero = { id: 1, name: 'Test', description: '' }; // Add the missing 'description' property
    spyOn(service, 'createHero').and.returnValue(of(hero)); // Fix the return value to of(undefined)
    spyOn(component, 'getHeroes');

    component.addHero();

    expect(service.createHero).toHaveBeenCalledWith(hero);
    expect(component.getHeroes).toHaveBeenCalled();
  });
  
});