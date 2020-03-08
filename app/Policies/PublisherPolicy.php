<?php

namespace App\Policies;

use App\Publisher;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PublisherPolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can view any publishers.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the publisher.
     *
     * @param  \App\User  $user
     * @param  \App\Publisher  $publisher
     * @return mixed
     */
    public function view(User $user, Publisher $publisher)
    {
        return true;
    }

    /**
     * Determine whether the user can create publishers.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the publisher.
     *
     * @param  \App\User  $user
     * @param  \App\Publisher  $publisher
     * @return mixed
     */
    public function update(User $user, Publisher $publisher)
    {
        return true;
    }

    /**
     * Determine whether the user can delete the publisher.
     *
     * @param  \App\User  $user
     * @param  \App\Publisher  $publisher
     * @return mixed
     */
    public function delete(User $user, Publisher $publisher)
    {
        return true;
    }
}
