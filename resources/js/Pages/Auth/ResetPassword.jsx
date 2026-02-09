import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                    onSubmit={submit}
                    className="w-full max-w-md bg-white p-10 rounded-xl shadow-md"
                >
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Reset Password 🔐
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
                            className="w-full rounded-lg border px-4 py-2 bg-gray-100"
                            value={data.email}
                            disabled
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-1">
                            Password Baru
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

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">
                            Konfirmasi Password
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData(
                                    'password_confirmation',
                                    e.target.value
                                )
                            }
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={processing}
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}
