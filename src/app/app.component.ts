import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { WindowComponent } from './window/window.component';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  @ViewChild('windowContainer', { read: ViewContainerRef }) windowContainer!: ViewContainerRef;

  constructor() { }

  loadCard(component: any) {
    if(this.windowContainer?.length > 0) {
      this.windowContainer.clear();
      this.windowContainer.createComponent(component);
    }
  }

  ngOnInit() {
    this.loadCard(WindowComponent);
    this.loadCard(WindowComponent);
    this.loadCard(WindowComponent);
  }

  title = 'hypr-window';
}
