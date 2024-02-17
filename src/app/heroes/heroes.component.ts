import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  
  heroes = [];
  dataSource = new MatTableDataSource<Hero>(this.heroes);
  displayedColumns: string[] = ['name', 'description', 'actions'];
  noResults = false; // in search
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog
  ) { 
    this.paginator = {} as MatPaginator;
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getHeroes(): void {
    this.heroService.getAllHeroes().pipe(
      catchError(error => {
        console.error('Error occurred: ', error);
        return of([]);
      })
    ).subscribe(heroes => {
      this.dataSource.data = heroes;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //get number of results
    if (this.dataSource.filteredData.length === 0) {
      this.noResults = true;
    } else {
      this.noResults = false;
    }
  }

  editHero(hero: Hero) {
    this.openHeroFormDialog(hero);
  }

  deleteHero(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '600px',
      data: { name: hero.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.deleteHero(hero.id).pipe(
          catchError(error => {
            console.error('Error occurred: ', error);
            return of([]);
          })
        ).subscribe(() => {
          this.getHeroes();
        });
      }
    });
  }

  addHero() {
    this.openHeroFormDialog(null);
  }

  openHeroFormDialog(hero: Hero | null): void {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '600px',
      data: {
        hero: hero
      }
    });
  
    dialogRef.afterClosed().pipe(
      catchError(error => {
        console.error('Error occurred: ', error);
        return of([]);
      })
    ).subscribe(result => {
      console.log('The dialog was closed', result);
      this.getHeroes();
    });
  }
}
