<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    /**
     * Update account infos
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return UserResource
     *@throws \Illuminate\Validation\ValidationException
     *
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'name'  => 'required|max:191',
            'email' => 'required|email|unique:users,email,'.auth()->id(),
        ]);

        /** @var User $user */
        $user = auth()->user();

        $user->fill($request->input());

        $user->save();

        return new UserResource($user);
    }

    /**
     * Change password
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     *
     */
    public function password(Request $request)
    {
        /** @var User $user */
        $user = auth()->user();

        $this->validate($request, [
            'old_password' => 'required|current_password',
            'new_password' => 'required|confirmed|min:8|strong_password',
        ]);

        $user->password = Hash::make($request->input('new_password'));
        $user->save();

        return response()->noContent();
    }
}
