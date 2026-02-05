import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const { auth, design, event } = usePage().props;
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('user.design.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Peserta" />

            {/* HERO EVENT */}
            <section className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-10 text-white mb-12 shadow-lg">
                <p className="text-sm opacity-80 mb-1">Dashboard Peserta</p>
                <h1 className="text-3xl font-bold mb-2">
                    Halo, {auth.user.name} 👋
                </h1>
                <p className="opacity-90">
                    {event?.name}
                </p>
            </section>

            {/* RINGKASAN */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <SummaryCard title="Status Akun">
                    <span className="text-green-600 font-semibold">
                        Aktif
                    </span>
                </SummaryCard>

                <SummaryCard title="Desain Kamu">
                    {design ? 'Sudah Upload' : 'Belum Upload'}
                </SummaryCard>

                <SummaryCard title="Status Penilaian">
                    {design?.status === 'reviewed'
                        ? 'Sudah Dinilai'
                        : 'Menunggu Juri'}
                </SummaryCard>

                <SummaryCard highlight title="Nilai Akhir">
                    {design?.average_score
                        ? Number(design.average_score).toFixed(1)
                        : '-'}
                </SummaryCard>
            </section>

            {/* KONTEN */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* DESAIN */}
                <div className="bg-white rounded-2xl shadow p-8">
                    <h3 className="text-lg font-semibold mb-6">
                        🎨 Desain Kamu
                    </h3>

                    {!design ? (
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Judul desain"
                                    className="w-full border rounded-lg px-4 py-2"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <textarea
                                placeholder="Deskripsi singkat (opsional)"
                                className="w-full border rounded-lg px-4 py-2"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />

                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setData('image', e.target.files[0]);
                                        setPreview(
                                            URL.createObjectURL(
                                                e.target.files[0]
                                            )
                                        );
                                    }}
                                />
                                {errors.image && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            {preview && (
                                <img
                                    src={preview}
                                    className="rounded-xl max-h-56 border"
                                />
                            )}

                            <button
                                disabled={processing}
                                className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                {processing
                                    ? 'Mengunggah...'
                                    : 'Upload Desain'}
                            </button>
                        </form>
                    ) : (
                        <div>
                            <img
                                src={`/storage/${design.image_path}`}
                                className="rounded-xl mb-4 max-h-64 mx-auto"
                            />

                            <h4 className="font-semibold text-lg text-center">
                                {design.title}
                            </h4>

                            <div className="mt-4 flex justify-between items-center text-sm">
                                <span
                                    className={`px-4 py-1 rounded-full ${
                                        design.status === 'reviewed'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                >
                                    {design.status === 'reviewed'
                                        ? 'Sudah Dinilai'
                                        : 'Menunggu Penilaian'}
                                </span>

                                {design.average_score && (
                                    <span className="font-bold text-indigo-600">
                                        ⭐ {Number(design.average_score).toFixed(1)}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* INFO EVENT */}
                <div className="bg-white rounded-2xl shadow p-8">
                    <h3 className="text-lg font-semibold mb-6">
                        ℹ️ Informasi Lomba
                    </h3>

                    <ul className="space-y-4 text-gray-600 text-sm">
                        <li>📅 Tanggal: {event?.date}</li>
                        <li>🪁 Tema: Layang-Layang Tradisional</li>
                        <li>🏆 Pengumuman: 20 Maret 2026</li>
                        <li>👨‍⚖️ Dinilai oleh Juri Profesional</li>
                    </ul>

                    <div className="mt-8 p-4 bg-indigo-50 rounded-xl text-sm text-indigo-700">
                        Pastikan desain yang kamu kirim adalah karya asli dan
                        sesuai tema lomba.
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

/* ===== COMPONENT KECIL ===== */

function SummaryCard({ title, children, highlight }) {
    return (
        <div
            className={`rounded-2xl shadow p-6 ${
                highlight
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white'
            }`}
        >
            <p
                className={`text-sm mb-1 ${
                    highlight ? 'opacity-90' : 'text-gray-500'
                }`}
            >
                {title}
            </p>
            <h3 className="text-xl font-bold">
                {children}
            </h3>
        </div>
    );
}
