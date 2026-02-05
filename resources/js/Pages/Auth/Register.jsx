import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    onSubmit={submit}
                    className="w-full max-w-md bg-white p-10 rounded-xl shadow-md"
                >
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Daftar Pengunjung 🪁
                    </h1>
                    <p className="text-center text-gray-500 mb-8">
                        Lomba Design Layang-Layang
                    </p>

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

                    <button
                        disabled={processing}
                        className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                    >
                        Daftar
                    </button>

                    <p className="text-center text-sm mt-6">
                        Sudah punya akun?{' '}
                        <Link
                            href={route('login')}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
}
