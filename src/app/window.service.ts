import { ComponentRef, Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  windowComponentRef!: ComponentRef<any>;
  appService!: AppService;

  constructor(componentRef: ComponentRef<unknown>, appService: AppService) { 
    this.windowComponentRef = componentRef
    this.appService = appService;
    appService.windowRefs.push(this.windowComponentRef);
  }

  destroy() {
    this.appService.windowRefs = this.appService.windowRefs.filter((ref) => ref!== this.windowComponentRef);
    this.windowComponentRef.destroy();
  }


}
