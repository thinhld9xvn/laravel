<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class MetaData extends Model
{
    use HasFactory;
    protected $table = 'metadata';
    public $timestamps = false;
    protected $primaryKey = 'id';
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 
        'entity_guid', 
        'entity_object',
        'name_id ',
        'value_id',
        'value_type',
        'owner_guid',
        'access_id',
        'time_created',
        'enabled' 
    ];
}
