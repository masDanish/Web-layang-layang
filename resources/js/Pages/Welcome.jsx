import React from "react";
import { Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gray-100 text-slate-700 overflow-hidden">
            {/* NAVBAR */}
            <nav className="bg-white shadow-sm px-12 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-sky-600">
                    LayangFest
                </h1>

                <div className="space-x-6">
                    <Link
                        href="/login"
                        className="hover:text-sky-600 transition"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition"
                    >
                        Daftar
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative px-12 py-28 bg-gradient-to-br from-gray-100 to-sky-50 overflow-hidden">
                {/* BACKGROUND IMAGE */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-right bg-contain opacity-10 blur-sm"
                    style={{
                        backgroundImage: "url('/images/hero-kite.png')",
                    }}
                />

                {/* CONTENT */}
                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="text-5xl font-extrabold mb-6 leading-tight">
                        Event Lomba Design Layang-Layang <br />
                        <span className="text-sky-600">
                            Tingkat Nasional
                        </span>
                    </h2>

                    <p className="text-gray-600 mb-10 max-w-2xl leading-relaxed">
                        Platform resmi lomba Design layang-layang Indonesia dengan
                        sistem penilaian transparan, juri profesional, dan
                        dashboard peserta modern.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            href="/register"
                            className="px-7 py-3 bg-sky-500 text-white rounded-xl shadow hover:bg-sky-600 hover:scale-105 transition"
                        >
                            Ikuti Lomba
                        </Link>
                        <a
                            href="#info"
                            className="px-7 py-3 border border-sky-500 text-sky-600 rounded-xl hover:bg-sky-50 transition"
                        >
                            Lihat Detail
                        </a>
                    </div>
                </div>
            </section>

            {/* ABOUT LOMBA */}
            <section className="px-12 py-28 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    {/* IMAGE */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-sky-100 rounded-3xl blur-xl opacity-60" />
                        <img
                            src="/images/about-kite.png"
                            alt="Tentang Lomba Layang-Layang"
                            className="relative z-10 rounded-3xl shadow-lg w-full object-cover"
                        />
                    </div>

                    {/* CONTENT */}
                    <div>
                        <h3 className="text-4xl font-extrabold mb-6">
                            Tentang <span className="text-sky-600">LayangFest</span>
                        </h3>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            <strong>LayangFest</strong> adalah event lomba desain
                            layang-layang tingkat nasional yang bertujuan
                            mengapresiasi kreativitas, inovasi, dan nilai budaya
                            dalam seni layang-layang Indonesia.
                        </p>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            Peserta akan mengunggah desain terbaik mereka, kemudian
                            dinilai oleh juri profesional berdasarkan aspek
                            estetika, filosofi desain, dan orisinalitas melalui
                            sistem dashboard digital yang transparan.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "📐 Fokus pada kreativitas & desain",
                                "⚖️ Penilaian transparan & objektif",
                                "🏆 Sertifikat & penghargaan resmi",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-3 text-gray-700"
                                >
                                    <span className="w-2 h-2 bg-sky-500 rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>


            {/* INFO CARDS */}
            <section
                id="info"
                className="px-12 py-24 grid md:grid-cols-3 gap-10 max-w-7xl mx-auto"
            >
                {[
                    {
                        title: "Dinilai Juri Profesional",
                        desc: "Penilaian objektif dan transparan oleh juri berpengalaman.",
                        img: "/images/judge.png",
                    },
                    {
                        title: "Hadiah Menarik",
                        desc: "Piala, sertifikat resmi, dan hadiah eksklusif.",
                        img: "/images/trophy.png",
                    },
                    {
                        title: "Komunitas Nasional",
                        desc: "Bertemu peserta dari berbagai daerah di Indonesia.",
                        img: "/images/community.png",
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-2 p-8 text-center"
                    >
                        {/* IMAGE WRAPPER */}
                        <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-sky-50">
                            <img
                                src={item.img}
                                className="w-20 h-20 object-contain"
                                alt=""
                            />
                        </div>

                        <h3 className="font-bold text-xl mb-3">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </section>

            {/* CTA */}
            <section className="bg-sky-500 text-white py-20 text-center">
                <h3 className="text-4xl font-bold mb-4">
                    Siap Menjadi Juara Langit?
                </h3>
                <p className="mb-8 opacity-90 max-w-xl mx-auto">
                    Daftarkan dirimu sekarang dan jadilah bagian dari
                    kompetisi layang-layang terbesar di Indonesia.
                </p>
                <Link
                    href="/register"
                    className="px-10 py-4 bg-white text-sky-600 rounded-xl font-semibold hover:scale-105 transition inline-block"
                >
                    Daftar Sekarang
                </Link>
            </section>

            {/* FOOTER */}
            <footer className="bg-white text-center py-6 text-gray-500 border-t">
                © {new Date().getFullYear()} LayangFest. All rights reserved.
            </footer>
        </div>
    );
}
