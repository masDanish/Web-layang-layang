import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="p-8">
                {/* HERO */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 mb-10">
                    <h1 className="text-3xl font-bold mb-2">
                        Lomba Design Layang-Layang Nasional 🪁
                    </h1>
                    <p className="opacity-90 max-w-2xl">
                        Ajang kreativitas bagi pelajar untuk menciptakan desain
                        layang-layang unik, inovatif, dan penuh makna budaya.
                    </p>
                </div>

                {/* GALERI */}
                <h2 className="text-2xl font-bold mb-4">
                    Galeri Layang-Layang
                </h2>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <img
                        src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
                        className="rounded-lg shadow"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
                        className="rounded-lg shadow"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
                        className="rounded-lg shadow"
                    />
                </div>

                {/* CTA */}
                <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h3 className="text-xl font-semibold">
                            Siap ikut lomba?
                        </h3>
                        <p className="text-gray-600">
                            Daftarkan desain terbaikmu sekarang
                        </p>
                    </div>
                    <Link
                        href="/daftar-lomba"
                        className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Daftar Lomba 🪁
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
