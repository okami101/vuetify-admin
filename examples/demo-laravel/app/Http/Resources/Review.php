<?php

namespace App\Http\Resources;

use Vtec\Crud\Http\Resources\BaseResource;

class Review extends BaseResource
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

        $attributes['book'] = Book::make($this->whenLoaded('book'));

        $attributes += [
            'links' => [
                'self' => route('reviews.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
