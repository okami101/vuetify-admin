<?php

namespace App\Http\Resources;

class Publisher extends MediaResource
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
