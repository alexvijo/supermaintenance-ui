import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero } from '../models/hero.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit{

  @Input() hero: Hero | null = null;
  heroForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
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

    console.log("this.hero: ", this.hero);

  }

  onSubmit() {
    this.saveHero();
  }

  saveHero() {
    if (this.hero) {
      // edit the hero
    } else {
      // create a new hero
    }
  }
}
