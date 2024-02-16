import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  
  heroes = [];
  dataSource = new MatTableDataSource<Hero>(this.heroes);
  displayedColumns: string[] = ['name', 'description', 'actions'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog
  ) { 
    this.paginator = {} as MatPaginator;
  }

  ngOnInit(): void {
    this.getHeroes();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getHeroes(): void {
    this.heroService.getAllHeroes().subscribe(heroes => {
      this.dataSource.data = heroes;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editHero(hero: Hero) {
    this.openDialog(hero);
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero.id).subscribe(() => {
      this.getHeroes();
    });
  }

  addHero() {
    this.openDialog(null);
  }

  openDialog(hero: Hero | null): void {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '600px',
      data: {
        hero: hero
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.getHeroes();
    });
  }
}
