import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource<Hero>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAllHeroes().subscribe(heroes => {
      this.dataSource = new MatTableDataSource(heroes);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editHero(event: Event) {
    const hero = (event.target as HTMLInputElement).value;
    console.log(hero);
  }

  deleteHero(event: Event) {
    const hero = (event.target as HTMLInputElement).value;
    console.log(hero);
  }

  addHero(event: Event) {
    const hero = (event.target as HTMLInputElement).value;
    console.log(hero);
  }
}
