<?php

namespace App\Policies;

use App\Models\Author;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AuthorPolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if (! $user->hasRole('author')) {
            return false;
        }
    }

    /**
     * Determine whether the user can view any authors.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the author.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Author  $author
     * @return mixed
     */
    public function view(User $user, Author $author)
    {
        return true;
    }

    /**
     * Determine whether the user can create authors.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can update the author.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Author  $author
     * @return mixed
     */
    public function update(User $user, Author $author)
    {
        return true;
    }

    /**
     * Determine whether the user can delete the author.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Author  $author
     * @return mixed
     */
    public function delete(User $user, Author $author)
    {
        return false;
    }
}
