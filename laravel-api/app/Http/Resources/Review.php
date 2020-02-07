<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Review extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $attributes = parent::toArray($request);

        if (isset($attributes['book'])) {
            $attributes['book'] = new BookEmbedded($this->book);
        }

        $attributes += [
            'links' => [
                'self' => route('reviews.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
