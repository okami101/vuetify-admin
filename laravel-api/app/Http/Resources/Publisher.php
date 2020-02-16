<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Publisher extends JsonResource
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
            'links' => [
                'self' => route('publishers.show', $this->id),
            ],
        ];

        return $attributes;
    }
}
