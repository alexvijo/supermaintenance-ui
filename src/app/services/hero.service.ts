import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroes: Hero[] = [];

  constructor() { }

  getAllHeroes(): Hero[] {
    return this.heroes;
  }

  createHero(newHero: Hero): void {
    const nextId = this.heroes.length > 0 ? Math.max(...this.heroes.map(hero => hero.id)) + 1 : 1;
    newHero.id = nextId;
    this.heroes.push(newHero);
  }

  getHeroById(id: number): Hero | undefined {
    return this.heroes.find(hero => hero.id === id);
  }

  searchHeroesByName(searchTerm: string): Hero[] {
    return this.heroes.filter(hero => hero.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  updateHero(heroToUpdate: Hero): void {
    const index = this.heroes.findIndex(hero => hero.id === heroToUpdate.id);
    if (index !== -1) {
      this.heroes[index] = heroToUpdate;
    }
  }

  deleteHero(id: number): void {
    this.heroes = this.heroes.filter(hero => hero.id !== id);
  }
}
