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
        <div id="category-block" key={category}>
          <div className='name'>
            {category}
          </div>
          <div className="flex flex-col gap-1 mt-2 block-container">
            {blocks.map((block) => (
              <div
                key={block.getId()}
                draggable
                className='block-box'
                onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                onDragEnd={() => dragStop(false)}
              >
                <div
                  id='icon'
                  dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                />

                    <div
                    id="text"
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
