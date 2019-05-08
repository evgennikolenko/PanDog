import { Component, Input } from '@angular/core';
import { LoginPanelComponent } from '../../components/login-panel/login-panel.component';

@Component({
  selector: 'pd-header',
  templateUrl: './app/tamplates/header/header.component.html',
  // styleUrls: ['header.component.scss']
})
export class HeaderComponent {
    @Input() currentUser;
}