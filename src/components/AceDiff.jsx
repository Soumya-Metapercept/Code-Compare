import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import AceDiff from "ace-diff";
import "brace/mode/javascript";
import "brace/theme/monokai";
import "ace-diff/dist/ace-diff.min.css";
import "../style/AceDiff.css";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
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
        mode: "javascript",
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



  const YOUR_CLIENT_ID = "Ov23lijZ5eWHXUdrxRZX";
  const YOUR_CLIENT_SECRET = "75052d3eda02a518e22531932e3c5db22ef30a57";
  const gitHubRedirect = "http://localhost:5173/";
  const path = "/";

  return (
    <>
      <div className="centered-container">
        <div>
          {showDiffEditor && (
            <div className="card">
              <div className="card-body">
                <div className="diff-editor">
                  <div id="acediff__wrap"></div>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="editor-container">
              <div className="buttons">
                <input
                  type="file"
                  className="input1"
                  onChange={(e) => handleFileUpload(e, setCode1)}
                />
                <a
                  href={`http://github.com/login/oauth/authorize?client_id=${YOUR_CLIENT_ID}&redirect_uri=${gitHubRedirect}?path=${path}&scope=user:email`}
                >
                  Login GitHub
                </a>
                <input
                  type="file"
                  className="input2"
                  onChange={(e) => handleFileUpload(e, setCode2)}
                />
              </div>

              <div className="ace-editors">
                <AceEditor
                  mode="javascript"
                  theme="textmate"
                  name="editor1"
                  value={code1}
                  onChange={setCode1}
                  className="ace-editor"
                  editorProps={{ $blockScrolling: true }}
                />
                <AceEditor
                  mode="javascript"
                  theme="github"
                  name="editor2"
                  value={code2}
                  onChange={setCode2}
                  className="ace-editor1"
                  editorProps={{ $blockScrolling: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCompareButton && (
        <div className="compare-button">
          <button onClick={handleCompare}>Compare</button>
        </div>
      )}
    </>
  );
};

export default AceDifferentiator;
