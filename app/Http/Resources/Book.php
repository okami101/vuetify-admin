<?php

namespace App\Http\Resources;

use Illuminate\Support\Collection;

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

        $attributes += [
            //'authors' => $this->whenLoaded('authors')->pluck('id'),
            //'reviews' => $this->whenLoaded('reviews')->pluck('id'),
            'links' => [
                'self' => route('books.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
