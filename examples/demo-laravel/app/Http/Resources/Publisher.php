<?php

namespace App\Http\Resources;

use Okami101\LaravelAdmin\Http\Resources\BaseResource;

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
        $attributes['users'] = User::collection($this->whenLoaded('users'));

        $attributes += [
            'links' => [
                'self' => route('publishers.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
