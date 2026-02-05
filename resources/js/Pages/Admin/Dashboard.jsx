import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react';

const setWinner = (designId) => {
    if (confirm('Yakin menjadikan ini sebagai juara?')) {
        router.post(route('admin.design.winner'), {
            design_id: designId,
        });
    }
};

export default function Index() {
    const { users } = usePage().props

    console.log(users)

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Peserta" />

            <div className="max-w-6xl mx-auto">
                <h1 className="text-xl font-bold mb-6">
                    Daftar Peserta
                </h1>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Id</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th className="text-center">Desain</th>
                                <th className="text-center">Nilai</th>
                                <th>Peringkat</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="border-t text-center">
                                    <td className="py-3">{index + 1}</td>

                                    <td className="py-3">{user.name}</td>

                                    <td className="py-3">{user.email}</td>

                                    <td className="py-3 text-center">
                                        {user.design ? 'Ada' : 'Belum'}
                                    </td>

                                    {/* LEADERBOARD */}
                                    <td className="py-3 text-center font-semibold">
                                        {user.design && user.design.scores[0]
                                            ? user.design.scores[0].score.toFixed(2)
                                            : '-'}
                                    </td>

                                    {/* TOMBOL JUARA */}
                                    <td className="py-3 text-center">
                                       0 
                                    </td>
                                    <td>
                                        {user.design && (
                                            <button
                                                onClick={() => Inertia.get(`/admin/users/${user.id}`)}
                                                className='px-3 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-all duration-300'
                                            >Details</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
