<?php

namespace App\Models;

use App\Models\Traits\UserAccessTrait;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Okami101\LaravelAdmin\Traits\RequestMediaTrait;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Translatable\HasTranslations;

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
 * @property object $address
 * @property bool $active
 * @property string $opening_date
 * @property-read Collection|Book[] $books
 * @property-read int|null $books_count
 * @method static Builder|Publisher newModelQuery()
 * @method static Builder|Publisher newQuery()
 * @method static Builder|Publisher query()
 * @mixin Eloquent
 * @property-read mixed $translations
 * @property-read Collection|Media[] $media
 * @property-read int|null $media_count
 * @property-read Collection|User[] $users
 * @property-read int|null $users_count
 * @method static Builder|Publisher hasUser(User $user)
 */
class Publisher extends Model implements HasMedia
{
    use HasFactory;
    use HasTranslations;
    use RequestMediaTrait;
    use UserAccessTrait;

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
        'address',
        'opening_date',
    ];

    protected $casts = [
        'active' => 'boolean',
        'address' => 'object',
        'opening_date' => 'datetime:Y-m-d',
    ];

    public $translatable = ['description'];

    protected function getLocale(): string
    {
        return request()->header('locale') ?: app()->getLocale();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')->singleFile();
        $this->addMediaCollection('local');
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('small')
            ->width(120)
            ->height(80)
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
