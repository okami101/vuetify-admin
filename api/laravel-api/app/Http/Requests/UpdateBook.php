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
            'isbn' => 'isbn',
            'title' => 'required',
            'description' => 'required',
            'author' => 'required',
            'price' => 'required|numeric',
            'commentable' => 'boolean',
            'publication_date' => 'required|date',
        ];
    }
}
