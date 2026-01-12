import { ArrowRight, CheckCircle, Code, Server, Shield } from "lucide-react";
import Link from 'next/link';
import ContactForm from "@/components/ContactForm";

// Helper to extract text from Strapi Rich Text (Blocks) or handle plain strings
const renderDescription = (desc: any) => {
  if (!desc) return "Deskripsi layanan belum tersedia.";

  // If it's a simple string, return it
  if (typeof desc === 'string') return desc;

  // If it's an array (Strapi Blocks), extract text from the first paragraph
  if (Array.isArray(desc)) {
    try {
      // Simple text extraction from blocks
      return desc.map(block =>
        block.children?.map((child: any) => child.text).join('')
      ).join(' ') || "Deskripsi layanan belum tersedia.";
    } catch (e) {
      return "Format deskripsi tidak dikenali.";
    }
  }

  return "Deskripsi layanan belum tersedia.";
};

async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 403) {
        console.error("API Error 403: Forbidden - Check Strapi Public Permissions");
        return [];
      }
      throw new Error('Failed to fetch services');
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function Home() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[100px] rounded-full"></div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-300">Ready for the Future</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
          Transformasi Digital<br />untuk Bisnis Anda
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-10 leading-relaxed">
          Mitra teknologi terpercaya untuk solusi software dan infrastruktur. Kami membangun masa depan digital Anda hari ini.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2">
            Konsultasi Gratis <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all border border-slate-700 hover:border-slate-600">
            Lihat Portfolio
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Solusi komprehensif untuk kebutuhan teknologi bisnis Anda, dari pengembangan hingga pemeliharaan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service: any) => (
                <Link key={service.id} href={`/services/${service.documentId}`} className="block group h-full">
                  <div className="h-full p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col">
                    <div className="w-12 h-12 mb-6 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors shrink-0">
                      <Code className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-100">{service.Title || service.title || "Layanan IT"}</h3>
                    <div className="text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-grow">
                      {renderDescription(service.Description || service.description)}
                    </div>
                    <div className="flex items-center text-indigo-400 text-sm font-semibold group-hover:translate-x-1 transition-transform mt-auto">
                      Pelajari Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <>
                {/* Fallback Cards if API fails or is empty, to show the UI design */}
                <div className="group p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="w-12 h-12 mb-6 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Server className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100">API Tidak Terhubung</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Gagal memuat data dari Strapi. Pastikan server berjalan dan permission Public untuk 'Services' sudah diaktifkan.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative z-10 py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Tentang TechSolution</h2>
              <div className="h-1 w-20 bg-indigo-500 rounded-full mb-8"></div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Kami adalah konsultan IT dan software house yang berdedikasi untuk membantu bisnis bertransformasi di era digital. Dengan tim ahli yang berpengalaman, kami menghadirkan solusi teknologi yang inovatif, efisien, dan skalabel.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-400 w-6 h-6" />
                  <span className="text-slate-200">Tim Ahli</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-400 w-6 h-6" />
                  <span className="text-slate-200">Teknologi Terkini</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-400 w-6 h-6" />
                  <span className="text-slate-200">Support 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-indigo-400 w-6 h-6" />
                  <span className="text-slate-200">Berorientasi Hasil</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl bg-slate-700/50 border border-slate-600/50 backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Fallback pattern since we don't have images yet */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-slate-950"></div>
              <div className="text-slate-500 flex flex-col items-center">
                <Shield className="w-16 h-16 mb-4 opacity-50" />
                <span className="font-semibold tracking-widest">COMPANY PROFILE IMAGE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 bg-indigo-950/20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left Column: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <span className="text-sm font-medium text-indigo-400">Hubungi Kami</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Punya ide proyek? <br />
                <span className="text-slate-400">Ceritakan kepada kami.</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-md">
                Kami siap membantu merealisasikan visi digital Anda. Isi formulir di samping untuk memulai konsultasi gratis.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                  <div className="w-10 h-10 rounded-full bg-slate-600 border-2 border-slate-900"></div>
                  <div className="w-10 h-10 rounded-full bg-slate-500 border-2 border-slate-900"></div>
                </div>
                <span className="text-sm text-slate-400 font-medium">Bergabung dengan 100+ Klien Puas</span>
              </div>
            </div>

            {/* Right Column: Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
