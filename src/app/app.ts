import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { TranslateService, TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  constructor(private translate: TranslateService) {
    // Set fallback language
    this.translate.setFallbackLang('en');
    
    // Set current active language
    this.translate.use('en'); 
  }

  // Method to trigger language switch from the UI toggle
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}