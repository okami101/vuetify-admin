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

        if ($this->whenLoaded('reviews') instanceof Collection) {
            unset($attributes['reviews']);
            $attributes['review_ids'] = $this->whenLoaded('reviews')->pluck('id');
        }

        $attributes += [
            'links' => [
                'self' => route('books.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
