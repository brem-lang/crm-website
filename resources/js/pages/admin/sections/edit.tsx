import { Form, Head, router } from '@inertiajs/react';
import { GripVertical, LayoutPanelTop, Plus, Rows3 } from 'lucide-react';
import { useState } from 'react';
import { ImageUpload } from '@/components/admin/image-upload';
import { PanelCard } from '@/components/admin/panel-card';
import { SortableList } from '@/components/admin/sortable-list';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes/admin';
import sectionItems from '@/routes/admin/section-items';
import sectionController, {
    index as sectionsIndex,
} from '@/routes/admin/sections';

type SectionItemMeta = Record<string, string>;

type SectionItem = {
    id: number;
    title: string;
    description: string | null;
    icon: string | null;
    link_url: string | null;
    image_url: string | null;
    is_enabled: boolean;
    meta: SectionItemMeta | null;
};

type SectionData = {
    id: number;
    key: string;
    title: string | null;
    subtitle: string | null;
    body: string | null;
    is_enabled: boolean;
    content: Record<string, string> | null;
};

type ItemFieldConfig = {
    description: boolean;
    icon: boolean;
    image: boolean;
    statValue: boolean;
};

const ITEM_FIELD_CONFIG: Record<string, ItemFieldConfig> = {
    why_us: { description: true, icon: true, image: false, statValue: false },
    ai_automation: {
        description: true,
        icon: true,
        image: false,
        statValue: false,
    },
    product_showcase: {
        description: true,
        icon: false,
        image: true,
        statValue: false,
    },
    industries: {
        description: true,
        icon: false,
        image: false,
        statValue: false,
    },
    powerful_management: {
        description: false,
        icon: false,
        image: false,
        statValue: true,
    },
};

const DEFAULT_ITEM_FIELDS: ItemFieldConfig = {
    description: true,
    icon: false,
    image: false,
    statValue: false,
};

const CONTENT_FIELDS: Record<string, { name: string; label: string }[]> = {
    hero: [
        { name: 'primary_button_text', label: 'Primary Button Text' },
        { name: 'primary_button_url', label: 'Primary Button URL' },
        { name: 'secondary_button_text', label: 'Secondary Button Text' },
        { name: 'secondary_button_url', label: 'Secondary Button URL' },
    ],
    final_cta: [{ name: 'submit_button_text', label: 'Submit Button Text' }],
};

const SECTIONS_WITHOUT_ITEMS = ['hero', 'final_cta'];

