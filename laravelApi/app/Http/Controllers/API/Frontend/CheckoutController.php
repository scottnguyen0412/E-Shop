<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Models\Cart;

class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if(auth('sanctum')->check())
        {
            // Validation input user
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:10',
                'email' => 'required|max:191|unique:orders',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',                
                'zipcode' => 'required|max:191',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            }
            else
            {
                $user_id = auth('sanctum')->user()->id;
                $order = new Order;
                // Check user login 
                $order->user_id = $user_id;
                $order->first_name = $request->firstname;
                $order->last_name = $request->lastname;
                $order->phone = $request->phone;
                $order->email = $request->email;
                $order->address = $request->address;
                $order->city = $request->city;
                $order->state = $request->state;
                $order->zipcode = $request->zipcode;
                $order->payment_mode = $request->payment_mode;
                $order->payment_id = $request->payment_id;
                $order->tracking_no = 'scott'.rand(1111,9999);
                $order->save();

                $cart = Cart::where('user_id', $user_id)->get();

                // store $item of foreach
                $orderItem = [];
                foreach($cart as $item)
                {
                    $orderItem[] = [
                        // Get product_id and and product_quantity of Cart and storage to OrderItems 
                        'product_id' => $item->product_id,
                        'quantity' => $item->product_quantity,
                        'price' => $item->product->selling_price,
                    ];
                    $item->product->update([
                        // Sau khi thanh toán thì quantity của product sẽ bị trừ đi
                        'quantity'=> $item->product->quantity - $item->product_quantity,
                    ]);
                }
                // Create relationship Order and OrderItems Model
                $order->order_items()->createMany($orderItem);

                // Remove cart item out of cart
                Cart::destroy($cart);

                return response()->json([
                    'status'=>200,
                    'message'=>'Order Placed Successfully',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue',
            ]);
        }
    }


    public function validateOrder(Request $request)
    {
        if(auth('sanctum')->check())
        {
            // Validation input user
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:10',
                'email' => 'required|max:191|unique:orders',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',                
                'zipcode' => 'required|max:191',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            }
            else
            {

                return response()->json([
                    'status'=>200,
                    'message'=>'Form Validated Successfully',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue',
            ]);
        }
    }
}
