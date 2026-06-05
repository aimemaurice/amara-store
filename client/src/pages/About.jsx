import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-16 rounded-[2rem] border border-slate-200 bg-black px-8 py-16 text-white shadow-xl sm:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">About AMARA</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight">Discover the soul of luxury African fashion.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            AMARA is a Rwandan luxury fashion house blending contemporary design with African elegance. Our pieces celebrate craftsmanship, rich heritage, and modern refinement for the world stage.
          </p>
        </section>

        <section className="mb-16 rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Our Story</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">A Rwandan brand redefining luxury fashion.</h2>
          </div>
          <p className="text-lg leading-8 text-slate-700">
            AMARA was born in Kigali to bring African refinement to discerning wardrobes worldwide. Each collection is inspired by bold colors, sculptural silhouettes, and the timeless beauty of East Africa. We design with intention, honor artisanal techniques, and create pieces that feel luxurious and empowering.
          </p>
        </section>

        <section className="mb-16">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Our Values</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Luxury rooted in meaning.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#C9A84C] hover:bg-[#fdf6e4]">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-xl font-bold text-black">Q</div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Quality</h3>
              <p className="text-slate-600">Every stitch and detail is crafted with precision in materials that feel premium and last beyond the season.</p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#C9A84C] hover:bg-[#fdf6e4]">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-xl font-bold text-black">E</div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Elegance</h3>
              <p className="text-slate-600">Our collections are designed to make every moment feel refined, graceful, and unmistakably elegant.</p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#C9A84C] hover:bg-[#fdf6e4]">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-xl font-bold text-black">A</div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Authenticity</h3>
              <p className="text-slate-600">We celebrate true African craftsmanship and authentic storytelling through every luxurious piece.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A84C]">Meet the Team</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Creative minds shaping the AMARA experience.</h2>
          </div>
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
            <p className="text-xl font-semibold text-slate-900">Team profiles coming soon.</p>
            <p className="mt-4 max-w-2xl mx-auto leading-7">
              Our creative directors, designers, and artisans are building a new chapter in luxury fashion. Stay tuned for the stories behind the brand.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
