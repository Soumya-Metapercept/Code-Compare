import React, { useState, useRef, useEffect } from "react";
import { DiffEditor, Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

const DiffEditorComp = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [showDiff, setShowDiff] = useState(false);
  const [diffs, setDiffs] = useState([]);
  const [originalCode, setOriginalCode] = useState("");
  const [modifiedCode, setModifiedCode] = useState("");
  const diffEditorRef = useRef(null);

  useEffect(() => {
    setOriginalCode(code1);
    setModifiedCode(code2);
  }, [code1, code2]);

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
    setTimeout(() => {
      const diffEditor = diffEditorRef.current?.editor;
      const lineChanges = diffEditor.getLineChanges();
      setDiffs(lineChanges);
    }, 1000);
  };

  const mergeModifiedToOriginal = (index) => {
    const modifiedLines = modifiedCode.split("\n");
    const originalLines = originalCode.split("\n");
    const { modifiedStartLineNumber, modifiedEndLineNumber } = diffs[index];

    const linesToMerge = modifiedLines.slice(
      modifiedStartLineNumber - 1,
      modifiedEndLineNumber
    );
    originalLines.splice(
      diffs[index].originalStartLineNumber - 1,
      diffs[index].originalEndLineNumber -
        diffs[index].originalStartLineNumber +
        1,
      ...linesToMerge
    );

    setOriginalCode(originalLines.join("\n"));
  };

  const mergeOriginalToModified = (index) => {
    const modifiedLines = modifiedCode.split("\n");
    const originalLines = originalCode.split("\n");
    const { originalStartLineNumber, originalEndLineNumber } = diffs[index];

    const linesToMerge = originalLines.slice(
      originalStartLineNumber - 1,
      originalEndLineNumber
    );
    modifiedLines.splice(
      diffs[index].modifiedStartLineNumber - 1,
      diffs[index].modifiedEndLineNumber -
        diffs[index].modifiedStartLineNumber +
        1,
      ...linesToMerge
    );

    setModifiedCode(modifiedLines.join("\n"));
  };

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => handleFileUpload(e, setCode1)} />
        <input type="file" onChange={(e) => handleFileUpload(e, setCode2)} />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Editor
            height="300px"
            language="javascript"
            theme="vs-dark"
            value={code1}
            options={{ readOnly: true }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <Editor
            height="300px"
            language="javascript"
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
            ref={diffEditorRef}
            width="100%"
            height="600px"
            //language="javascript"
            theme="vs-dark"
            original={originalCode}
            modified={modifiedCode}
            options={{
              lineNumbers: "on",
              renderSideBySide: true,
              originalEditable: true,
              diffAlgorithm: {
                onDidChange: () => ({ dispose: () => {} }),
                computeDiff: async (original, modified, options) => {
                  const result = await provider.computeDiff(
                    original,
                    modified,
                    options
                  );
                  console.log(result);
                  result.changes.shift(); // Remove first diff
                  return result;
                },
              },
            }}
          />
          <div>
            {diffs.map((diff, index) => (
              <div key={index}>
                <button onClick={() => mergeModifiedToOriginal(index)}>
                  {"<"}
                </button>
                <button onClick={() => mergeOriginalToModified(index)}>
                  {">"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffEditorComp;
