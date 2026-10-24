import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rationale: Defining a strict interface for navigation items ensures type safety and centralizes menu configuration (DRY).
interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  public menuItems: WritableSignal<MenuItem[]> = signal([
    { id: 'chat', label: 'Smart Assistant', icon: 'sparkles', route: '/chat' },
    { id: 'dashboard', label: 'Dietary Dashboard', icon: 'user', route: '/dashboard' },
    { id: 'ai-engine', label: 'AI Engine Settings', icon: 'cpu', route: '/ai-engine' }
  ]);

  public activeRouteId: WritableSignal<string> = signal('chat');
  
  // Rationale: Local state management for the theme toggle using Signals.
  public isDarkMode: WritableSignal<boolean> = signal(false);

  public ngOnInit(): void {
    // Rationale: Checking initial system preference or localStorage can be added here later.
    this.isDarkMode.set(document.documentElement.classList.contains('dark'));
  }

  public navigateTo(id: string): void {
    this.activeRouteId.set(id);
  }

  // Rationale: Direct DOM manipulation on the root element to apply Tailwind's 'dark:' variant classes globally.
  public toggleTheme(): void {
    this.isDarkMode.update(current => !current);
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}