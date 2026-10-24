import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Copy, Check, Sparkles, ExternalLink, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('arorakasak2005@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      const mailtoUrl = `mailto:arorakasak2005@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Collaboration Inquiry')}&body=${encodeURIComponent(`Hi Kasak,\n\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      setIsSubmitted(true);
    }
  };

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="pt-24 pb-16 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading & Subtitle */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} aria-hidden="true" />
            <span>Collaboration &amp; Outreach</span>
          </div>
          <h2 id="contact-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Let's work together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-300 mt-4 max-w-xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
            Open to data analytics, AI/ML and teaching opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Direct Details & Online Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-morphism border border-slate-700/80 shadow-2xl space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Connect Directly</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Whether you have an inquiry regarding data audit analytics, research collaboration, or instructional sessions, feel free to reach out.
                </p>
              </div>

              {/* Email Card with Copy Action */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-cyan-500/50 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-cyan-500/15 text-cyan-400">
                      <Mail size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Email Address</div>
                      <a
                        href="mailto:arorakasak2005@gmail.com"
                        className="text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors"
                      >
                        arorakasak2005@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-2 rounded-xl bg-slate-700/70 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-all"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-blue-500/15 text-blue-400">
                  <MapPin size={22} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Location</div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    Delhi, India
                  </div>
                </div>
              </div>

              {/* Online Social Links */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Online Profiles &amp; Repositories
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.linkedin.com/in/kasak-batra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 text-white transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-bold">LinkedIn</span>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-blue-400" />
                  </a>

                  <a
                    href="https://github.com/KASAKBATRA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 text-white transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github size={20} className="text-slate-200 group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-bold">GitHub</span>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass-morphism border border-slate-700/80 shadow-2xl">
              <h3 className="font-display text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-slate-300 text-sm mb-6">
                Fill in your message to immediately draft an email inquiry.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Check size={28} />
                  </div>
                  <h4 className="font-display font-bold text-white text-xl">Email Client Opened!</h4>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                    Thank you for reaching out. Please send the drafted email from your client and Kasak will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priyanshu Mehta"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Collaboration, Job Opportunity or Discussion topic"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share project details, team requirements, or research questions..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <Send size={18} aria-hidden="true" />
                    <span>Send Message to Kasak</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Kasak. Built with React &amp; Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span>AI &amp; Data Science Portfolio</span>
            <span>•</span>
            <span>Office of the CAG of India</span>
            <span>•</span>
            <a href="/Kasak_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              Resume (PDF)
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Contact;