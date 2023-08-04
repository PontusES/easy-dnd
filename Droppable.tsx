import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

const Droppable = ({
  children,
  onDrop,
  onHover,
  onHoverEnd,
  accept,
  dropEffect = 'move',
  ...props
}) => {
  const ref = useRef(null);
  const [lastIsOver, setLastIsOver] = useState(false);
  const [hasCalledOnHover, setHasCalledOnHover] = useState(false);
  const [{isOver}, drop] = useDrop({
    accept,
    drop: (item, monitor) => {
      if (onDrop) {
        onDrop(item);
      }
    },
    hover: (item, monitor) => {
      if (!hasCalledOnHover && onHover) {
        onHover(item);
        setHasCalledOnHover(true);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.effectAllowed = dropEffect;
    }
  }, [dropEffect]);

  useEffect(() => {
    if (lastIsOver && !isOver) {
      if(onHoverEnd) {
        onHoverEnd();
      }
      setHasCalledOnHover(false);
    }
    else if(lastIsOver && isOver) {
      setHasCalledOnHover(false)
    }

    setLastIsOver(isOver);
  }, [isOver]);

  drop(ref);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

export default Droppable;
