import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { CommonModule } from "@angular/common"

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  @ViewChild('windowContainer', { read: ViewContainerRef }) windowContainer!: ViewContainerRef;

  constructor() { }

  loadCard(component: any) {
    this.windowContainer?.clear();
    this.windowContainer?.createComponent(component);
  }

  ngAfterViewInit() {
    this.loadCard(WindowComponent);
  }

  ngOnInit() {
  }

  title = 'hypr-window';
}
