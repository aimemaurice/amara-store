import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Toaster position="top-right" />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-16 rounded-[2rem] border border-slate-200 bg-black px-8 py-16 text-white shadow-xl sm:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Contact Us</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight">Let's bring your next AMARA look to life.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Need styling guidance, order help, or a luxury consultation? Our team in Kigali is ready to assist you.
          </p>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-sm">
            <h2 className="mb-6 text-3xl font-semibold text-slate-900">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full justify-center rounded-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-sm">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Contact Info</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Reach AMARA in Kigali</h2>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <span className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A84C] text-lg text-black">
                  <FaEnvelope />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Email</p>
                  <p className="mt-1 text-slate-600">hello@amara.rw</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <span className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A84C] text-lg text-black">
                  <FaPhoneAlt />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Phone</p>
                  <p className="mt-1 text-slate-600">+250 788 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <span className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A84C] text-lg text-black">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Location</p>
                  <p className="mt-1 text-slate-600">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
