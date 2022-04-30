<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class MetaStrings extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'id';
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'string '      
    ];
    public function __construct($name = 'users_metastrings') {
        $this->table = $name;
    }
}
