import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageInput } from './components/message-input/message-input';
import { MessageList, ChatMessage } from './components/message-list/message-list';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageInput, MessageList, TranslatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'  
})

export class Chat {
  public messages: WritableSignal<ChatMessage[]> = signal([]);
  
  public isTyping: WritableSignal<boolean> = signal(false);

  // Dictionary keys for quick-start suggestion pills.
  public suggestionKeys: string[] = [
    'CHAT.SUGGESTIONS.BREAKFAST',
    'CHAT.SUGGESTIONS.APPLES',
    'CHAT.SUGGESTIONS.VEGAN_DINNER'
  ];

  constructor(private translate: TranslateService) {}

  public handleSendMessage(payload: {text: string, imageUrl: string | null}): void {
    if (!payload.text && !payload.imageUrl) return;

    this.messages.update(msgs => [
      ...msgs, 
      { sender: 'user', text: payload.text, imageUrl: payload.imageUrl || undefined }
    ]);
    
    // Trigger typing animation
    this.isTyping.set(true);

    // Simulating AI processing delay
    setTimeout(() => {
      this.isTyping.set(false);
      const aiResponse = this.translate.instant('CHAT.MOCK_AI_RESPONSE');
      this.messages.update(msgs => [
        ...msgs,
        { sender: 'ai', text: aiResponse }
      ]);
    }, 1500);
  }

  public sendSuggestion(key: string): void {
    const translatedText = this.translate.instant(key);
    this.handleSendMessage({ text: translatedText, imageUrl: null })
  }
}