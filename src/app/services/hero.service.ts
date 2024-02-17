import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  createHero(newHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, newHero);
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  searchHeroesByName(searchTerm: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}?name_like=${searchTerm}`);
  }

  updateHero(id: number, heroToUpdate: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/${id}`, heroToUpdate);
  }

  deleteHero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
