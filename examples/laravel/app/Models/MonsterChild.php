<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonsterChild extends Model
{
    use HasFactory;

    protected $fillable = ['monster_id', 'name'];

    protected $casts = [];

    public function monster()
    {
        return $this->belongsTo(Monster::class);
    }
}
