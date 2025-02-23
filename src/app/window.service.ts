import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private windowSubject = new Subject<any>();
  cardData$ = this.windowSubject.asObservable();

  updateWindowSubject(data: any) {
    this.windowSubject.next(data);
  }
}
