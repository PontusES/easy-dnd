import React, { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';

const Draggable = ({ children, id, type, onDragEnd, onDragStart, item, ...props }) => {
  const normalizeItem = () => ({
    ...(item === null || item === undefined ? {} : item),
    ...(id === null || id === undefined ? {} : { id }),
    type,
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: normalizeItem(),
    end: (item, monitor) => {
      if (onDragEnd) {
        onDragEnd(item, monitor);
      }
    },
    begin: monitor => {
      if (onDragStart) {
        onDragStart(monitor);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (<div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} {...props}>
      {children}
    </div>
  );
};

Draggable.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Draggable;
