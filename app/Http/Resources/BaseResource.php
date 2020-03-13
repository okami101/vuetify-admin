<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\MediaCollection\MediaCollection;
use Spatie\MediaLibrary\Models\Media;

class BaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $attributes = parent::toArray($request);

        /**
         * Generate array ids for relation collections (belongsToMany or hasMany)
         */
        collect($this->resource->getRelations())->each(function ($relation, $name) use (&$attributes) {
            $items = $this->whenLoaded($name);
            if ($items instanceof Collection) {
                $class = strtolower(basename(get_class($this->resource->$name()->getRelated())));
                $attributes["{$class}_ids"] = $items->pluck('id');
            }

            /**
             * Remove list entirely from response because VA can use only ids for fetching relations
             */
            unset($attributes[$name]);
        });

        /**
         * Translatable API generator
         */
        if (property_exists($this->resource, 'translatable')) {
            collect($this->resource->translatable)->each(function ($field) use (&$attributes) {
                $attributes[$field] = $this->resource->getTranslation(
                    $field,
                    request()->get('locale') ?: app()->getLocale()
                );
            });
        }

        /**
         * Media API generator
         */
        if ($this->resource instanceof HasMedia) {
            $this->resource->registerMediaCollections();

            /** @var MediaCollection $collection */
            collect($this->resource->mediaCollections)->each(function (MediaCollection $collection) use (&$attributes) {
                /** @var Collection $media */
                $media = $this->resource->getMedia($collection->name);

                if (! $collection->singleFile) {
                    foreach ($media as $file) {
                        $attributes[$collection->name][] = $this->getVersions($file);
                    }
                    return;
                }

                if ($file = $media->first()) {
                    $attributes[$collection->name] = $this->getVersions($file);
                }
            });
        }

        return $attributes;
    }

    private function getVersions(Media $file)
    {
        $attributes = [
            'id' => $file->id,
            'title' => $file->name
        ];

        $conversions = $file->getMediaConversionNames();

        if (empty($conversions)) {
            $attributes['src'] = $file->getFullUrl();
            return $attributes;
        }

        $attributes['thumbnails'] = collect($conversions)->mapWithKeys(function ($c) use ($file) {
            return [$c => $file->getFullUrl($c)];
        })->toArray();
        return $attributes;
    }
}
