'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { formsService } from '../lib/forms';

export function JoinForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: [] as string[],
    socialLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Add URL validation function
  const isValidUrl = (url: string): boolean => {
    if (!url) return true; // Empty URL is valid (field is optional)
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error message when user starts typing
    if (submitStatus.type === 'error') {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: prev.role.includes(value)
        ? prev.role.filter(r => r !== value)
        : [...prev.role, value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (formData.role.length === 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Please select at least one role'
      });
      return;
    }

    // Validate URL if provided
    if (formData.socialLink && !isValidUrl(formData.socialLink)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid URL starting with http:// or https://'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await formsService.submitJoinForm({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: formData.role.join(', '),
        experience: 'Interested in joining',
        linkedin: formData.socialLink
      });

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you for your interest! We will be in touch soon.'
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          role: [],
          socialLink: ''
        });
      } else {
        throw new Error(result.message || 'Submission failed');
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

  const roles = [
    'Influencer',
    'Creator',
    'Operator',
    'Dev or Engineer',
    'Investor',
    'Other'
  ];

  return (
    <section className="w-full bg-black py-32">
      <div className="max-w-[1220px] mx-auto px-4 pt-16">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-[44px] md:text-[52px] font-medium text-white leading-tight font-outfit text-center max-w-[1100px] mx-auto mb-16">
            If you're an influencer, entrepreneur, creative, technologist, investor or member of the public and want to help redefine what's possible, build great companies?
          </h2>
          
          <h3 className="text-[36px] font-medium text-white font-outfit mb-6">
            Then apply to join the
          </h3>
          
          <h2 className="text-[68px] font-medium font-outfit mb-16">
            <span className="text-[#D2F381]">Domain of Limitless </span>
            <span className="text-[#0fe0bc]">Talent</span>
            <span className="text-white"> Cafe</span>
          </h2>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[600px] mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                  className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                />
              </div>
              <div>
                <input 
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                  className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
              />
            </div>
            
            {/* Checkbox Group */}
            <div className="pt-4">
              <p className="text-white mb-3">I am a*</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {roles.map((role) => (
                  <label key={role} className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.role.includes(role)}
                      onChange={() => handleCheckboxChange(role)}
                      className="form-checkbox"
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Social Link Field */}
            <div className="pt-2">
              <p className="text-white/80 text-sm mb-2">Add your LinkedIn, YouTube, GitHub, Instagram, or TikTok profile</p>
              <input 
                type="url"
                name="socialLink"
                value={formData.socialLink}
                onChange={handleInputChange}
                placeholder="https://"
                pattern="https?://.*"
                title="Please enter a valid URL starting with http:// or https://"
                className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
              />
              <p className="text-white/50 text-xs mt-1">Example: https://linkedin.com/in/yourprofile</p>
            </div>

            {/* Status Message */}
            {submitStatus.message && (
              <div className={`text-sm ${
                submitStatus.type === 'success' ? 'text-[#D2F381]' : 'text-red-500'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            {/* Submit Button */}
            <div className="flex flex-col items-center">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#D2F381] hover:bg-[#D2F381]/90 text-black font-medium py-3 px-8 rounded w-40 transition-all ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              
              {/* Lightning Bolt Icon */}
              <div className="mt-6">
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
        </motion.div>
      </div>
    </section>
  );
} 