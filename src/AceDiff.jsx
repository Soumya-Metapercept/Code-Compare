import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import AceDiff from "ace-diff";
import "brace/mode/javascript";
import "brace/theme/monokai";
import "ace-diff/dist/ace-diff.min.css";

const AceDifferentiator = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [showCompareButton, setShowCompareButton] = useState(false);
  const [showDiffEditor, setShowDiffEditor] = useState(false);
  const aceDiffRef = useRef(null);

  useEffect(() => {
    if (aceDiffRef.current) {
      aceDiffRef.current.destroy();
    }

    if (showDiffEditor) {
      aceDiffRef.current = new AceDiff({
        //ace: window.ace,
        element: "#acediff__wrap",
        //mode: "javascript",
        //theme: "monokai",
        left: {
          content: code1,
          editable: true,
        },
        right: {
          content: code2,
          editable: true,
        },
        showDiffs: true,
        showConnectors: true,
        classes: {
          diff: "acediff__diffLine",
          connector: "acediff__connector",
          newCodeConnectorLinkContent: "&#8594;",
          deletedCodeConnectorLinkContent: "&#8592;",
        },
      });
    }
  }, [showDiffEditor, code1, code2]);

  const handleFileUpload = (event, setterFunction) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setterFunction(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleCompare = () => {
    setShowDiffEditor(true);
  };

  useEffect(() => {
    if (code1 && code2) {
      setShowCompareButton(true);
    }
  }, [code1, code2]);

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => handleFileUpload(e, setCode1)} />
        <input type="file" onChange={(e) => handleFileUpload(e, setCode2)} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="editor1"
          value={code1}
          onChange={setCode1}
          width="45%"
          height="400px"
          editorProps={{ $blockScrolling: true }}
        />
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="editor2"
          value={code2}
          onChange={setCode2}
          width="45%"
          height="400px"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      {showCompareButton && (
        <div>
          <button onClick={handleCompare} style={{ marginTop: "10px" }}>
            Compare
          </button>
        </div>
      )}
      {showDiffEditor && (
        <div id="acediff__wrap" style={{ height: "100%", width: "100%" }}>
          {/* The ace-diff library will render here */}
        </div>
      )}
    </div>
  );
};

export default AceDifferentiator;
