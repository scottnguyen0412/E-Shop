<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    // đối nghịch với $fillable
    protected $guarded = [

    ];

    public function order_items()
    {
        return $this->hasMany(OrderITems::class, 'order_id', 'id');
    }
}
