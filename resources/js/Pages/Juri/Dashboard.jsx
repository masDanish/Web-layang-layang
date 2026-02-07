import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Dashboard() {
    // AMAN supaya tidak error length
    const { designs = [] } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Juri" />

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Dashboard Juri
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Silakan beri penilaian pada desain peserta
                </p>
            </div>

            <div className="space-y-6 max-w-5xl">
                {designs.length === 0 && (
                    <p className="text-gray-500 text-sm">
                        Tidak ada desain yang perlu dinilai.
                    </p>
                )}

                {designs.map((design) => (
                    <DesignCard key={design.id} design={design} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

/* ================= DESIGN CARD ================= */

function DesignCard({ design }) {
    const { data, setData, post, processing, errors } = useForm({
        creativity: '',
        aesthetic: '',
        theme: '',
        technique: '',
        comment: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('juri.score.store', design.id));
    };

    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex gap-6">
                {/* IMAGE */}
                <img
                    src={`/storage/${design.image_path}`}
                    alt={design.title}
                    className="w-52 h-52 object-cover rounded-xl border"
                />

                {/* INFO */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {design.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Oleh: {design.user.name}
                    </p>

                    <p className="text-sm text-gray-600 mt-3">
                        {design.description || 'Tidak ada deskripsi.'}
                    </p>

                    {/* STATUS */}
                    <div className="mt-4">
                        <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                                design.status === 'reviewed'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                            {design.status === 'reviewed'
                                ? 'Sudah Dinilai'
                                : 'Belum Dinilai'}
                        </span>
                    </div>

                    {/* FORM PENILAIAN */}
                    {design.status !== 'reviewed' && (
                        <form
                            onSubmit={submit}
                            className="mt-6 grid grid-cols-2 gap-4"
                        >
                            <ScoreInput
                                label="Kreativitas"
                                value={data.creativity}
                                error={errors.creativity}
                                onChange={(v) =>
                                    setData('creativity', v)
                                }
                            />

                            <ScoreInput
                                label="Estetika"
                                value={data.aesthetic}
                                error={errors.aesthetic}
                                onChange={(v) =>
                                    setData('aesthetic', v)
                                }
                            />

                            <ScoreInput
                                label="Kesesuaian Tema"
                                value={data.theme}
                                error={errors.theme}
                                onChange={(v) => setData('theme', v)}
                            />

                            <ScoreInput
                                label="Teknik"
                                value={data.technique}
                                error={errors.technique}
                                onChange={(v) =>
                                    setData('technique', v)
                                }
                            />

                            {/* COMMENT */}
                            <div className="col-span-2">
                                <textarea
                                    placeholder="Komentar (opsional)"
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                    rows="3"
                                    value={data.comment}
                                    onChange={(e) =>
                                        setData('comment', e.target.value)
                                    }
                                />
                            </div>

                            {/* SUBMIT */}
                            <div className="col-span-2 flex justify-end">
                                <button
                                    disabled={processing}
                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Penilaian'}
                                </button>
                            </div>
                        </form>
                    )}

                    {design.status === 'reviewed' && (
                        <p className="text-sm text-gray-500 mt-5">
                            Kamu sudah memberikan penilaian untuk desain ini.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ================= SCORE INPUT ================= */

function ScoreInput({ label, value, onChange, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="number"
                min="1"
                max="100"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-full"
                placeholder="1 - 100"
            />
            {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
}
