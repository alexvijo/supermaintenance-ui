import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { Hero } from '../models/hero.model';
import { environment } from 'src/environments/environment';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });

    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should fetch all heroes', () => {
    const dummyHeroes: Hero[] = [
      { id: 1, name: 'Hero 1' , description: 'Description 1'},
      { id: 2, name: 'Hero 2' , description: 'Description 2'}
    ];

    service.getAllHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);
  });

  it('should create a hero', () => {
    const newHero: Hero = { id: 3, name: 'Hero 3' , description: 'Description 3'};

    service.createHero(newHero).subscribe(hero => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });

  it('should fetch a hero by id', () => {
    const dummyHero: Hero = { id: 1, name: 'Hero 1', description: 'Description 1'};

    service.getHeroById(1).subscribe(hero => {
      expect(hero).toEqual(dummyHero);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHero);
  });

  it('should search heroes by name', () => {
    const dummyHeroes: Hero[] = [
      { id: 1, name: 'Hero 1', description: 'Description 1'},
      { id: 2, name: 'Hero 2', description: 'Description 2'}
    ];

    service.searchHeroesByName('Hero').subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}?name_like=Hero`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);
  });

  it('should update a hero', () => {
    const updatedHero: Hero = { id: 1, name: 'Updated Hero', description: 'Updated Description'};

    service.updateHero(1, updatedHero).subscribe(hero => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });

  it('should delete a hero', () => {
    service.deleteHero(1).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
  });
});