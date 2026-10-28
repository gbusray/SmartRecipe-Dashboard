import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageInput } from './components/message-input/message-input';
import { MessageList, ChatMessage } from './components/message-list/message-list';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageInput, MessageList],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'  
})
export class Chat {
  public messages: WritableSignal<ChatMessage[]> = signal([]);
  
  public isTyping: WritableSignal<boolean> = signal(false);

  public suggestions = [
    "Suggest a gluten-free breakfast 🥞",
    "What can I make with apples? 🍏",
    "I need a high-protein vegan dinner 🌱"
  ];

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
      this.messages.update(msgs => [
        ...msgs, 
        { sender: 'ai', text: "**Success!** Here is a fantastic recipe for you based on your request. \n\n- Delicious \n- Gluten-Free \n- Safe" }
      ]);
    }, 1500);
  }

  public sendSuggestion(text: string): void {
    this.handleSendMessage({ text, imageUrl: null });
  }
}