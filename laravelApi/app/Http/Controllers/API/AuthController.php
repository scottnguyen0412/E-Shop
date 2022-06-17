<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validation input
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8|',
        ]);

        if ($validator->fails()) {
            return response()->json([
                // Thông báo lỗi nếu fail
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            // Mỗi lần đăng kí một tài khoản mới thì sẽ tự generate ra một token và được lưu lại
            // trong mail của người đăng kí
            $token = $user->createToken($user->email . '_Token')->plainTextToken;
            // reponse 200 nếu mọi thú là thành công
            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'Registered Successfully',
            ]);
        }
    }
}
