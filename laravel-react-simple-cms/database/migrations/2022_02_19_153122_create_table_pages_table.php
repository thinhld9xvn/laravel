<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pages', function (Blueprint $table) {
            //
            $table->id();
            $table->integer('guid')->unique()->index();
            $table->string('post_title', 255)->index();
            $table->text('post_content');
            $table->tinyText('post_excerpt');
            $table->string('post_url', 255)->unique()->index();
            $table->timestamp('post_date')->index();
            $table->timestamp('post_modified_date')->index();
            $table->integer('post_author')->index();
            $table->string('post_status', 6);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pages', function (Blueprint $table) {
            //
        });
    }
}
