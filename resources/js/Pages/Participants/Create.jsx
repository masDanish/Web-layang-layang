import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth, competition }) {
    const { data, setData, post, processing, errors } = useForm({
        competition_id: competition.id,
        nama_lengkap: '',
        asal_sekolah: '',
        no_hp: '',
        alamat: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('participants.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pendaftaran Peserta" />

            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
                    <h1 className="text-2xl font-bold mb-1">
                        Form Pendaftaran Peserta 🪁
                    </h1>
                    <p className="text-gray-600 mb-6">
                        {competition.nama_lomba}
                    </p>

                    <form onSubmit={submit} className="space-y-5">
                        <Input
                            label="Nama Lengkap"
                            value={data.nama_lengkap}
                            onChange={e => setData('nama_lengkap', e.target.value)}
                            error={errors.nama_lengkap}
                        />

                        <Input
                            label="Asal Sekolah"
                            value={data.asal_sekolah}
                            onChange={e => setData('asal_sekolah', e.target.value)}
                            error={errors.asal_sekolah}
                        />

                        <Input
                            label="No WhatsApp"
                            value={data.no_hp}
                            onChange={e => setData('no_hp', e.target.value)}
                            error={errors.no_hp}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Alamat
                            </label>
                            <textarea
                                rows="3"
                                className="w-full rounded-lg border px-4 py-2"
                                value={data.alamat}
                                onChange={e => setData('alamat', e.target.value)}
                            />
                            {errors.alamat && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.alamat}
                                </p>
                            )}
                        </div>

                        <button
                            disabled={processing}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Kirim Pendaftaran
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function Input({ label, value, onChange, error }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border px-4 py-2"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
