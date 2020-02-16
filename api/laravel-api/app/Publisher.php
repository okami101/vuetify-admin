<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Publisher
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $founder
 * @property string $headquarter
 * @property string $opening_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Book[] $books
 * @property-read int|null $books_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Publisher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Publisher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Publisher query()
 * @mixin \Eloquent
 */
class Publisher extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'founder',
        'headquarter',
        'opening_date',
    ];

    protected $dates = [
        'opening_date'
    ];

    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
