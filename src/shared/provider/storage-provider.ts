import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageProvider {

  myStorage = window.localStorage;
  constructor() {

  }

  localStorage(key: string, value: any): void {
    this.myStorage.setItem(key, JSON.stringify(value));
  }

  loadRetrieve(key: string): any {
    return JSON.parse(this.myStorage.getItem(key));
  }

  localStorageRemove(key: string) {
    this.myStorage.removeItem(key);
  }

  localStorageClear() {
    this.myStorage.clear();
  }

}
