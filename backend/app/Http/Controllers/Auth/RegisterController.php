<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    public function register(Request $request)
    {
        // return json_encode([
        //     "success" => 'Registered!'
        // ]);
        // $rules = array(
        //     'firstname' => 'required',
        //     'lastname' => 'required',
        //     'email' => 'required', 'unique:users',
        //     'password' => 'required',
        //     'repeatPassword' => 'required',
        // );
        // $validator = Validator::make($request->all(), $rules);

        // // Check fields.
        // if ($validator->fails()) {
        //     Session::flash('error', trans('Un des champs est manquant.'));
        //     return Redirect::back()->withInput($request->except('password'))->withErrors($validator);
        // }

        // if($request->get('password') != $request->get('repeatPassword')){
        //     Session::flash('error', trans('Les deux mots de passe doivent être identiques.'));
        //     return Redirect::back()->withInput($request->except('mdp'))->withErrors($validator);
        // }

        $user = new User;
        $user->firstname = $request->get('firstname');
        $user->lastname = $request->get('lastname');
        $user->email = $request->get('email');
        $user->password = Hash::make($request->get('password'));
        $user->save();

        return json_encode([
            "success" => 'Registered!'
        ]);
    }
}
