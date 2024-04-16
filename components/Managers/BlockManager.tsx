import * as React from 'react';
import { BlocksResultProps } from '@grapesjs/react';

export type CustomBlockManagerProps = Pick<
  BlocksResultProps,
  'mapCategoryBlocks' | 'dragStart' | 'dragStop'
>;

export default function CustomBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}: CustomBlockManagerProps) {
  return (
    <div id="block-manager" className="text-left">
      {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
        <div key={category}>
          <div className={['py-2 px-4 border-y'].join(' ')}>
            {category}
          </div>
          <div className="grid grid-cols-2 gap-2 p-2">
            {blocks.map((block) => (
              <div
                key={block.getId()}
                draggable
                className={[
                  'flex flex-col items-center border rounded cursor-pointer py-2 px-5 transition-colors',
                ].join(' first-line:')}
                onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                onDragEnd={() => dragStop(false)}
              >
                <div
                  className="h-10 w-10"
                  dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                />

                    <div
                  className="h-10 w-10"
                  dangerouslySetInnerHTML={{ __html: block.getLabel()! }}
                />

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
