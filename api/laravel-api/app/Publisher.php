<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Publisher
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property string $description
 * @property string $founder
 * @property string $headquarter
 * @property string $url
 * @property string $email
 * @property bool $active
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
        'type',
        'description',
        'founder',
        'headquarter',
        'url',
        'email',
        'active',
        'opening_date',
    ];

    protected $dates = [
        'opening_date'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
