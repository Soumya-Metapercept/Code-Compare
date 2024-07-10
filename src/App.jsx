import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import FileComparison from "./components/FileComparison";
import CodeDiffEditor from "./components/CodeDiff";
import CodeDifferentiator from "./components/MonacoEditor";
import DiffEditorComp from "./components/DiffEditor";
import AceDiffDemo from "./components/AceDiff2";
import MonacoDiffEditor from "./components/MonacoDiffEditor";
import AceDifferentiator from "./components/AceDiff";


const App = () => {
  return (
    <div>
      <AceDifferentiator />
    </div>
  );
};

export default App;
