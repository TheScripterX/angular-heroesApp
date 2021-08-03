import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';
import { Hero } from '../../interfaces/heroes.interface';

import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class HeroComponent implements OnInit {
  heroes: Hero[] = [];
  hero!: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(
      (heroes) => {
        console.log(heroes);
        this.heroes = heroes;
      },
      (error) => {
        console.error(error);
      }
    );
    this.heroById();
  }

  heroById() {
    this.activatedRoute.params
      .pipe(switchMap((params) => this.heroesService.getHeroById(params.id)))
      .subscribe((hero) => {
        this.hero = hero;
      });
  }

  backTo() {
    this.router.navigate(['/heroes/list']);
  }
}
