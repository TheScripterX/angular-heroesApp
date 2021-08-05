import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
//
import { Hero } from '../../interfaces/heroes.interface';
//
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  input: string = '';
  heroes: Hero[] = [];
  heroSelected: Hero | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  searching() {
    this.heroesService
      .autoCompleteHeroes(this.input.trim())
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroSelected = undefined;
      return;
    } else {
      const hero: Hero = event.option.value;
      this.input = hero.superhero;

      this.heroesService.getHeroById(hero.id!).subscribe((hero) => {
        this.heroSelected = hero;
      });
    }
  }
}
