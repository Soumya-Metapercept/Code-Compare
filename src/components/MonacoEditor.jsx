import React, { useState, useRef } from 'react';
import { DiffEditor } from '@monaco-editor/react';

const CodeDifferentiator = () => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');

  const handleCode1Change = (newCode) => {
    setCode1(newCode);
  };

  const handleCode2Change = (newCode) => {
    setCode2(newCode);
  };

  const diffEditorRef = useRef(null);

  // function handleEditorDidMount(editor, monaco) {
  //   diffEditorRef.current = editor;
  // }

  // function showOriginalValue() {
  //   alert(diffEditorRef.current.getOriginalEditor().getValue());
  // }

  // function showModifiedValue() {
  //   alert(diffEditorRef.current.getModifiedEditor().getValue());
  // }

  return (
    <div>
      {/* <div>
        <MonacoEditor
          width="50%"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={code1}
          onChange={handleCode1Change}
          options={{ lineNumbers: 'on' }}
        />
        <MonacoEditor
          width="50%"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={code2}
          onChange={handleCode2Change}
          options={{ lineNumbers: 'on' }}
        />
      </div> */}
      <div>
        <DiffEditor
          width="100%"
          height="600px"
          language="javascript"
          theme="vs-dark"
          original={code1}
          modified={code2}
          options={{ lineNumbers: 'on' ,
          renderSideBySide: true, 
          originalEditable:true}}

        />
      </div>
      {/* <MonacoDiffEditor/> */}
    </div>
  );
};

export default CodeDifferentiator;
