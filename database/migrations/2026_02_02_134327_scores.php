<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id();

            $table->foreignId('design_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->foreignId('juri_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->unsignedTinyInteger('score'); // 1–100
            $table->text('comment')->nullable();

            $table->timestamps();

            // Supaya 1 juri hanya menilai 1 kali per desain
            $table->unique(['design_id', 'juri_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
