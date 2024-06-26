import React, { useState, useEffect } from 'react';
import { MonacoDiffEditor } from 'react-monaco-editor';
import { diffChars } from 'diff';

const CodeEditor = ({ leftValue, rightValue }) => {
  const [originalValue, setOriginalValue] = useState(leftValue);
  const [modifiedValue, setModifiedValue] = useState(rightValue);

  useEffect(() => {
    setOriginalValue(leftValue);
  }, [leftValue]);

  useEffect(() => {
    setModifiedValue(rightValue);
  }, [rightValue]);

  const handleModifiedEditorChange = (newValue) => {
    setModifiedValue(newValue);
  };

  const computeDiff = () => {
    const diffs = diffChars(originalValue, modifiedValue);
    let diffText = '';
    diffs.forEach(part => {
      const color = part.added ? 'green' : part.removed ? 'red' : 'white';
      diffText += `<span style="background-color: ${color};">${part.value}</span>`;
    });
    return diffText;
  };

  const diffText = computeDiff();

  return (
    <MonacoDiffEditor
      original={originalValue}
      value={modifiedValue}
      options={{
        renderSideBySide: true,
        readOnly: true,
        wordWrap: 'on'
      }}
    />
  );
};

export default CodeEditor;
