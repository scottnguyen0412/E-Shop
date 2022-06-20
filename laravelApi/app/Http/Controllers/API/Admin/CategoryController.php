<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CategoryController extends Controller
{
    // Show Category
    public function index()
    {
        $category = Category::all();
        return  response()->json([
            'status' => 200,
            'category' => $category,
            
        ]);
    }

    // Edit category
    public function edit($id)
    {
        $category = Category::find($id);
        if($category)
        {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Category Id found'
            ]);
        }
    }
    public function update(Request $request, $id)
    {
        // Validation input
        $validator = Validator::make($request->all(), [
            'meta_title' => 'required|max:191',
            'slug'=> 'required|max:191',
            'name' => 'required|max:191',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else{
            $category = Category::find($id);
            if($category)
            {
                $category->meta_title = $request->input('meta_title');
                $category->meta_keyword = $request->input('meta_keyword');
                $category->meta_description = $request->input('meta_description');
                $category->slug = $request->input('slug');
                $category->name = $request->input('name');    
                $category->description = $request->input('description');
                $category->status = $request->input('status') == TRUE ? '1':'0';
                $category->save();
                return response()->json([
                    'status'=> 200,
                    'message'=>'Category Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message'=>'No Category Id Found',
                ]);
            }
        }
    }


    // Add category and save
    public function store(Request $request)
    {
        // Validation input
        $validator = Validator::make($request->all(), [
            'meta_title' => 'required|max:191',
            'slug'=> 'required|max:191',
            'name' => 'required|max:191',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'errors'=>$validator->messages(),
            ]);
        }
        else{
            $category = new Category;
            $category->meta_title = $request->input('meta_title');
            $category->meta_keyword = $request->input('meta_keyword');
            $category->meta_description = $request->input('meta_description');
            $category->slug = $request->input('slug');
            $category->name = $request->input('name');    
            $category->description = $request->input('description');
            $category->status = $request->input('status') == TRUE ? '1':'0';
            $category->save();
            return response()->json([
                'status'=> 200,
                'message'=>'Category Added Successfully',
            ]);
        }
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if($category)
        {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Category Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status' => 400,
                'message' => 'No Category Id Found',
            ]);
        }
    }
}
