"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: formData }),
            });

            if (!res.ok) throw new Error("Failed to send message");

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    return (
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Nama Anda
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email Bisnis
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@perusahaan.com"
                        className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Detail Proyek
                    </label>
                    <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Ceritakan tentang kebutuhan proyek Anda..."
                        className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                    ></textarea>
                </div>

                {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                        <AlertCircle className="w-4 h-4" />
                        <span>Gagal mengirim pesan. Silakan coba lagi.</span>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                        <CheckCircle className="w-4 h-4" />
                        <span>Pesan terkirim! Tim kami akan segera menghubungi Anda.</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === "submitting" || status === "success"}
                    className={`w-full py-4 font-bold rounded-lg transition-all transform shadow-lg flex items-center justify-center gap-2
            ${status === "submitting"
                            ? "bg-indigo-800 text-slate-400 cursor-wait"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.02] shadow-indigo-600/25"
                        }`}
                >
                    {status === "submitting" ? (
                        "Mengirim..."
                    ) : (
                        <>
                            Kirim Pesan <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
