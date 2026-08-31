<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDemoRequestRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            // Accepts either a Telegram username (@handle, 5-32 chars) or a phone number
            // (used to build a https://t.me/+<phone> deep link instead).
            'telegram_username' => ['required', 'string', 'max:255', 'regex:/^(@?[a-zA-Z0-9_]{5,32}|\+?[0-9\s().-]{7,20})$/'],
            'phone' => ['required', 'string', 'max:50'],
            'country' => ['required', 'string', 'max:255'],
            'business_type' => ['required', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
