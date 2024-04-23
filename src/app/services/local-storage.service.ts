import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;

  constructor(private http:HttpClient) {
    this.storage = window.localStorage;
  }

  getTasks(){
    this.http.get(`https://30fe-131-161-124-170.ngrok-free.app/tasks`).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
}

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

}
