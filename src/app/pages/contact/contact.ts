import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgIf],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  formData = {
    fullName: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  private accessKey = 'f0f2e7ae-e046-45d0-a4b6-a3986d87d5db';

  async onSubmit(contactForm: NgForm) {
    if (contactForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const payload = {
      access_key: this.accessKey,
      name: this.formData.fullName,
      company: this.formData.company,
      phone: this.formData.phone,
      email: this.formData.email,
      message: this.formData.message,
      subject: 'Nuevo mensaje desde el sitio web de Mirabolante',
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        this.submitSuccess = true;
        this.formData = {
          fullName: '',
          company: '',
          phone: '',
          email: '',
          message: '',
        };
        contactForm.resetForm();
      } else {
        this.submitError = true;
      }
    } catch {
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
    }
  }
}
