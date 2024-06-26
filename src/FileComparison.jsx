import React, { useState } from 'react';
import { diffLines } from 'diff';

const FileComparison = ({ leftText, rightText }) => {
  const diffs = diffLines(leftText, rightText);

  return (
    <div>
      {diffs.map((part, index) => {
        const style = part.added ? { backgroundColor: '#aaffaa' } : part.removed ? { backgroundColor: '#ffaaaa' } : {};
        return (
          <span key={index} style={style}>
            {part.value}
          </span>
        );
      })}
    </div>
  );
};

export default FileComparison;
