<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MonsterChild extends Model
{
    protected $fillable = ['monster_id', 'name'];

    protected $casts = [];

    public function monster()
    {
        return $this->belongsTo(Monster::class);
    }
}
