import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'description'];
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAllHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
