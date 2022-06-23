<?php

namespace App\Http\Controllers\Api\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
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

    public function product($slug)
    {
        // Check and get category có slug cùng với status = 0 là được show hay không
        $category = Category::where('slug',$slug)->where('status', '0')->first();
        if($category)
        {
            $product = Product::where('category_id',$category->id)->where('status','0')->get();
            if($product) // Nếu product là có
            {
                return response()->json([
                    'status'=>200,
                    'product_data'=>[
                        'product'=>$product,
                        'category'=>$category
                    ]
                ]);
            }
            else
            {
                return response()->json([
                'status' => 400,
                'message'=>'No Product Found'
            ]);
            }
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message'=>'No Category Found'
            ]);
        }
    }
}
