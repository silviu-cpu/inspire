import { Component, EventEmitter, Input, Output } from '@angular/core';
import emailjs from '@emailjs/browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() courseTitle: string = '';
  @Output() close = new EventEmitter<void>();

  formData = {
    name: '',
    email: '',
    phone: '',
  };

  isSubmitting = false;

  closeModal() {
    this.close.emit();
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      // Marchează toate câmpurile ca fiind atinse pentru a afișa erorile
      Object.keys(form.controls).forEach((key) => {
        form.controls[key].markAsTouched();
      });
      return; // Nu trimitem dacă formularul este invalid
    }

    this.isSubmitting = true; // Activăm starea de încărcare

    const templateParams = {
      course: this.courseTitle,
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
    };

    console.log('Sending data:', templateParams);

    emailjs
      .send(
        'service_xd827el',
        'template_wc5657i',
        templateParams,
        'user_EelcXR1O2dtBCcKFTmS2V'
      )
      .then((res) => {
        console.log('Email sent successfully:', res.status, res.text);
        this.isSubmitting = false; // Dezactivăm starea de încărcare
        this.closeModal();
      })
      .catch((err) => {
        console.error('Email sending failed:', err);
        this.isSubmitting = false; // Dezactivăm starea de încărcare și în caz de eroare
      });
  }
}
