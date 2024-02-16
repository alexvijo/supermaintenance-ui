import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero } from '../models/hero.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { HeroService } from '../services/hero.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit{

  @Input() hero: Hero | null = null;
  heroForm!: FormGroup;
  heroService: HeroService;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    heroService: HeroService,
    public dialogRef: MatDialogRef<HeroFormComponent>
  ) {
    this.heroService = heroService;
    if (data) {
      this.hero = data.hero;
    }
  }

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero?.name || '', [
        Validators.required, Validators.minLength(5),
      ]),
      description: new FormControl(this.hero?.description || '', [
        Validators.required, Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    this.saveHero();
  }

  saveHero() {
    if (this.hero) {
      this.heroService.updateHero(this.hero.id, this.heroForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    } else {
      this.heroService.createHero(this.heroForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
  }
}
