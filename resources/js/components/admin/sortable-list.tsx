import {
    closestCenter,
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

type SortableEntity = { id: number };

type DragHandleProps = HTMLAttributes<HTMLElement>;

export function SortableList<T extends SortableEntity>({
    items,
    onReorder,
    children,
}: {
    items: T[];
    onReorder: (orderedIds: number[]) => void;
    children: (item: T, index: number, dragHandleProps: DragHandleProps) => ReactNode;
}) {
    const [prevItems, setPrevItems] = useState(items);
    const [localItems, setLocalItems] = useState(items);

    if (items !== prevItems) {
        setPrevItems(items);
        setLocalItems(items);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 4 },
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = localItems.findIndex((item) => item.id === active.id);
        const newIndex = localItems.findIndex((item) => item.id === over.id);
        const reordered = arrayMove(localItems, oldIndex, newIndex);

        setLocalItems(reordered);
        onReorder(reordered.map((item) => item.id));
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={localItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {localItems.map((item, index) => (
                    <SortableRow key={item.id} id={item.id}>
                        {(dragHandleProps) =>
                            children(item, index, dragHandleProps)
                        }
                    </SortableRow>
                ))}
            </SortableContext>
        </DndContext>
    );
}

function SortableRow({
    id,
    children,
}: {
    id: number;
    children: (dragHandleProps: DragHandleProps) => ReactNode;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children({ ...attributes, ...listeners } as DragHandleProps)}
        </div>
    );
}
