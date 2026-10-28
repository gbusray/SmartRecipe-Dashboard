import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {
  // Controls the accordion state of the Smart Assistant menu.
  public isChatExpanded: WritableSignal<boolean> = signal(true);
  
  // Manages the off-canvas drawer visibility on mobile viewports.
  public isMobileMenuOpen: WritableSignal<boolean> = signal(false);

  // Mocks initial history payload; to be replaced by backend integration.
  public chatHistory = signal([
    { id: 'chat-1', title: 'Gluten-Free Pancakes...' },
    { id: 'chat-2', title: 'Almond Milk Matcha...' },
    { id: 'chat-3', title: 'Swedish Meatballs...' }
  ]);

  // Syncs internal theme state with the DOM documentElement.
  public isDarkMode: WritableSignal<boolean> = signal(false);

  //  Injecting the Angular Router service.
  constructor(private router: Router) {}

  public ngOnInit(): void {
    // Check initial theme state on load
    this.isDarkMode.set(document.documentElement.classList.contains('dark'));
  }

  // Toggles the Smart Assistant menu open/closed.
  public toggleChatMenu(): void {
    this.isChatExpanded.update(val => !val);
  }

  // Theme toggle logic for perfect UX.
  public toggleTheme(): void {
    this.isDarkMode.update(current => !current);
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Toggles the mobile drawer visibility.
  public toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(val => !val);
  }

  // Closes the drawer when a navigation link is clicked or the backdrop is tapped.
  public closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}