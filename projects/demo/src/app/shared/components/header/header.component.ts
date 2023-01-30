import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-header-component',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() tagline = '';
}
