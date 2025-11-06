import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interfaces';
import { Pageble } from '../interfaces/pageble.interfaces';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  constructor(){ }
  me = signal<Profile | null>(null)

  getTestsAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
    .pipe(
      tap(res => this.me.set(res))
    )
  }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
    .pipe(
      map(res => res.items.slice(0, 3))
    )
  }
}
