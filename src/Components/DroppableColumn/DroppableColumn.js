import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef}>{children}</div>;
};

export default DroppableColumn;
