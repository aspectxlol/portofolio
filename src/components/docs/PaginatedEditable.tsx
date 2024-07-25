import React, { type FC, forwardRef, useState, useEffect, createRef } from 'react';
import { Editable, type RenderElementProps, type RenderLeafProps } from 'slate-react';

interface PaginatedEditableProps {
  contentHeight: number;
  renderElement: (props: RenderElementProps) => JSX.Element; // Replace 'any' with specific type from Slate
  renderLeaf: (props: RenderLeafProps) => JSX.Element; // Replace 'any' with specific type from Slate
  className?: string;
  // Add other props as needed for your Editable component
}

const PaginatedEditable: FC<PaginatedEditableProps> = forwardRef(function PaginatedEditable({ renderElement, renderLeaf, ...props }, ref) {
    const editableRef = createRef<HTMLDivElement>();
    const [localHeight, setLocalHeight] = useState(0);

    useEffect(() => {
      const updateHeight = () => {
        if (editableRef.current) {
          setLocalHeight(editableRef.current.scrollHeight);
        }
      };
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }, [editableRef]);

    return (
      <div ref={editableRef}>
        <Editable
          {...props}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </div>
    );
  }
);

export default PaginatedEditable;
