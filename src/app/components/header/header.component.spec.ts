import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;
  let i18nService: I18nService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    // Mock TranslateService and I18nService
    const mockTranslateService = jasmine.createSpyObj('TranslateService', ['use', 'currentLang']);
    mockTranslateService.currentLang = 'en';

    const mockI18nService = {
      onLanguageChange: () => of('en'),
      updateLanguage: jasmine.createSpy('updateLanguage')
    };

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), // Provide TranslateModule
        RouterTestingModule.withRoutes([]) // Provide RouterTestingModule for router testing
      ],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: I18nService, useValue: mockI18nService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: { get: () => 'en' } } } }
      ],
      declarations: [HeaderComponent]
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    i18nService = TestBed.inject(I18nService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default language to "en"', () => {
    expect(component.currentLang).toBe('en'); // Default language is 'en'
  });

  it('should update the currentLang when I18nService emits a language change', () => {
    spyOn(i18nService, "onLanguageChange").and.returnValue(of('fr')); // Simulate language change to 'fr'
    component.ngOnInit();
    expect(component.currentLang).toBe('fr'); // currentLang should be updated to 'fr'
  });

  it('should switch language and update queryParams when switchLanguage is called', () => {
    spyOn(router, 'navigate');
    const event = new Event('change');
    const target = document.createElement('select');
    target.value = 'fr';
    Object.defineProperty(event, 'target', { value: target });

    component.switchLanguage(event);

    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: route,
      queryParams: { lang: 'fr' },
      queryParamsHandling: 'merge'
    });
  });

  it('should use the current language from TranslateService on init', () => {
    translateService.currentLang = 'es'; // Simulate that the current language is 'es'
    component.ngOnInit();
    expect(component.currentLang).toBe('es');
  });
});
