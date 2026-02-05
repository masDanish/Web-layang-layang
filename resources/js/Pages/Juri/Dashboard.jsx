import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { designs } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Juri" />

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Penilaian Desain
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Silakan nilai desain yang dikirim peserta
                </p>
            </div>

            <div className="space-y-6 max-w-4xl">
                {designs.length === 0 && (
                    <p className="text-gray-500 text-sm">
                        Belum ada desain yang perlu dinilai.
                    </p>
                )}

                {designs.map((design) => (
                    <DesignCard key={design.id} design={design} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

function DesignCard({ design }) {
    const { data, setData, post, processing, errors } = useForm({
        score: '',
        comment: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('juri.score.store', design.id));
    };

    return (
        <div className="bg-white border rounded-xl p-6">
            <div className="flex gap-6">
                {/* IMAGE */}
                <img
                    src={`/storage/${design.image_path}`}
                    className="w-48 h-48 object-cover rounded-lg border"
                />

                {/* INFO */}
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800">
                        {design.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Oleh: {design.user.name}
                    </p>

                    <p className="text-sm text-gray-600 mt-3">
                        {design.description ?? 'Tidak ada deskripsi.'}
                    </p>

                    <div className="mt-4">
                        <span
                            className={`text-xs px-3 py-1 rounded-full ${
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

                    {/* FORM NILAI */}
                    {design.status !== 'reviewed' && (
                        <form
                            onSubmit={submit}
                            className="mt-5 space-y-3"
                        >
                            <div>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="Nilai (1–100)"
                                    className="border rounded-md px-3 py-2 text-sm w-40"
                                    value={data.score}
                                    onChange={(e) =>
                                        setData('score', e.target.value)
                                    }
                                />
                                {errors.score && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.score}
                                    </p>
                                )}
                            </div>

                            <textarea
                                placeholder="Komentar (opsional)"
                                className="border rounded-md px-3 py-2 text-sm w-full"
                                value={data.comment}
                                onChange={(e) =>
                                    setData('comment', e.target.value)
                                }
                            />

                            <button
                                disabled={processing}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Penilaian'}
                            </button>
                        </form>
                    )}

                    {design.status === 'reviewed' && (
                        <p className="text-sm text-gray-500 mt-4">
                            Kamu sudah menilai desain ini.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
