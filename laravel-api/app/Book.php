<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Book
 *
 * @property int $id
 * @property string|null $isbn
 * @property string $title
 * @property string $description
 * @property string $author
 * @property string $publication_date
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book query()
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Review[] $reviews
 * @property-read int|null $reviews_count
 */
class Book extends Model
{
    public $timestamps = false;

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
