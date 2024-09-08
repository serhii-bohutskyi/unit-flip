import {Injectable, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private defaultLanguage = 'en';
  private currentLanguageSubject = new BehaviorSubject<string>(this.defaultLanguage);

  constructor(private translate: TranslateService) {
    this.translate.use(this.defaultLanguage);
  }

  updateLanguage(lang: string | null): void {
    if (lang && this.currentLanguageSubject.value !== lang) {
      this.currentLanguageSubject.next(lang);
      this.translate.use(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  onLanguageChange() {
    return this.currentLanguageSubject.asObservable();
  }

  getDefaultLanguage(): string {
    return this.defaultLanguage;
  }

}
