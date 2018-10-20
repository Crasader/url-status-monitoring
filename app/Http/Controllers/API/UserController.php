<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;

class UserController extends Controller 
{
    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 

        if(Auth::attempt(['username' => request('username'), 'password' => request('password')])){ 
            //check user identity and return success response if exist
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('IconsApp')->accessToken; 
            $success['username'] =  $user->username; 
            $success['email'] =  $user->email; 
            return response()->json(['success' => $success], $this->successStatus()); 
        } 
        //user doesn't exist
        return response()->json(['error' => 'Unauthorised'], $this->unauthorisedStatus()); 
    }
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        //request input validation
        $validator = Validator::make($request->all(), [ 
            'username' => 'unique:users|required', 
            'email' => 'unique:users|required|email', 
            'password' => 'required|min:6', 
            'c_password' => 'required|same:password', 
        ]);

        if ($validator->fails()) { 
            return response()->json(['error' => $validator->errors()], $this->badRequestStatus());            
        }
        //if pass validation test create user and return token and name
        $input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('IconsApp')->accessToken; 
        $success['username'] =  $user->username;
        $success['email'] =  $user->email;

        return response()->json(['success' => $success], $this->successStatus()); 
    }
}