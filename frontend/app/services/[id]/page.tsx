import { ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Custom blocks renderer since official package has dep issues with React 19
const CustomBlocksRenderer = ({ content }: { content: any }) => {
    if (!content) return <p className="text-slate-400">Deskripsi tidak tersedia.</p>;
    if (typeof content === 'string') return <p>{content}</p>;

    if (Array.isArray(content)) {
        return (
            <>
                {content.map((block: any, index: number) => {
                    const key = index;

                    switch (block.type) {
                        case 'paragraph':
                            return (
                                <p key={key}>
                                    {block.children.map((child: any, idx: number) => {
                                        const childKey = `${key}-${idx}`;
                                        let text = <span key={childKey}>{child.text}</span>;
                                        if (child.bold) text = <strong key={childKey}>{child.text}</strong>;
                                        if (child.italic) text = <em key={childKey}>{child.text}</em>;
                                        if (child.underline) text = <u key={childKey}>{child.text}</u>;
                                        if (child.strikethrough) text = <s key={childKey}>{child.text}</s>;
                                        if (child.code) text = <code key={childKey}>{child.text}</code>;
                                        return text;
                                    })}
                                </p>
                            );

                        case 'heading':
                            const text = block.children.map((child: any) => child.text).join('');
                            if (block.level === 1) return <h1 key={key}>{text}</h1>;
                            if (block.level === 2) return <h2 key={key}>{text}</h2>;
                            if (block.level === 3) return <h3 key={key}>{text}</h3>;
                            if (block.level === 4) return <h4 key={key}>{text}</h4>;
                            if (block.level === 5) return <h5 key={key}>{text}</h5>;
                            return <h6 key={key}>{text}</h6>;

                        case 'list':
                            const listItems = block.children.map((item: any, idx: number) => (
                                <li key={`${key}-${idx}`}>
                                    {item.children.map((child: any) => child.text).join('')}
                                </li>
                            ));

                            if (block.format === 'ordered') {
                                return <ol key={key}>{listItems}</ol>;
                            }
                            return <ul key={key}>{listItems}</ul>;

                        case 'quote':
                            return (
                                <blockquote key={key}>
                                    {block.children.map((child: any) => child.text).join('')}
                                </blockquote>
                            );

                        case 'code':
                            return (
                                <pre key={key}>
                                    <code>{block.children.map((child: any) => child.text).join('')}</code>
                                </pre>
                            )

                        default:
                            return null;
                    }
                })}
            </>
        );
    }
    return null;
};

async function getService(id: string) {
    try {
        // Fetch by documentId
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch service');
        }

        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching service:", error);
        return null;
    }
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-900 text-slate-50 pt-24 pb-20">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Link */}
                <Link href="/#services" className="inline-flex items-center text-slate-400 hover:text-indigo-400 transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Layanan
                </Link>

                {/* Header */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 mb-12 backdrop-blur-sm text-center">
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
                        {service.Title || service.title}
                    </h1>
                    <div className="h-1 w-24 bg-indigo-500 rounded-full mx-auto"></div>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-300">
                    <CustomBlocksRenderer content={service.Description || service.description} />
                </div>

                {/* CTA */}
                <div className="mt-16 pt-10 border-t border-slate-800/50 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Tertarik dengan layanan ini?</h3>
                    <p className="text-slate-400 mb-8">Diskusikan kebutuhan spesifik bisnis Anda dengan tim ahli kami.</p>
                    <Link href="/#contact" className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-600/25">
                        Tanya Layanan Ini <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>

            </div>
        </main>
    );
}
