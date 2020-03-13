<?php

namespace App\Http\Resources;

class Publisher extends BaseResource
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
                'self' => route('publishers.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
