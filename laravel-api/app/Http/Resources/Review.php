<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Review extends JsonResource
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

        $attributes['book'] = new BookEmbedded($this->whenLoaded('book'));

        $attributes += [
            'links' => [
                'self' => route('reviews.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
