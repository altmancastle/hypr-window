import { ComponentRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public windowRefs: ComponentRef<unknown>[] = [];

  constructor() { }
}
