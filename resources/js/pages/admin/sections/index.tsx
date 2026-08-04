import { Head, Link, router } from '@inertiajs/react';
import { GripVertical, Pencil } from 'lucide-react';
import { SortableList } from '@/components/admin/sortable-list';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { dashboard } from '@/routes/admin';
import sections, { edit, index } from '@/routes/admin/sections';

type Section = {
    id: number;
    key: string;
    title: string | null;
    is_enabled: boolean;
    items_count: number;
};

export default function SectionsIndex({ sections: initialSections }: { sections: Section[] }) {
    function handleReorder(orderedIds: number[]) {
        router.patch(sections.reorder().url, { orderedIds }, { preserveScroll: true });
    }

    function handleToggle(section: Section) {
        router.patch(sections.toggle(section).url, {}, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Sections" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Sections"
                    description="Drag to reorder, toggle to enable or disable, and click a section to edit its content."
                />

                <div className="divide-y rounded-xl border">
                    <SortableList items={initialSections} onReorder={handleReorder}>
                        {(section, _index, dragHandleProps) => (
                            <div className="flex flex-wrap items-center gap-4 bg-background p-4">
                                <button
                                    type="button"
                                    className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
                                    {...dragHandleProps}
                                >
                                    <GripVertical className="size-4" />
                                </button>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium">
                                        {section.title ?? section.key}
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {section.key} · {section.items_count} item
                                        {section.items_count === 1 ? '' : 's'}
                                    </p>
                                </div>

                                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Checkbox
                                        checked={section.is_enabled}
                                        onCheckedChange={() => handleToggle(section)}
                                    />
                                    Enabled
                                </label>

                                <Button variant="outline" size="sm" asChild>
                                    <Link href={edit(section)}>
                                        <Pencil className="size-4" />
                                        Edit
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </SortableList>
                </div>
            </div>
        </>
    );
}

SectionsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Sections', href: index() },
    ],
};
