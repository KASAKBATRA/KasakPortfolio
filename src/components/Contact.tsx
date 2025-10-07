import React, { useState } from 'react';
// EmailJS client (used for client-side email sending)
declare module '@emailjs/browser';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Read EmailJS IDs from Vite env variables (create .env with VITE_EMAILJS_...)
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE || 'your_service_id';
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE || 'your_template_id';
      const USER_ID = import.meta.env.VITE_EMAILJS_USER || 'your_user_id';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      // Initialize EmailJS (helps ensure user id is set)
      try {
        emailjs.init(USER_ID);
      } catch (e) {
        // ignore init errors
      }

      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      // success
      console.log('EmailJS result', result);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('EmailJS error', err);
      // Try to show a helpful message if available
      const message = err?.text || err?.message || JSON.stringify(err);
      alert(`Failed to send message. ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-800 relative">
      {/* Subtle background */}
      <div className="absolute inset-0">
        {/* Contact themed background */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl animate-pulse-glow animation-delay-1000"></div>
        
        {/* Communication symbols */}
        <div className="absolute top-32 right-32 text-4xl text-accent-400/8 animate-neural-pulse">@</div>
        <div className="absolute bottom-32 left-32 text-3xl text-green-400/8 animate-neural-pulse animation-delay-1500">📧</div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 mx-auto"></div>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Ready to collaborate on AI & Data Science projects? Let's discuss how we can work together to turn data into meaningful insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in-up animation-delay-200">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-slate-300 leading-relaxed mb-8">
                I'm always excited to hear about new opportunities in AI, Data Science, and Machine Learning. 
                Whether you're looking for a collaborator on research projects or need help with data analytics, 
                feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-5 glass-morphism rounded-xl hover:border-primary-500/50 transition-all duration-300">
                <div className="bg-primary-500/20 p-3 rounded-lg">
                  <Mail className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white font-medium">arorakasak2005@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-5 glass-morphism rounded-xl hover:border-green-500/50 transition-all duration-300">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Phone className="text-green-400" size={20} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-white font-medium">Available on request</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-5 glass-morphism rounded-xl hover:border-purple-500/50 transition-all duration-300">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <MapPin className="text-purple-400" size={20} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Location</p>
                  <p className="text-white font-medium">Delhi, India</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-display text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/kasak-batra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-morphism p-3 rounded-lg hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-110"
                >
                  <Linkedin className="text-primary-400" size={20} />
                </a>
                <a 
                  href="https://github.com/KASAKBATRA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-morphism p-3 rounded-lg hover:border-gray-500/50 transition-all duration-300 hover:transform hover:scale-110"
                >
                  <Github className="text-gray-400" size={20} />
                </a>
                <a 
                  href="mailto:arorakasak2005@gmail.com"
                  className="glass-morphism p-3 rounded-lg hover:border-accent-500/50 transition-all duration-300 hover:transform hover:scale-110"
                >
                  <Mail className="text-accent-400" size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-morphism p-8 rounded-2xl animate-fade-in-up animation-delay-400">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-slate-300 text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-4 text-white placeholder-slate-500 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-4 text-white placeholder-slate-500 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-slate-300 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-4 text-white placeholder-slate-500 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  placeholder="AI/Data Science Collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-4 text-white placeholder-slate-500 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 resize-none"
                  placeholder="Tell me about your data science project or collaboration idea..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;