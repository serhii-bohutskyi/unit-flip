import {Component} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {I18nService} from "../../services/i18n.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    TranslateModule
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentLang: string = 'en';

  constructor(private translate: TranslateService,
              private i18nService: I18nService,
              private route: ActivatedRoute,
              private router: Router) {
    this.currentLang = translate.currentLang || 'en';
    // Subscribe to the language change observable
    this.i18nService.onLanguageChange().subscribe(lang => {
      this.currentLang = lang;
    });
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const language = target.value;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {lang: language},
      queryParamsHandling: 'merge'
    });
  }
}
