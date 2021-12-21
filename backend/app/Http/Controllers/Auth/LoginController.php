<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        // $rules = array(
        //     'email' => 'required',
        //     'password' => 'required',
        // );
        // $validator = Validator::make($request->all(), $rules);

        // // Check fields.
        // if ($validator->fails()) {
        //     Session::flash('error', trans('Un des champs est manquant.'));
        //     return Redirect::back()->withInput()->withErrors($validator);
        // }

        $user_found = User::where('email', $request->get('email'))->first();
        if($user_found == null) {
            return response('Wrong email', 403);
        }

        if(Hash::check($request->password, $user_found->password)) {
            return json_encode([
                "success" => $user_found
            ]);         
            // return Redirect::back();
        }
        else{
            return response('Wrong logins', 403);
        }
    }

    public function logout(){
        Auth::logout();
        Session::flush();
        return Redirect::to('/');
    }
}
