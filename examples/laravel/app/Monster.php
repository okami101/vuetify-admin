<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\Models\Media;
use Spatie\Translatable\HasTranslations;
use Vtec\Crud\Traits\RequestMediaTrait;

class Monster extends Model implements HasMedia
{
    use HasTranslations;
    use RequestMediaTrait;

    protected $fillable = ['name', 'email', 'label', 'active', 'level', 'rating', 'price', 'description', 'body', 'category', 'tags', 'publication_date'];

    protected $casts = ['active' => 'boolean', 'level' => 'integer', 'rating' => 'integer', 'price' => 'float', 'tags' => 'array'];

    public $translatable = ['label', 'description', 'body'];

    public function children()
    {
        return $this->hasMany(MonsterChild::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')->singleFile();
        $this->addMediaCollection('images');
        $this->addMediaCollection('files');
    }

    public function registerMediaConversions(Media $media = null): void
    {
        //
    }
}
