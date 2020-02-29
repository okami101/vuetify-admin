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
                $conversion = $options['conversion'] ?? '';

                if ($options['multiple'] ?? false) {
                    foreach ($media as $file) {
                        $attributes[$key][] = [
                            'title' => $file->file_name,
                            'src' => $file->getFullUrl($conversion),
                        ];
                    }
                    continue;
                }

                if ($file = $media->first()) {
                    $attributes[$key] = [
                        'title' => $file->file_name,
                        'src' => $file->getFullUrl($conversion),
                    ];
                }
            }
        }

        unset($attributes['media']);
        return $attributes;
    }
}
