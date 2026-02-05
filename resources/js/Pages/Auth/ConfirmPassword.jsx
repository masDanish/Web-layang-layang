import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Password" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    onSubmit={submit}
                    className="w-full max-w-md bg-white p-10 rounded-xl shadow-md"
                >
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Konfirmasi Password 🔒
                    </h1>
                    <p className="text-center text-gray-500 mb-6">
                        Lomba Design Layang-Layang
                    </p>

                    <p className="text-sm text-gray-600 text-center mb-6">
                        Demi keamanan akun, silakan masukkan kembali password
                        Anda untuk melanjutkan.
                    </p>

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
                            autoFocus
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={processing}
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Konfirmasi
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Batal?{' '}
                        <Link
                            href={route('login')}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Kembali ke Login
                        </Link>
                    </p>
                </form>
            </div>
        </GuestLayout>
    );
}
