import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { CommonModule } from "@angular/common"
import { StatusBarComponent } from "./status-bar/status-bar.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, StatusBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @ViewChild('windowContainer', { read: ViewContainerRef }) windowContainer!: ViewContainerRef;

  constructor() { }

  loadCard(component: any) {
    const windowContainerRef = this.windowContainer?.createComponent(component);
  }

  ngAfterViewInit() {
    this.loadCard(WindowComponent);
    this.loadCard(WindowComponent);
    this.loadCard(WindowComponent);
  }

  ngOnInit() {
  }

  title = 'hypr-window';
}
