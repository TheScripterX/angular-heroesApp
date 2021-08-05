import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hero } from '../interfaces/heroes.interface';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`);
  }
  autoCompleteHeroes(input: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${input}&_limit=5`);
  }
}
