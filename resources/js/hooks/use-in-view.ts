import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is currently in the viewport, using the native
 * IntersectionObserver. Toggles on every scroll in/out — no animation
 * library needed for a repeating reveal.
 */
export function useInView<T extends Element>(rootMargin = '-80px') {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;

        if (!el) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { rootMargin, threshold: 0.1 },
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [rootMargin]);

    return { ref, inView };
}
