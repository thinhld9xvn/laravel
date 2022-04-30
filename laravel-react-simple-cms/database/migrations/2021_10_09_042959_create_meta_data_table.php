<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMetaDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('metadata', function (Blueprint $table) {
            $table->id();
            $table->integer('entity_guid');
            $table->string('entity_object');
            $table->integer('name_id')->index();
            $table->integer('value_id')->index();
            $table->string('value_type');
            $table->integer('owner_guid')->index();
            $table->tinyInteger('access_id')->index();
            $table->string('time_created');
            $table->string('enabled', 3)->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('metadata');
    }
}
