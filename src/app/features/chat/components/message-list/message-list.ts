import { Component, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownPipe } from '../../../../shared/pipes/markdown.pipe';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MarkdownPipe], // Rationale: Imported our custom Markdown pipe.
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss' // Make sure this is .scss
})
export class MessageList implements AfterViewChecked {
  @Input() messages: ChatMessage[] = [];
  
  @Input() isTyping: boolean = false; 

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }
}