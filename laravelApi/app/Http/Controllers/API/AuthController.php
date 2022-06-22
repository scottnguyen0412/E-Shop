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

    // Login
    public function login(Request $request)
    {
        // Validation input
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                // Thông báo lỗi nếu fail
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            // Check email and password user
            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials',
                ]);
            }
            // If email and password is correct 
            else {
                if($user->roles == 1)
                {
                    $role = 'admin';
                    $token = $user->createToken($user->email . '_AdminToken',['server:admin'])->plainTextToken;
                }
                else
                {   
                    $role = '';
                    $token = $user->createToken($user->email . '_Token',['server:user'])->plainTextToken;
                }
                // reponse 200 nếu mọi thứ là thành công
                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'token' => $token,
                    'message' => 'Logged In Successfully',
                    'role' => $role
                ]);
            }
        }
    }

    // Logout sytem
    public function logout()
    {
        // Check auth user muốn logout để xóa token
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out Successfully',
        ]);
    }
}
