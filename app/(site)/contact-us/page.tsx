'use client';

import React, { useState } from 'react';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import ReCAPTCHA from "react-google-recaptcha";
import { IconCloudDemo } from '@/app/components/ui/icon-cloud-demo';
import { formsService } from '../../lib/forms';
import { NewsletterForm } from '@/app/components/NewsletterForm';

const outfit = Outfit({ subsets: ['latin'] });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaValue) {
      setSubmitStatus({
        type: 'error',
        message: 'Please complete the CAPTCHA verification'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Format data for the API
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        recaptchaToken: captchaValue
      };

      // Submit to WordPress API
      const result = await formsService.submitContactForm(submissionData);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          message: ''
        });
        setCaptchaValue(null);
      } else {
        throw new Error(result.message);
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
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 mb-42">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Heading (65% width) */}
            <div className="lg:col-span-7">
              <p className="text-[#D2F381] mb-4">Contact Us</p>
              <h1 className={`${outfit.className} text-[84px] font-medium text-white leading-[1.1] mb-8`}>
                We're open, and we'd love to hear from you.
              </h1>
            </div>
            
            {/* Right Column - Coffee Cup (35% width) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[400px] h-[500px]">
                <Image
                  src="/images/wereopen.png"
                  alt="Coffee Cup"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className={`${outfit.className} text-[36px] font-medium text-white mb-4`}>
                Reach Out @
              </h2>
              <p className="text-white/80 text-[1.7rem] font-extralight">
                Feel free to reach out using the form, alternatively you can reach us using the details below.
              </p>
              <p className="text-white/80 text-lg">
                media@dltcafe.com
              </p>
            </div>
            
            {/* Right Column - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Last Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your Name*" 
                      className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name*" 
                      className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                      required
                    />
                  </div>
                </div>
                
                {/* Phone and Email Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number*" 
                      className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email*" 
                      className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                      required
                    />
                  </div>
                </div>
                
                {/* Message Field */}
                <div>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message" 
                    rows={5}
                    className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                  ></textarea>
                </div>

                {/* reCAPTCHA */}
                <div className="recaptcha-wrapper">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={(value) => setCaptchaValue(value)}
                    theme="dark"
                    size="normal"
                  />
                </div>
                
                {/* Status Message */}
                {submitStatus.message && (
                  <div className={`text-sm ${submitStatus.type === 'success' ? 'text-[#D2F381]' : 'text-red-500'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                {/* Submit Button */}
                <div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !captchaValue}
                    className={`bg-[#D2F381] hover:bg-[#D2F381]/90 text-black font-medium py-3 px-8 rounded transition-all ${
                      (isSubmitting || !captchaValue) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 border-t border-white/10 my-80">
        <div className="max-w-[1220px] mx-auto px-4">
        <h2 className={`${outfit.className} text-[36px] text-center font-medium text-white mb-12`}>Our Locations</h2>
          
          <div className="flex flex-col">
            {/* London - First Row */}
            <div className="flex flex-col lg:flex-row">
              {/* Text on Left */}
              <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                <h3 className={`${outfit.className} text-[36px] font-medium text-white mb-4`}>
                  London
                </h3>
                <p className="text-white/80">
                  DLT Café<br />
                  Plexal, Here East, Queen<br />
                  Elizabeth Olympic Park, London,<br />
                  E20 3BS
                </p>
              </div>
              
              {/* Image on Right */}
              <div className="w-full lg:w-1/2 h-[400px] relative">
                <Image
                  src="/images/london-office.jpg"
                  alt="London Office"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>
            
            {/* Manchester - Second Row (Reversed) */}
            <div className="flex flex-col-reverse lg:flex-row">
              {/* Image on Left */}
              <div className="w-full lg:w-1/2 h-[400px] relative">
                <Image
                  src="/images/manchester-office.jpg"
                  alt="Manchester Office"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              
              {/* Text on Right */}
              <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                <h3 className={`${outfit.className} text-[36px] font-medium text-white mb-4`}>
                  Manchester
                </h3>
                <p className="text-white/80">
                  DLT Café<br />
                  Spaceworks, Oxford Street, Peter<br />
                  House, Manchester M1 5AN,<br />
                  United Kingdom
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-16 relative">
        {/* Texture Background with Elliptical Gradient Overlay */}
        <div className="absolute inset-0 overflow-hidde nmy-80">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/texture-bg.jpg"
              alt="Background Texture"
              fill
              className="object-cover"
              style={{
                objectPosition: 'center center'
              }}
            />
          </div>
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 70%)'
            }}
          ></div>
        </div>
        
        <div className="max-w-[1220px] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-white/60 uppercase tracking-wider mb-4">DLT CAFE VENTURE STUDIO</p>
            <div className="flex justify-center mb-4">
              <div className="flex gap-1">
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
              </div>
            </div>
            <h2 className={`${outfit.className} text-[52px] font-medium text-white`}>
              Community, Innovation & Growth
            </h2>
          </div>
          
          {/* Newsletter Form */}
          <NewsletterForm />
        </div>
       
      </section>

      {/* Spacer Div */}
      <div className="h-[100px] w-full"></div>
    </main>
  );
} 