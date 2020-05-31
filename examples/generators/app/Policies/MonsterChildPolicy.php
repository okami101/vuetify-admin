<?php

namespace App\Policies;

use App\MonsterChild;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MonsterChildPolicy
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
     * @param  \App\MonsterChild  $monsterChild
     * @return mixed
     */
    public function view(User $user, MonsterChild $monsterChild)
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
     * @param  \App\MonsterChild  $monsterChild
     * @return mixed
     */
    public function update(User $user, MonsterChild $monsterChild)
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\MonsterChild  $monsterChild
     * @return mixed
     */
    public function delete(User $user, MonsterChild $monsterChild)
    {
        return true;
    }
}
