<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can view any users.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the user.
     *
     * @param  \App\Models\User  $auth
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function view(User $auth, User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can create users.
     *
     * @param  \App\Models\User  $auth
     * @return mixed
     */
    public function create(User $auth)
    {
        return true;
    }

    /**
     * Determine whether the user can update the user.
     *
     * @param  \App\Models\User  $auth
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function update(User $auth, User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can delete the user.
     *
     * @param  \App\Models\User  $auth
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function delete(User $auth, User $user)
    {
        return true;
    }
}
