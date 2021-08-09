import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHeroInfo();
  }

  save() {
    if (this.hero.id) {
      this.heroesService
        .editHero(this.hero)
        .subscribe((hero) => console.log('Edited ', hero));
    } else {
      console.log(this.hero);
      this.heroesService.addHero(this.hero).subscribe(
        (hero) => {
          console.log('Hero created!');
          this.router.navigate(['/heroes/update', hero.id]);
        },
        () => {
          console.error('syntax error');
        }
      );
    }
  }

  deleteHero() {
    this.heroesService.deleteHero(this.hero.id!).subscribe((resp) => {
      this.router.navigate(['/heroes']);
    });
  }

  getHeroInfo() {
    if (!this.router.url.includes('update')) {
      return;
    } else {
      this.activatedRoute.params.subscribe(({ id }) =>
        this.heroesService
          .getHeroById(id)
          .subscribe((hero) => (this.hero = hero))
      );
    }
  }
}
