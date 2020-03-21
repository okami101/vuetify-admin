<?php

namespace App\ModelTraits;

use App\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Trait UserRelationTrait
 * @package App\ModelTraits
 *
 * @mixin Model
 */
trait UserRelationTrait
{
    public function users()
    {
        return $this->morphToMany(User::class, 'user_relation');
    }
}
