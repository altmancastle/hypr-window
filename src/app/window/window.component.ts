import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ViewComponent } from '../view/view.component';



@Component({
  selector: 'app-window',
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.css'
})
export class WindowComponent {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

  constructor() { }

  loadCard(component: any) {
    if(this.viewContainer?.length > 0) {
      this.viewContainer.clear();
      this.viewContainer.createComponent(component);
    }
  }

  ngOnInit() {
    this.loadCard(ViewComponent);
    this.loadCard(ViewComponent);
  }

}
