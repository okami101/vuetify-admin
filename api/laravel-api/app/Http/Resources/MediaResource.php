<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\MediaLibrary\HasMedia\HasMedia;

class MediaResource extends JsonResource
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

        if ($this->resource instanceof HasMedia) {
            foreach ($this->resource->files as $key => $options) {
                $media = $this->resource->getMedia($options['collection']);
                $conversions = $options['conversions'] ?? [];

                if ($options['multiple'] ?? false) {
                    foreach ($media as $file) {
                        $attributes[$key][] = $this->getVersions($file, $conversions);
                    }
                    continue;
                }

                if ($file = $media->first()) {
                    $attributes[$key] = $this->getVersions($file, $conversions);
                }
            }
        }

        unset($attributes['media']);
        return $attributes;
    }

    private function getVersions($file, $conversions)
    {
        $attributes = [
            'title' => $file->name
        ];

        if (empty($conversions)) {
            $attributes['src'] = $file->getFullUrl();
            return $attributes;
        }

        $attributes['thumbnails'] = collect($conversions)->mapWithKeys(function($c) use ($file) {
            return [$c => $file->getFullUrl($c)];
        })->toArray();
        return $attributes;
    }
}
