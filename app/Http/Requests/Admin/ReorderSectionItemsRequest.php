<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ReorderSectionItemsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'orderedIds' => ['required', 'array'],
            'orderedIds.*' => ['integer', 'exists:section_items,id'],
        ];
    }
}
