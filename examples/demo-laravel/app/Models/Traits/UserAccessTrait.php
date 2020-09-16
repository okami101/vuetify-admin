<?php

namespace App\Models\Traits;

use App\Models\User;
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
        return $query->whereHas('users', function (Builder $query) use ($user) {
            $query->where('user_id', '=', $user->id);
        });
    }
}
