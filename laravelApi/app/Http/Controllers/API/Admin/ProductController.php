<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use File;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        // Validation input
        $validator = Validator::make($request->all(), [
            'category_id'=> 'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
            'meta_title'=>'required|max:191',
            'brand'=>'required|max:20',
            'selling_price'=>'required|max:20',
            'original_price'=>'required|max:20',
            'quantity'=>'required|max:4',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Nếu validitor xác nhận chưa input thì sẽ hiển thị message
        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors'=> $validator->messages(),
            ]);
        }
        else //Tạo mới onbject để store data
        {
            $product = new Product; 
            $product->category_id = $request->input('category_id');
            $product->slug = $request->input('slug');
            $product->name = $request->input('name');
            $product->description = $request->input('description');

            $product->meta_title = $request->input('meta_title');
            $product->meta_keyword = $request->input('meta_keyword');
            $product->meta_description = $request->input('meta_description');

            $product->brand = $request->input('brand');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->quantity = $request->input('quantity');

            // handle image
            if($request->hasFile('image'))
            {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                // Get file name
                $filename = time() .'.'.$extension;
                // Store image
                $file->move('uploads/product', $filename);
                $product->image = 'uploads/product/'.$filename;
            
            }
            $product->featured = $request->input('featured') == TRUE ? '1':'0';
            $product->popular = $request->input('popular') == TRUE ? '1':'0';
            $product->status = $request->input('status') == TRUE ? '1':'0';
            
            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product Added Successfully',
            ]);

    
        }
    }
}
