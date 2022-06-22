<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    // đối nghịch với $fillable
    protected $guarded = [

    ];

    // Create relationship to show name category on product
    protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
