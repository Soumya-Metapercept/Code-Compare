import React, { useState } from "react";
import { Editor, DiffEditor } from "@monaco-editor/react";

const MonacoDiffEditor = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [showDiff, setShowDiff] = useState(false);

  const handleFileUpload = (event, setterFunction) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setterFunction(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleCompare = () => {
    setShowDiff(true);
  };

  return (
    <div>
      <div>
        {/* File input for code 1 */}
        <input type="file" onChange={(e) => handleFileUpload(e, setCode1)} />
        {/* File input for code 2 */}
        <input type="file" onChange={(e) => handleFileUpload(e, setCode2)} />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Editor
            // width="50%"
            height="300px"
            // language="javascript"
            theme="vs-dark"
            value={code1}
            options={{ readOnly: true }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <Editor
            // width="50%"
            height="300px"
            // language="javascript"
            theme="vs-dark"
            value={code2}
            options={{ readOnly: true }}
          />
        </div>
      </div>
      {code1 && code2 && (
        <div>
          <button onClick={handleCompare}>Compare</button>
        </div>
      )}
      {showDiff && (
        <div>
          <DiffEditor
            width="100%"
            height="600px"
            // language="javascript"
            theme="vs-dark"
            original={code1}
            modified={code2}
            options={{
              lineNumbers: "on",
              renderSideBySide: true,
              originalEditable: true,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MonacoDiffEditor;
