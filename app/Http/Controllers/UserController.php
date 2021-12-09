<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Contact;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class UserController extends Controller
{
    public function subscribe(Request $request) {
        $user = User::where('email', $request->email)->first();

        if (isset($user)) {
            $user->subscribed = 1;
        } else {
            $user = User::create([
                'email' => $request->email,
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
}
