<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBook extends FormRequest
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
            'cover_delete' => 'nullable',
            'cover_file' => 'nullable|image',
            'extract_delete' => 'nullable',
            'extract_file' => 'nullable|file',
            'publisher_id' => 'required',
            'isbn' => 'required|isbn',
            'title' => 'required',
            'category' => 'required|in:novel,comic,cook,economy,politics,history,fantasy,biography',
            'description' => 'required',
            'formats.*' => 'in:pocket,paperback,pdf,epub,kindle',
            'price' => 'required|numeric',
            'commentable' => 'boolean',
            'publication_date' => 'required|date',
        ];
    }
}
