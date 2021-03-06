import Typhograph from '@app/components/Typhograph';
import React from 'react';

function HighlightText({ title, highlight }) {
  const splitResult = title;
  const initial = splitResult?.split(highlight);
  return (
    <>
      <Typhograph type="NOTO" size={14} weight="REGULAR">
        {initial?.map((normal, i) =>
          i > 0 ? (
            <>
              <Typhograph key={highlight + i.toString()} type="NOTO" color="SKYBLUE3" size={14} weight="REGULAR">
                {highlight}
              </Typhograph>
              {normal}
            </>
          ) : (
            <>{normal}</>
          )
        )}
      </Typhograph>
    </>
  );
}

export default HighlightText;
