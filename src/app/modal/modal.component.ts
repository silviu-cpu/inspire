import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() courseTitle: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  submitForm() {
    // Handle form submission logic here
    console.log('Form submitted for course:', this.courseTitle);
    // You might want to close the modal after submission
    this.closeModal();
  }
}