export default function SectionEdit({
    section,
    items,
}: {
    section: SectionData;
    items: SectionItem[];
}) {
    const [addOpen, setAddOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SectionItem | null>(null);

    const fieldConfig = ITEM_FIELD_CONFIG[section.key] ?? DEFAULT_ITEM_FIELDS;
    const contentFields = CONTENT_FIELDS[section.key] ?? [];
    const showItems = !SECTIONS_WITHOUT_ITEMS.includes(section.key);

    function handleItemsReorder(orderedIds: number[]) {
        router.patch(
            sectionItems.reorder().url,
            { orderedIds },
            { preserveScroll: true },
        );
    }

    function handleDelete(item: SectionItem) {
        if (confirm(`Delete "${item.title}"? This cannot be undone.`)) {
            router.delete(sectionItems.destroy(item).url, {
                preserveScroll: true,
            });
        }
    }

    return (
        <>
            <Head title={section.title ?? section.key} />

            <div className="w-full space-y-6 p-4">
                <Heading
                    title={section.title ?? section.key}
                    description={`Edit the ${section.key.replace(/_/g, ' ')} section.`}
                />

                <div
                    className={
                        showItems
                            ? 'grid gap-6 lg:grid-cols-2 lg:items-start'
                            : 'grid gap-6'
                    }
                >
                    <PanelCard
                        icon={LayoutPanelTop}
                        title="Section Content"
                        description="Headline, copy, and settings shown on the public page."
                    >
                        <Form
                            {...sectionController.update.form(section)}
                            options={{ preserveScroll: true }}
                            className="space-y-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            defaultValue={section.title ?? ''}
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="subtitle">
                                            Subtitle
                                        </Label>
                                        <Textarea
                                            id="subtitle"
                                            name="subtitle"
                                            defaultValue={
                                                section.subtitle ?? ''
                                            }
                                        />
                                        <InputError message={errors.subtitle} />
                                    </div>

                                    {section.key === 'powerful_management' && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="body">Body</Label>
                                            <Textarea
                                                id="body"
                                                name="body"
                                                defaultValue={
                                                    section.body ?? ''
                                                }
                                            />
                                            <InputError message={errors.body} />
                                        </div>
                                    )}

                                    {contentFields.map((field) => (
                                        <div
                                            className="grid gap-2"
                                            key={field.name}
                                        >
                                            <Label htmlFor={field.name}>
                                                {field.label}
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={`content[${field.name}]`}
                                                defaultValue={
                                                    section.content?.[
                                                        field.name
                                                    ] ?? ''
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        `content.${field.name}`
                                                    ]
                                                }
                                            />
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="is_enabled"
                                            name="is_enabled"
                                            defaultChecked={section.is_enabled}
                                        />
                                        <Label htmlFor="is_enabled">
                                            Enabled on the public site
                                        </Label>
                                    </div>
                                    <InputError message={errors.is_enabled} />

                                    <Button type="submit" disabled={processing}>
                                        Save Section
                                    </Button>
                                </>
                            )}
                        </Form>
                    </PanelCard>

                    {showItems && (
                        <PanelCard
                            icon={Rows3}
                            title="Items"
                            description="Add, edit, reorder, and remove this section's cards."
                            action={
                                <Button
                                    size="sm"
                                    onClick={() => setAddOpen(true)}
                                >
                                    <Plus className="size-4" />
                                    Add Item
                                </Button>
                            }
                        >
                            <div className="divide-y rounded-xl border">
                                <SortableList
                                    items={items}
                                    onReorder={handleItemsReorder}
                                >
                                    {(item, _index, dragHandleProps) => (
                                        <div className="flex flex-wrap items-center gap-4 p-4">
                                            <button
                                                type="button"
                                                className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
                                                {...dragHandleProps}
                                            >
                                                <GripVertical className="size-4" />
                                            </button>

                                            {item.image_url && (
                                                <img
                                                    src={item.image_url}
                                                    alt=""
                                                    className="size-10 rounded-md border object-cover"
                                                />
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">
                                                    {item.title}
                                                </p>
                                                {item.description && (
                                                    <p className="line-clamp-1 text-sm text-muted-foreground">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setEditingItem(item)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </SortableList>

                                {items.length === 0 && (
                                    <p className="p-4 text-sm text-muted-foreground">
                                        No items yet.
                                    </p>
                                )}
                            </div>
                        </PanelCard>
                    )}
                </div>
            </div>

            <Sheet open={addOpen} onOpenChange={setAddOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add Item</SheetTitle>
                    </SheetHeader>

                    <Form
                        {...sectionItems.store.form(section)}
                        options={{ preserveScroll: true }}
                        onSuccess={() => setAddOpen(false)}
                        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <ItemFields
                                    fieldConfig={fieldConfig}
                                    errors={errors}
                                />
                                <Button type="submit" disabled={processing}>
                                    Add Item
                                </Button>
                            </>
                        )}
                    </Form>
                </SheetContent>
            </Sheet>

            <Sheet
                open={editingItem !== null}
                onOpenChange={(open) => !open && setEditingItem(null)}
            >
                <SheetContent>
                    {editingItem && (
                        <>
                            <SheetHeader>
                                <SheetTitle>Edit Item</SheetTitle>
                            </SheetHeader>

                            <Form
                                {...sectionItems.update.form(editingItem)}
                                options={{ preserveScroll: true }}
                                onSuccess={() => setEditingItem(null)}
                                className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <ItemFields
                                            item={editingItem}
                                            fieldConfig={fieldConfig}
                                            errors={errors}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Save Item
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}

function ItemFields({
    item,
    fieldConfig,
    errors,
}: {
    item?: SectionItem;
    fieldConfig: ItemFieldConfig;
    errors: Record<string, string | undefined>;
}) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    defaultValue={item?.title ?? ''}
                    required
                />
                <InputError message={errors.title} />
            </div>

            {fieldConfig.description && (
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={item?.description ?? ''}
                    />
                    <InputError message={errors.description} />
                </div>
            )}

            {fieldConfig.icon && (
                <div className="grid gap-2">
                    <Label htmlFor="icon">Icon name</Label>
                    <Input
                        id="icon"
                        name="icon"
                        defaultValue={item?.icon ?? ''}
                        placeholder="e.g. users (a lucide-react icon name)"
                    />
                    <InputError message={errors.icon} />
                </div>
            )}

            {fieldConfig.image && (
                <ImageUpload
                    name="image"
                    label="Screenshot"
                    currentUrl={item?.image_url}
                    error={errors.image}
                />
            )}

            {fieldConfig.statValue && (
                <div className="grid gap-2">
                    <Label htmlFor="meta.value">Stat Value</Label>
                    <Input
                        id="meta.value"
                        name="meta[value]"
                        defaultValue={item?.meta?.value ?? ''}
                        placeholder="e.g. 248 or $182,400"
                    />
                    <InputError message={errors['meta.value']} />
                </div>
            )}

            <div className="flex items-center gap-2">
                <Checkbox
                    id="is_enabled"
                    name="is_enabled"
                    defaultChecked={item?.is_enabled ?? true}
                />
                <Label htmlFor="is_enabled">Enabled</Label>
            </div>
            <InputError message={errors.is_enabled} />
        </>
    );
}

SectionEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Sections', href: sectionsIndex() },
    ],
};
