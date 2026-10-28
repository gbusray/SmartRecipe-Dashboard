import { Component, signal, WritableSignal, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss'
})
export class MessageInput { 
  @Output() send = new EventEmitter<{text: string, imageUrl: string | null}>();

  @ViewChild('promptTextarea') private textareaRef!: ElementRef<HTMLTextAreaElement>;

  public isDragging: WritableSignal<boolean> = signal(false);
  public stagedImage: WritableSignal<string | null> = signal(null);
  public inputText: WritableSignal<string> = signal('');

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) this.handleImageUpload(files[0]);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleImageUpload(input.files[0]);
      input.value = ''; 
    }
  }

  private handleImageUpload(file: File): void {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.stagedImage.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  public discardStagedImage(): void {
    this.stagedImage.set(null);
  }

  public onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.inputText.set(value);
  }

  public handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitMessage();
    }
  }

  public submitMessage(): void {
    const text = this.inputText();
    const img = this.stagedImage();
    
    if (!text.trim() && !img) return;

    this.send.emit({ text: text.trim(), imageUrl: img });
    
    this.stagedImage.set(null);
    this.inputText.set('');
    if (this.textareaRef) {
      this.textareaRef.nativeElement.value = '';
    }
  }
}