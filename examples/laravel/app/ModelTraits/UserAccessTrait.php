<?php

namespace App\ModelTraits;

use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Trait UserRelationTrait
 * @package App\ModelTraits
 *
 * @mixin Model
 */
trait UserAccessTrait
{
    public function users()
    {
        return $this->morphToMany(User::class, 'user_relation');
    }

    public function scopeHasUser(Builder $query, User $user): Builder
    {
        if (! $user->hasRole('admin')) {
            return $query->whereHas('users', function (Builder $query) use ($user) {
                $query->where('user_id', '=', $user->id);
            });
        }

        return $query;
    }

    public function canAccess(User $user)
    {
        return $this->users->contains('id', '=', $user->id);
    }
}
