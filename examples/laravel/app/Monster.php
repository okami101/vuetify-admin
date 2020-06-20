<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Vtec\Crud\Traits\RequestMediaTrait;
use Vtec\Crud\Traits\RequestTranslatableTrait;

class Monster extends Model implements HasMedia
{
    use RequestMediaTrait;
    use RequestTranslatableTrait;

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
