import { useEditor } from "@grapesjs/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BsEyeFill } from "react-icons/bs";
import { RxBorderNone } from "react-icons/rx";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";

interface CommandButton {
  id: string;
  iconPath: IconType;
  options?: Record<string, any>;
  disabled?: () => boolean;
}

export default function TopbarButtons({
  className,
  children
}: React.HTMLAttributes<HTMLDivElement>) {
  const editor = useEditor();
  const [, setUpdateCounter] = useState(0);
  const { Commands } = editor;
  const cmdButtons: CommandButton[] = [
    {
      id: 'core:component-outline',
      iconPath: RxBorderNone,
    },
    {
      id: 'core:preview',
      iconPath: BsEyeFill,
      options: { target: '#root' },
    },
    {
      id: 'core:open-code',
      iconPath: HiOutlineCodeBracketSquare,
    }
  ];

  useEffect(() => {
    const cmdEvent = 'run stop';
    const updateEvent = 'update';
    const updateCounter = () => setUpdateCounter((value) => value + 1);
    const onCommand = (id: string) => {
      cmdButtons.find((btn) => btn.id === id) && updateCounter();
    };
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
    };
  }, [editor]);

  return (
    <div className="config">
      {cmdButtons.map((cmd) => (
        <button
          key={cmd.id}
          type="button"
          className={
            Commands.isActive(cmd.id) ? 'active' : '' +
              (cmd.disabled?.() ? 'opacity-50' : '')
          }
          onClick={() =>
            Commands.isActive(cmd.id)
              ? Commands.stop(cmd.id)
              : Commands.run(cmd.id, cmd.options)
          }
          disabled={cmd.disabled?.()}
        >
          <cmd.iconPath />
        </button>
      ))}
      {children}
    </div>
  );
}
