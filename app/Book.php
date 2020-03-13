<?php

namespace App;

use App\ModelTraits\RequestMediaTrait;
use App\ModelTraits\RequestTranslatableTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

/**
 * App\Book
 *
 * @property int $id
 * @property int $publisher_id
 * @property string|null $isbn
 * @property string $title
 * @property string $description
 * @property string $summary
 * @property string $category
 * @property array $formats
 * @property float $price
 * @property bool $commentable
 * @property array $tags
 * @property Carbon $publication_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Review[] $reviews
 * @property-read int|null $reviews_count
 * @property-read \App\Publisher $publisher
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Author[] $authors
 * @property-read int|null $authors_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book publishedAfter($date)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book publishedBefore($date)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book cheaperThan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book pricierThan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Book commentables()
 * @mixin \Eloquent
 */
class Book extends Model implements HasMedia
{
    use HasMediaTrait;
    use RequestTranslatableTrait;
    use RequestMediaTrait;

    public $timestamps = false;

    protected $fillable = [
        'publisher_id',
        'isbn',
        'title',
        'description',
        'summary',
        'price',
        'category',
        'formats',
        'commentable',
        'tags',
        'publication_date',
    ];

    protected $casts = [
        'price' => 'float',
        'commentable' => 'boolean',
        'formats' => 'array',
        'tags' => 'array'
    ];

    protected $dates = [
        'publication_date'
    ];

    public $translatable = ['title', 'description', 'summary'];

    protected $with = ['media'];

    public function registerMediaCollections()
    {
        $this->addMediaCollection('cover')->singleFile();
        $this->addMediaCollection('extract')->singleFile();
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function authors()
    {
        return $this->belongsToMany(Author::class);
    }

    public function scopeCommentables(Builder $query): Builder
    {
        return $query->where('commentable', '=', true);
    }

    public function scopePricierThan(Builder $query, $value): Builder
    {
        return $query->where('price', '>=', $value);
    }

    public function scopeCheaperThan(Builder $query, $value): Builder
    {
        return $query->where('price', '<=', $value);
    }

    public function scopePublishedBefore(Builder $query, $date): Builder
    {
        return $query->where('publication_date', '<=', Carbon::parse($date));
    }

    public function scopePublishedAfter(Builder $query, $date): Builder
    {
        return $query->where('publication_date', '>=', Carbon::parse($date));
    }

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('small')
            ->fit(Manipulations::FIT_CROP, 120, 80)
            ->nonOptimized();

        $this->addMediaConversion('medium')
            ->width(400)
            ->height(300)
            ->nonOptimized();

        $this->addMediaConversion('large')
            ->width(800)
            ->height(600)
            ->nonOptimized();
    }
}
