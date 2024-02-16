import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero } from '../models/hero.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { HeroService } from '../services/hero.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '../services/loading-service.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit{

  @Input() hero: Hero | null = null;
  heroForm!: FormGroup;
  heroService: HeroService;
  loadingService: LoadingService;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    heroService: HeroService,
    public dialogRef: MatDialogRef<HeroFormComponent>,
    loadingService: LoadingService
  ) {
    this.heroService = heroService;
    this.loadingService = loadingService;
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
      this.loadingService.setLoading(true);
      this.heroService.updateHero(this.hero.id, this.heroForm.value).subscribe(response => {
        // add timeout to see the spinner
        setTimeout(() => {
          this.loadingService.setLoading(false);
          this.dialogRef.close(response);
        }, 1500);
      });
    } else {
      this.heroService.createHero(this.heroForm.value).subscribe(response => {
        setTimeout(() => {
          this.loadingService.setLoading(false);
          this.dialogRef.close(response);
        },1500);
      });
    }
  }
}
