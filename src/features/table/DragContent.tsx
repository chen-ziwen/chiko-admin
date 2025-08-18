import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FC } from 'react';
import React from 'react';

interface Props {
  columns: AntDesign.TableColumnCheck[];
  setColumnChecks: (checks: AntDesign.TableColumnCheck[]) => void;
}

const SortableItem: FC<{
  index: number;
  item: AntDesign.TableColumnCheck;
  onCheckChange: (oldValue: boolean, index: number) => void;
}> = ({ index, item, onCheckChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.key
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="h-36px flex-y-center rd-4px hover:(bg-primary bg-opacity-20)"
    >
      <IconMdiDrag
        className="mr-8px h-full cursor-move text-icon"
        {...listeners}
      />
      <ACheckbox
        checked={item.checked}
        className="none_draggable flex-1"
        onClick={() => onCheckChange(item.checked, index)}
      >
        {item.title}
      </ACheckbox>
    </div>
  );
};

const DragContent: FC<Props> = ({ columns, setColumnChecks }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = columns.findIndex(item => item.key === active.id);
      const newIndex = columns.findIndex(item => item.key === over.id);

      const newColumns = arrayMove(columns, oldIndex, newIndex);
      setColumnChecks(newColumns);
    }
  };

  const handleChange = (value: boolean, index: number) => {
    columns[index].checked = !value;
    setColumnChecks([...columns]);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={columns.map(item => item.key)}
        strategy={verticalListSortingStrategy}
      >
        {columns.map((item, index) => (
          <SortableItem
            index={index}
            item={item}
            key={item.key}
            onCheckChange={handleChange}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DragContent;
