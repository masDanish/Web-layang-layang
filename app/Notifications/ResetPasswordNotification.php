<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends ResetPassword
{
    use Queueable;

    public function toMail($notifiable)
    {
        $url = url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->email,
        ], false));

        return (new MailMessage)
            ->subject('🔐 Reset Password Akun LayangFest')
            ->greeting('Halo 👋')
            ->line('Kami menerima permintaan untuk mereset password akun Anda di **LayangFest**.')
            ->line('Klik tombol di bawah ini untuk melanjutkan:')
            ->action('Reset Password', $url)
            ->line('Link ini hanya berlaku selama 60 menit.')
            ->line('Jika Anda tidak merasa meminta reset password, abaikan email ini.')
            ->salutation('Salam hangat,  
Tim LayangFest 🪁');
    }
}
