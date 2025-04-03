import { WP_API_URL } from './config';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken?: string;
}

export interface NewsletterFormData {
  email: string;
  fullName?: string;
  interests?: string[];
}

export interface JoinFormData {
  name: string;
  email: string;
  role: string;
  experience: string;
  linkedin?: string;
  portfolio?: string;
}

class FormsService {
  private readonly apiBase: string;

  constructor() {
    this.apiBase = `${WP_API_URL}/dltcafe/v1`;
  }

  async submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.apiBase}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          recaptchaToken: data.recaptchaToken
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      const result = await response.json();
      return {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      };
    } catch (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        message: 'There was an error submitting your message. Please try again.',
      };
    }
  }

  async subscribeNewsletter(data: NewsletterFormData): Promise<{ success: boolean; message: string }> {
    try {
      console.log('Sending newsletter subscription:', data);

      // Add a small delay to ensure the request completes
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await fetch(`${this.apiBase}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Newsletter response status:', response.status);
      
      try {
        const result = await response.json();
        console.log('Newsletter response:', result);
        return result;
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        if (response.ok) {
          return {
            success: true,
            message: 'Thank you for subscribing to our newsletter!'
          };
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'There was an error subscribing to the newsletter. Please try again.',
      };
    }
  }

  async submitJoinForm(data: JoinFormData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.apiBase}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit join form');
      }

      const result = await response.json();
      return {
        success: true,
        message: 'Thank you for your interest in joining us. We will review your application and get back to you soon!',
      };
    } catch (error) {
      console.error('Join form submission error:', error);
      return {
        success: false,
        message: 'There was an error submitting your application. Please try again.',
      };
    }
  }
}

export const formsService = new FormsService(); 