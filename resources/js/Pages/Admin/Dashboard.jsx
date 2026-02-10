import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import { useState } from 'react'

export default function Dashboard() {
    // ================= DATA =================
    const { users = [], juri = [] } = usePage().props

    // ================= TAMBAH JURI =================
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('admin.juri.store'), {
            onSuccess: () => {
                alert('Akun juri berhasil dibuat')
                setData({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                })
            },
        })
    }

    // ================= HAPUS JURI =================
    const deleteJuri = (id) => {
        if (confirm('Yakin ingin menghapus akun juri ini?')) {
            router.delete(route('admin.juri.destroy', id), {
                onSuccess: () => alert('Akun juri berhasil dihapus'),
            })
        }
    }

    // ================= EDIT JURI =================
    const [editJuri, setEditJuri] = useState(null)

    const openEdit = (j) => {
        setEditJuri({
            id: j.id,
            name: j.name || '',
            email: j.email || '',
            password: '',
            password_confirmation: '',
        })
    }

    const updateJuri = (e) => {
        e.preventDefault()

        const payload = {
            name: editJuri.name,
            email: editJuri.email,
        }

        // kirim password hanya jika diisi
        if (editJuri.password) {
            payload.password = editJuri.password
            payload.password_confirmation = editJuri.password_confirmation
        }

        router.put(route('admin.juri.update', editJuri.id), payload, {
            onSuccess: () => {
                alert('Data juri berhasil diperbarui')
                setEditJuri(null)
            },
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Admin" />

            {/* ================= PESERTA ================= */}
            <div className="max-w-6xl mx-auto">
                <h1 className="text-xl font-bold mb-6">Daftar Peserta</h1>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3">#</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Desain</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-gray-500">
                                        Belum ada peserta
                                    </td>
                                </tr>
                            )}

                            {users.map((user, index) => (
                                <tr key={user.id} className="border-t text-center">
                                    <td className="py-3">{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.design ? 'Ada' : 'Belum'}</td>
                                    <td className="font-semibold">
                                        {user.design?.scores?.length
                                            ? user.design.scores[0].score
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= JURI ================= */}
            <div className="max-w-6xl mx-auto mt-20">
                <h2 className="text-xl font-bold mb-6">Daftar Juri</h2>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Nama</th>
                                <th>Email</th>
                                <th className="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {juri.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="py-4 text-center text-gray-500">
                                        Belum ada akun juri
                                    </td>
                                </tr>
                            )}

                            {juri.map((j) => (
                                <tr key={j.id} className="border-t text-center">
                                    <td className="py-3">{j.name}</td>
                                    <td>{j.email}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => openEdit(j)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteJuri(j.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= FORM EDIT JURI ================= */}
            {editJuri && (
                <div className="max-w-xl mx-auto mt-16">
                    <h3 className="text-lg font-bold mb-4">Edit Akun Juri</h3>

                    <form onSubmit={updateJuri} className="bg-white p-6 rounded-xl shadow">
                        <div className="mb-4">
                            <label>Nama</label>
                            <input
                                className="w-full border rounded px-4 py-2"
                                value={editJuri.name}
                                onChange={(e) =>
                                    setEditJuri({ ...editJuri, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label>Email</label>
                            <input
                                type="email"
                                className="w-full border rounded px-4 py-2"
                                value={editJuri.email}
                                onChange={(e) =>
                                    setEditJuri({ ...editJuri, email: e.target.value })
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label>Password Baru (opsional)</label>
                            <input
                                type="password"
                                className="w-full border rounded px-4 py-2"
                                value={editJuri.password}
                                onChange={(e) =>
                                    setEditJuri({ ...editJuri, password: e.target.value })
                                }
                            />
                        </div>

                        <div className="mb-6">
                            <label>Konfirmasi Password</label>
                            <input
                                type="password"
                                className="w-full border rounded px-4 py-2"
                                value={editJuri.password_confirmation}
                                onChange={(e) =>
                                    setEditJuri({
                                        ...editJuri,
                                        password_confirmation: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="flex gap-3">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded">
                                Simpan
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditJuri(null)}
                                className="bg-gray-400 text-white px-6 py-2 rounded"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ================= TAMBAH JURI ================= */}
            <div className="max-w-6xl mx-auto mt-20">
                <h3 className="text-xl font-bold mb-6">Tambah Akun Juri</h3>

                <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-md">
                    <div className="mb-4">
                        <label>Nama</label>
                        <input
                            className="w-full border rounded px-4 py-2"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label>Email</label>
                        <input
                            type="email"
                            className="w-full border rounded px-4 py-2"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label>Password</label>
                        <input
                            type="password"
                            className="w-full border rounded px-4 py-2"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label>Konfirmasi Password</label>
                        <input
                            type="password"
                            className="w-full border rounded px-4 py-2"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                    </div>

                    <button
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-3 rounded"
                    >
                        Buat Akun Juri
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
