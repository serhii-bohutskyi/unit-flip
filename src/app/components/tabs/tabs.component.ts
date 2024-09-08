import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule
  ],
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  constructor(private router: Router) {}

  // Optional: You can add logic here to handle more complex tab switching
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
