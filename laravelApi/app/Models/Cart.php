<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'carts';
    // đối nghịch với $fillable
    protected $guarded = [

    ];

    protected $with = ['product'];
    public function product()
    {
        return $this->belongsTo(Product::class,'product_id','id');
    }
}
