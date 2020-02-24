<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBook extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'isbn' => 'sometimes|required|isbn',
            'title' => 'sometimes|required',
            'description' => 'sometimes|required',
            'author' => 'sometimes|required',
            'price' => 'sometimes|required|numeric',
            'commentable' => 'sometimes|boolean',
            'publication_date' => 'sometimes|required|date',
        ];
    }
}
