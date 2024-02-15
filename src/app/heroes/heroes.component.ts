import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from '../hero-form/hero-form.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource<Hero>();

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog
  ) { }

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
    /*this.heroService.createHero(hero).subscribe(() => {
      this.getHeroes();
    });*/
  }

  openDialog(hero: Hero | null): void {
    console.log("hero en openDialog: ", hero);

    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '600px',
      data: {
        hero: hero
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // this.dialogRef.close();
      // you can use the result here
    });

  
  }
}
