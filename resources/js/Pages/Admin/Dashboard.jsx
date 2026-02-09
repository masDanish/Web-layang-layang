import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, useForm, usePage } from '@inertiajs/react'
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
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    console.log(users)

    const submit = (e) => {
        e.preventDefault();

    }

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
                                <th>Peringkat</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th className="text-center">Desain</th>
                                <th className="text-center">Nilai</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="border-t text-center">
                                    <td className="py-3">{user.design && user.design.scores[0] && user.design.scores[0].score ? index + 1 : "-"}</td>

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

            <div className='max-w-6xl mx-auto mt-20'>
                <h4 className='text-xl font-bold mb-8'>Form pembuatan akun Admin</h4>
                <form
                    onSubmit={submit}
                    className="w-full w-full bg-white p-10 rounded-xl shadow-md"
                >

                    <div className="mb-2">
                        <label className="block text-sm font-medium mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            className="w-full mb-4 rounded-lg border px-4 py-2"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mb-2">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full mb-4 rounded-lg border px-4 py-2"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mb-2">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">

                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mb-4 rounded-lg border px-4 py-2"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mb-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium mb-1">
                            Konfirmasi Password
                        </label>
                        <input
                            type="password"
                            placeholder="Konfirmasi Password"
                            className="w-full mb-6 rounded-lg border px-4 py-2"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData(
                                    'password_confirmation',
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <button
                        disabled={processing}
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Register Akun Juri
                    </button>


                </form>
            </div>

        </AuthenticatedLayout>
    )
}
