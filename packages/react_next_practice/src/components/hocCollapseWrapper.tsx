"use client"
import React, {
    FC,
    ButtonHTMLAttributes,
    useState,
    useRef,
    useEffect,
  } from "react";
  
  interface CollapseWrapperProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    isEditMode?: boolean;
    children: React.ReactNode;
    isOpen: boolean;
    onTitleChange?: (value: string) => void;
    onToggleCollapse: () => void;
  }
  
  const CollapseWrapper: FC<CollapseWrapperProps> = ({
    title,
    children,
    isEditMode,
    isOpen,
    onTitleChange,
    onToggleCollapse,
  }: CollapseWrapperProps) => {
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
      }
    }, [isOpen, children]);
  
    return (
      <div className="mb-4 overflow-hidden rounded-sm border border-gray-300">
        <div
          className={`focus:border-blue-300 collapse-title flex w-full cursor-pointer items-center justify-between bg-gray-200 px-4 py-2 text-left focus:outline-none focus:ring ${
            isOpen ? "is-open" : ""
          }`}
          onClick={onToggleCollapse}
        >
          {isEditMode ? (
            <div>
              <input
                type="text"
                className="focus:border-blue-500 ml-0 flex-1 border-b bg-transparent border-gray-500 px-2 pt-0.5 focus:outline-none"
                placeholder="標題"
                value={title}
                onChange={(ev) => onTitleChange && onTitleChange(ev.target.value)}
              />
            </div>
          ) : (
            <div>{title}</div>
          )}
        </div>
        <div
          ref={contentRef}
          style={{ height: `${contentHeight}px` }}
          className="transition-height overflow-hidden bg-white duration-500 ease-out"
        >
          <div className="p-4">{children}</div>
        </div>
        <style jsx>{`
          .collapse-title::after {
            content: "+";
            display: inline-block;
            line-height: 0;
          }
          .collapse-title.is-open::after {
            font-size: 1.3rem;
            content: "-";
            display: inline-block;
          }
        `}</style>
      </div>
    );
  };

export default CollapseWrapper;