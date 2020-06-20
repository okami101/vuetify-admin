<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMonstersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monsters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->json('label');
            $table->boolean('active')->default(0);
            $table->integer('level')->unsigned()->default(0);
            $table->integer('rating')->unsigned()->default(0);
            $table->float('price');
            $table->json('description');
            $table->json('body');
            $table->string('category');
            $table->json('tags');
            $table->string('publication_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('monsters');
    }
}
