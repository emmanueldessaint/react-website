<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Contact;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;

class UserController extends Controller
{
    public function subscribe(Request $request) {
        $user = User::where('email', $request->userInfo)->first();

        if (isset($user)) {
            $user->subscribed = 1;
        } else {
            $user = User::create([
                'email' => $request->userInfo,
                'subscribed' => 1
            ]);
        }
        $user->save();

        return json_encode([
            "success" => 'User subscribed!'
        ]);
    }

    public function contact(Request $request) {
        $contact = Contact::create([
            'email' => $request->email,
            'name' => $request->name,
            'message' => $request->message
        ]);
        $contact->save();

        return json_encode([
            "success" => 'Message sent!'
        ]);
    }

    public function test(Request $request) {
        return 'test!';
    }
}
