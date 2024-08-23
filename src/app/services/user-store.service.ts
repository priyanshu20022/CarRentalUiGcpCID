import { Injectable } from '@angular/core';
import { BehaviorSubject, ignoreElements } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private name$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  private Id!: number;
  constructor() {}
  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getNameFromStore() {
    return this.name$.asObservable();
  }

  public setNameForStore(name: string) {
    this.name$.next(name);
  }

  public storeId(id: any) {
    console.log(id);
    this.Id = id;
  }

  public getId() {
    console.log(this.Id);
    return this.Id;
  }
}
