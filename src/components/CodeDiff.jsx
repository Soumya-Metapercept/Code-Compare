import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

const CodeDiffEditor = ({ originalContent, modifiedContent }) => {
  const originalEditorRef = useRef(null);
  const modifiedEditorRef = useRef(null);

  useEffect(() => {
    const originalModel = monaco.editor.createModel(
      originalContent,
      'text/plain'
    );
    const modifiedModel = monaco.editor.createModel(
      modifiedContent,
      'text/plain'
    );

    const originalEditor = monaco.editor.create(originalEditorRef.current, {
      model: originalModel,
      readOnly: true,
      automaticLayout: true,
    });

    const modifiedEditor = monaco.editor.create(modifiedEditorRef.current, {
      model: modifiedModel,
      automaticLayout: true,
    });

    return () => {
      originalModel.dispose();
      modifiedModel.dispose();
      originalEditor.dispose();
      modifiedEditor.dispose();
    };
  }, [originalContent, modifiedContent]);

  return (
    <div style={{ display: 'flex' }}>
      <div ref={originalEditorRef} style={{ flex: 1, height: '600px' }}></div>
      <div ref={modifiedEditorRef} style={{ flex: 1, height: '600px' }}></div>
    </div>
  );
};

export default CodeDiffEditor;
