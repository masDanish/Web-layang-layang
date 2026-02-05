<x-guest-layout>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-600">
        <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-2xl font-bold text-center text-gray-800">
                Lomba Desain Layang-Layang
            </h1>
            <p class="text-center text-sm text-gray-500 mb-6">
                Silakan login untuk mengikuti lomba
            </p>

            <x-auth-session-status class="mb-4" :status="session('status')" />

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div>
                    <x-input-label for="email" value="Email" />
                    <x-text-input id="email" class="block mt-1 w-full"
                        type="email" name="email" required autofocus />
                </div>

                <div class="mt-4">
                    <x-input-label for="password" value="Password" />
                    <x-text-input id="password" class="block mt-1 w-full"
                        type="password" name="password" required />
                </div>

                <div class="flex justify-between items-center mt-4">
                    <label class="flex items-center">
                        <input type="checkbox" class="rounded border-gray-300">
                        <span class="ms-2 text-sm">Ingat saya</span>
                    </label>
                </div>

                <button
                    class="mt-6 w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition">
                    Login
                </button>
            </form>
        </div>
    </div>
</x-guest-layout>
