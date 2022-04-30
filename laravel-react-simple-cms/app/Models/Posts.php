<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Posts extends Model
{
    use HasFactory;
    protected $table = 'posts';
    public $timestamps = false;
    protected $primaryKey = 'guid';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 
        'guid',
        'post_title',
        'post_content',
        'post_excerpt',
        'post_url',
        'post_date',
        'post_author',
        'post_modified_date',
        'post_status'
    ];
}
