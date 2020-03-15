<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     *
     * @throws \Illuminate\Validation\ValidationException
     *
     * @return array
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'name'     => 'required|max:191',
            'email'    => 'required|email|unique:users,email,'.auth()->id(),
        ]);

        /** @var User $user */
        $user = auth()->user();

        $user->fill($request->input());

        $user->save();

        return [
            'message' => __('crud.account.profile_updated'),
            'user'    => $user,
        ];
    }

    /**
     * @param Request $request
     *
     * @throws \Illuminate\Validation\ValidationException
     *
     * @return array
     */
    public function changePassword(Request $request)
    {
        /** @var User $user */
        $user = auth()->user();

        $this->validate($request, [
            'old_password' => 'required|current_password',
            'new_password' => 'required|confirmed|min:8|strong_password',
        ]);

        $user->password = Hash::make($request->get('new_password'));

        $user->save();

        return [
            'message' => __('crud.account.password_updated'),
        ];
    }
}
