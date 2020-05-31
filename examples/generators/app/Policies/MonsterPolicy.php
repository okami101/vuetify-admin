<?php

namespace App\Policies;

use App\Monster;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MonsterPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Monster  $monster
     * @return mixed
     */
    public function view(User $user, Monster $monster)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Monster  $monster
     * @return mixed
     */
    public function update(User $user, Monster $monster)
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Monster  $monster
     * @return mixed
     */
    public function delete(User $user, Monster $monster)
    {
        return true;
    }
}
