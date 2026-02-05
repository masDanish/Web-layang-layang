import { usePage, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    if (!auth?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading user...
            </div>
        );
    }

    const logout = () => {
        router.post(route('logout'));
    };

    console.log(auth)

    // Tutup dropdown kalau klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* HEADER */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-indigo-600">
                        🪁 Dashboard {auth.user.role}
                    </h1>

                    {/* ACCOUNT DROPDOWN */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                                {auth.user.name.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-700">
                                {auth.user.name}
                            </span>
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50">
                                <div className="px-4 py-3 border-b">
                                    <p className="text-sm font-semibold">
                                        {auth.user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {auth.user.email}
                                    </p>
                                </div>

                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
