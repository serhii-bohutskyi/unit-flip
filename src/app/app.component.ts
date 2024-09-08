import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {TabsComponent} from './components/tabs/tabs.component';
import {HeaderComponent} from './components/header/header.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {I18nService} from "./services/i18n.service";
import {Meta, Title} from "@angular/platform-browser";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TabsComponent,
    HeaderComponent,
    HttpClientModule,  // Add HttpClientModule for HTTP requests
    FormsModule,       // Add FormsModule for forms handling
    TranslateModule    // Import TranslateModule for translations
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              protected i18n: I18nService,
              protected titleService: Title,
              private meta: Meta) {
    // Update the title dynamically based on the selected language
    this.updateMetaTags();
  }

  ngOnInit(): void {
    // Check if the URL contains a 'lang' query parameter
    const urlLang = this.route.snapshot.queryParamMap.get('lang');

    // Detect and use the browser language if supported (and no URL parameter)
    const browserLang = navigator.language.split('-')[0];
    const validBrowserLang = browserLang.match(/en|fr/) ? browserLang : 'en';

    // Set the initial language based on the URL parameter or browser language
    if (urlLang) {
      this.i18n.updateLanguage(urlLang);
    } else {
      this.i18n.updateLanguage(validBrowserLang);
    }

    // Listen for route changes and check for 'lang' query parameter
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.route.queryParamMap.subscribe(params => {
        const lang = params.get('lang');

        // If 'lang' parameter exists in URL, update the language
        if (lang) {
          this.i18n.updateLanguage(lang);
          this.updateMetaTags();
        }
      });
    });

    // Update the meta tags initially based on current language
    this.updateMetaTags();
  }

  // Method to dynamically update the meta tags based on the selected language
  updateMetaTags(): void {
    // Set the title tag
    this.translate.get('META.TITLE').subscribe((translatedTitle: string) => {
      this.titleService.setTitle(translatedTitle);
      this.meta.updateTag({ property: 'og:title', content: translatedTitle }); // Update OG title
    });

    // Set the meta description tag
    this.translate.get('META.DESCRIPTION').subscribe((translatedDescription: string) => {
      this.meta.updateTag({ name: 'description', content: translatedDescription });
      this.meta.updateTag({ property: 'og:description', content: translatedDescription }); // Update OG description
    });

    // Set the meta keywords tag
    this.translate.get('META.KEYWORDS').subscribe((translatedKeywords: string) => {
      this.meta.updateTag({ name: 'keywords', content: translatedKeywords });
    });

    // Update Open Graph URL and image (if language-dependent)
    this.meta.updateTag({ property: 'og:url', content: window.location.href }); // Update OG URL based on the current page
    this.meta.updateTag({ property: 'og:image', content: 'https://yourdomain.com/images/unit-converter.jpg' }); // Update OG image
  }
}
