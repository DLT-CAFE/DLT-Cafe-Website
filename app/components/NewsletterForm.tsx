'use client';

import { useState } from 'react';
import { Outfit } from 'next/font/google';
import { formsService } from '../lib/forms';
import Image from 'next/image';

const outfit = Outfit({ subsets: ['latin'] });

export function NewsletterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await formsService.subscribeNewsletter({
        email: formData.email,
        fullName: formData.fullName,
        interests: ['general'] // Default interest category
      });

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you for subscribing to our newsletter!'
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: ''
        });
      } else {
        throw new Error(result.message || 'Subscription failed');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto text-center">
      <h3 className={`${outfit.className} text-[28px] font-medium text-white mb-8`}>
        Subscribe to our Newsletter
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name" 
            className="flex-1 bg-black/80 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
            required
          />
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email" 
            className="flex-1 bg-black/80 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
            required
          />
        </div>
        
        {/* Status Message */}
        {submitStatus.message && (
          <div className={`text-sm mb-4 ${
            submitStatus.type === 'success' ? 'text-[#D2F381]' : 'text-red-500'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        <div className="flex flex-col items-center">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#D2F381] hover:bg-[#D2F381]/90 text-black font-medium py-3 px-8 rounded w-full md:w-auto transition-all ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          
          {/* Lightning Bolt Icon */}
          <div className="mt-8">
            <Image
              src="/images/cafebolt.svg"
              alt="DLT Cafe Bolt"
              width={24}
              height={60}
              className="mx-auto"
            />
          </div>
        </div>
      </form>
    </div>
  );
} 