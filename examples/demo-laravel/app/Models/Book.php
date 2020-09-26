<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Okami101\LaravelAdmin\Traits\RequestMediaTrait;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Translatable\HasTranslations;

/**
 * App\Book
 *
 * @property int $id
 * @property int $publisher_id
 * @property int $category_id
 * @property string|null $isbn
 * @property string $title
 * @property string $description
 * @property string $summary
 * @property array $formats
 * @property float $price
 * @property bool $commentable
 * @property array $tags
 * @property Carbon $publication_date
 * @property-read Category $category
 * @property-read Collection|Review[] $reviews
 * @property-read int|null $reviews_count
 * @property-read Publisher $publisher
 * @property-read Collection|Author[] $authors
 * @property-read int|null $authors_count
 * @property-read mixed $translations
 * @property-read Collection|Media[] $media
 * @property-read int|null $media_count
 * @method static Builder|Book newModelQuery()
 * @method static Builder|Book newQuery()
 * @method static Builder|Book query()
 * @method static Builder|Book publishedAfter($date)
 * @method static Builder|Book publishedBefore($date)
 * @method static Builder|Book cheaperThan($value)
 * @method static Builder|Book pricierThan($value)
 * @method static Builder|Book commentables()
 * @mixin Eloquent
 */
class Book extends Model implements HasMedia
{
    use HasFactory;
    use HasTranslations;
    use RequestMediaTrait;

    public $timestamps = false;

    protected $fillable = [
        'publisher_id',
        'isbn',
        'title',
        'description',
        'summary',
        'price',
        'category_id',
        'formats',
        'commentable',
        'tags',
        'publication_date',
    ];

    protected $casts = [
        'price' => 'float',
        'commentable' => 'boolean',
        'formats' => 'array',
        'tags' => 'array',
        'publication_date' => 'datetime:Y-m-d',
    ];

    public $translatable = ['title', 'description', 'summary'];

    protected function getLocale(): string
    {
        return request()->header('locale') ?: app()->getLocale();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover')->singleFile();
        $this->addMediaCollection('extract')->singleFile();
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
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

    public function registerMediaConversions(Media $media = null): void
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
