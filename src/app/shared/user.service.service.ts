import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: { id: number, name: string } = { id: 0, name: '' };
  private userSubject: BehaviorSubject<{ id: number, name: string }> = new BehaviorSubject(this.user);

  getUser(): Observable<{ id: number, name: string }> {
    return this.userSubject.asObservable();
  }

  setUser(id: number, name: string): void {
    this.user = { id, name };
    console.log(this.user)
    this.userSubject.next(this.user);
  }
}
