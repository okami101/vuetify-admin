<?php

namespace App\Http\Resources;

use Okami101\LaravelAdmin\Http\Resources\BaseResource;

class Author extends BaseResource
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

        $attributes['books'] = Book::collection($this->whenLoaded('books'));

        $attributes += [
            'links' => [
                'self' => route('authors.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
