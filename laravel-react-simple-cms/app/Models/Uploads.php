<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Uploads extends Model
{
    use HasFactory;
    protected $table = 'uploads';
    public $timestamps = false;
    protected $primaryKey = 'id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 
        'attachment',
        'title',
        'alt',
        'description',
        'dir'
    ];
}
