<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

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
        $rules = array(
            'email' => 'required',
            'password' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);

        // Check fields.
        if ($validator->fails()) {
            Session::flash('error', trans('Un des champs est manquant.'));
            return Redirect::back()->withInput()->withErrors($validator);
        }

        $user_found = User::where('email', '=', $request->get('email'))->first();
        if($user_found == null) {
            return response('Identifiants incorrects', 403);
        }

        if(Auth::attempt(['email' => $request->get('email'), 'password' => $request->get('password')], true)) {
            return Redirect::back();
        }
        else{
            return response('Identifiants incorrects', 403);
        }
    }

    public function logout(){
        Auth::logout();
        Session::flush();
        return Redirect::to('/');
    }
}
