/**
 * True on a phone/tablet. On these, t.me links are intercepted by the OS and open the
 * native Telegram app directly, so that's the right link to use there.
 */
function isMobileDevice(): boolean {
    if (typeof navigator === 'undefined') {
        return false;
    }

    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Build a link to open a lead's Telegram contact, which may be either a username
 * (e.g. "@johndoe") or a phone number (e.g. "+1 555 000 1234").
 *
 * On mobile, t.me links are handed off by the OS straight to the Telegram app, so
 * that's used for both username and phone contacts there. On desktop, a t.me link
 * only shows an interstitial "get the app" page — Telegram Web has a direct deep
 * link for usernames (`web.telegram.org/k/#@handle`), so that's used instead; there's
 * no equivalent Telegram Web deep link for phone-number lookups, so phone contacts
 * still fall back to the t.me interstitial on desktop.
 */
export function telegramUrl(contact: string): string {
    const trimmed = contact.trim();
    const mobile = isMobileDevice();

    const isPhone = /^\+?[0-9\s().-]{7,}$/.test(trimmed);

    if (isPhone) {
        const digits = trimmed.replace(/[^0-9]/g, '');

        // Mobile and desktop both resolve through t.me here — there's no
        // web.telegram.org equivalent for opening a chat by phone number.
        return `https://t.me/+${digits}`;
    }

    const handle = trimmed.replace(/^@/, '');

    return mobile ? `https://t.me/${handle}` : `https://web.telegram.org/k/#@${handle}`;
}
