import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ViewComponent } from '../view/view.component';
import { CommonModule } from "@angular/common"


@Component({
  selector: 'app-window',
  imports: [CommonModule],
  templateUrl: './window.component.html',
  styleUrl: './window.component.css'
})
export class WindowComponent {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

  constructor() { }

  loadCard(component: any) {
    this.viewContainer?.createComponent(component);
  }

  ngAfterViewInit() {
    this.loadCard(ViewComponent);
  }

}
