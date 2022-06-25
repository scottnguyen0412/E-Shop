<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;

class CartController extends Controller
{
    public function addtocart(Request $request)
    {
        // Check user đăng nhập chưa để có thể add to cart
        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_quantity = $request->product_quantity;

            // Check product exist
            $product_check = Product::where('id', $product_id)->first();

            if($product_check)
            {
                // Check cart is exist and check user đã đăng nhập 
                if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=> $product_check->name .' Already added to cart',
                    ]);
                }
                else
                {
                    $cartItem = new Cart;
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_quantity = $product_quantity;
                    $cartItem->save();

                    return response()->json([
                        'status'=> 201,
                        'message'=> 'Added to Cart',
                    ]);
                }
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message'=> 'Product Not Found',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=> 401,
                'message'=> 'Login to Add to Cart',
            ]);
        }
    }
}
