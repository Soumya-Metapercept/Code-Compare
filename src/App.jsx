import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import FileComparison from "./FileComparison";
import CodeDiffEditor from "./CodeDiff";
import CodeDifferentiator from "./MonacoEditor";
import MonacoDiffEditor from "./MonacoDiffEditor";
import DiffEditorComp from "./DiffEditor";
import AceDifferentiator from "./AceDiff";
import AceDiffDemo from "./AceDiff2";

const App = () => {
  return (
    <div>
      <AceDifferentiator />
    </div>
  );
};

export default App;
