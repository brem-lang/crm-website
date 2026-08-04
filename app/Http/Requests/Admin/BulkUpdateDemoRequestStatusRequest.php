<?php

namespace App\Http\Requests\Admin;

use App\Models\DemoRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkUpdateDemoRequestStatusRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['integer', 'exists:demo_requests,id'],
            'status' => ['required', Rule::in([
                DemoRequest::STATUS_NEW,
                DemoRequest::STATUS_CONTACTED,
                DemoRequest::STATUS_CONVERTED,
                DemoRequest::STATUS_CLOSED,
            ])],
        ];
    }
}
