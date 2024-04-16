import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import ReactGPicker from 'react-gcolor-picker';

export const PopoverPicker = ({ color, onChange }: { color: string, onChange: any }) => {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (
        <div className="picker">
            <div
                className="swatch"
                style={{ background: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover" ref={popover as any}>
                    <ReactGPicker gradient={true} value={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};

const useClickOutside = (ref: MutableRefObject<any>, handler: Function) => {
    useEffect(() => {
        let startedInside = false;
        let startedWhenMounted = false;

        const listener = (event: Event) => {
            if (startedInside || !startedWhenMounted) return;
            if (!ref.current || ref.current.contains(event.target)) return;

            handler(event);
        };

        const validateEventStart = (event: Event) => {
            startedWhenMounted = ref.current;
            startedInside = ref.current && ref.current.contains(event.target);
        };

        document.addEventListener("mousedown", validateEventStart);
        document.addEventListener("touchstart", validateEventStart);
        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("mousedown", validateEventStart);
            document.removeEventListener("touchstart", validateEventStart);
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
};