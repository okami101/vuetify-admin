<?php

namespace App\Http\Resources;

class Book extends BaseResource
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

        $attributes['publisher'] = Publisher::make($this->whenLoaded('publisher'));
        $attributes['authors'] = Author::collection($this->whenLoaded('authors'));
        $attributes['reviews'] = Review::collection($this->whenLoaded('reviews'));

        $attributes += [
            'links' => [
                'self' => route('books.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
