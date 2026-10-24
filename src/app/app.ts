import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Rationale: Importing our standalone Sidebar component to inject it into the root application layout.
import { Sidebar } from './shared/components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'smart-recipe-dashboard';
}