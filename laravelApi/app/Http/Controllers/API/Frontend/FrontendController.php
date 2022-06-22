<?php

namespace App\Http\Controllers\Api\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
class FrontendController extends Controller
{
    // Show category
    public function category()
    {
        // Lấy tất cả category khi status = '0'. Nghĩa là status được show
        $category = Category::where('status','0')->get();
        return response()->json([
            'status' => 200,
            'category'=> $category,
        ]);
    }
}
