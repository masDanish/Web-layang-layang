import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function UserDetail({ user }) {
    return (
        <AuthenticatedLayout>
            <Head title="Detail Peserta" />

            <Link
                href={route('admin.dashboard')}
                className="text-sm text-indigo-600 mb-6 inline-block"
            >
                ← Kembali
            </Link>

            <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
                <h2 className="text-xl font-semibold mb-2">
                    {user.name}
                </h2>
                <p className="text-sm text-gray-500">
                    {user.email}
                </p>

                <div className="mt-6">
                    <h3 className="font-medium mb-3">
                        Desain Peserta
                    </h3>

                    {!user.design && (
                        <p className="text-sm text-gray-500">
                            Peserta belum mengirim desain.
                        </p>
                    )}

                    {user.design && (
                        <div>
                            <img
                                src={`/storage/${user.design.image_path}`}
                                className="rounded-lg max-h-64 mb-4"
                            />
                            <p className="font-semibold">
                                {user.design.title}
                            </p>
                            <p className="text-sm text-gray-600">
                                Status:{' '}
                                {user.design.status}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
