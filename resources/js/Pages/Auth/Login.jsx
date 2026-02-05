import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    onSubmit={submit}
                    className="w-full max-w-md bg-white p-10 rounded-xl shadow-md"
                >
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Login Pengunjung 🪁
                    </h1>
                    <p className="text-center text-gray-500 mb-8">
                        Lomba Design Layang-Layang
                    </p>

                    {/* EMAIL */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="flex items-center justify-end mb-6">
                        <Link
                                href={route('password.request')}
                                className="text-sm text-blue-600 hover:underline"
                            >
                            Lupa password?
                        </Link>
                    </div>

                    <button
                        disabled={processing}
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Belum punya akun?{' '}
                        <Link
                            href={route('register')}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Daftar sekarang
                        </Link>
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
}
