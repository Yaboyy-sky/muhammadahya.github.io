import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Github, 
  Linkedin, 
  Instagram, 
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Nama lengkap wajib diisi.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Nama minimal 2 karakter.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Alamat email wajib diisi.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Format email tidak valid (contoh: nama@domain.com).';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subjek pesan tidak boleh kosong.';
    } else if (formData.subject.trim().length < 3) {
      errs.subject = 'Subjek minimal 3 karakter.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Isi pesan tidak boleh kosong.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Pesan terlalu singkat (minimal 10 karakter).';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      const response = await fetch("https://formspree.io/f/maeelnye", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 8000);
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.errors && data.errors.length > 0) {
          setSubmitError(data.errors.map((err) => err.message).join(', '));
        } else {
          setSubmitError('Terjadi kendala saat mengirim pesan. Silakan coba lagi atau hubungi langsung ke email.');
        }
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Gagal menghubungkan ke server. Silakan periksa koneksi internet Anda atau kirim langsung via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'discord':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-3 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Mari Berkolaborasi</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Hubungi <span className="aurora-gradient-text">Saya</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-purple-600 mx-auto mt-4 rounded-full" />
        <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-sm sm:text-base font-light leading-relaxed">
          Punya ide proyek menarik, tawaran kerja, atau sekadar ingin berdiskusi seputar instrumentasi, kelistrikan, teknologi, dan desain kreatif? Jangan ragu untuk mengirimkan pesan!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info & Social Links */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Informasi Kontak
            </h3>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Alamat Email</p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm sm:text-base font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Lokasi</p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  {personalInfo.location}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-500/20 text-xs text-gray-300">
              <p className="text-emerald-300 font-semibold mb-1">⏱️ Waktu Respon Cepat</p>
              <p className="text-gray-400">Pesan terkirim langsung ke inbox email saya dan biasanya direspon dalam waktu 24 jam.</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-white mb-4">
              Koneksi Sosial Media
            </h3>
            <div className="space-y-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-forest-900/40 border border-emerald-500/15 hover:border-emerald-400/60 hover:bg-forest-850 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2.5 rounded-xl bg-[#031109] border border-emerald-500/20 text-emerald-400 group-hover:text-purple-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    >
                      {renderSocialIcon(social.icon)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {social.name}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        {social.username}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form with Validation & Formspree Integration */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl relative">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Kirim Pesan Langsung
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Isi formulir di bawah ini dengan lengkap untuk memulai percakapan.
            </p>

            {/* Success Feedback Banner */}
            {isSubmitted && (
              <div className="mb-6 p-5 rounded-2xl bg-emerald-950/90 border border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Pesan Berhasil Terkirim ke Email Muhammad Ahya!
                  </p>
                  <p className="text-xs text-emerald-200/90 mt-1 leading-relaxed">
                    Terima kasih telah menghubungi saya. Pesan Anda telah diteruskan langsung ke kotak masuk saya dan saya akan segera membalasnya secepat mungkin!
                  </p>
                </div>
              </div>
            )}

            {/* Error Feedback Banner */}
            {submitError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-950/80 border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Gagal Mengirim Pesan
                  </p>
                  <p className="text-xs text-red-200 mt-1">
                    {submitError}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Nama Lengkap <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    className={`w-full px-4 py-3 rounded-xl bg-forest-900/70 border text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                      errors.name
                        ? 'border-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                        : 'border-emerald-500/25 focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Email Anda <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-forest-900/70 border text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                        : 'border-emerald-500/25 focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Subjek Pesan <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Diskusi Proyek Instrumentasi / Kelistrikan / Desain"
                  className={`w-full px-4 py-3 rounded-xl bg-forest-900/70 border text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                    errors.subject
                      ? 'border-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      : 'border-emerald-500/25 focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Pesan Anda <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan detail pertanyaan atau brief proyek Anda di sini..."
                  className={`w-full px-4 py-3 rounded-xl bg-forest-900/70 border text-sm text-white placeholder-gray-500 focus:outline-none transition-all resize-none ${
                    errors.message
                      ? 'border-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      : 'border-emerald-500/25 focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mengirimkan Pesan ke Inbox Email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
