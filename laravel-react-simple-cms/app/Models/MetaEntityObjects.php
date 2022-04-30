<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class MetaEntityObjects extends Model
{
    use HasFactory;
    protected $table = 'meta_entity_objects';
    public $timestamps = false;
    protected $primaryKey = 'id';
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 
        'guid', 
        'name'
    ];
}
