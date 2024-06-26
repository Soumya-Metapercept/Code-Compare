import AceDiff from "ace-diff";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

// optionally, include CSS, or use your own
//import "ace-diff/dist/ace-diff.min.css";
// Or use the dark mode
//import "ace-diff/dist/ace-diff-dark.min.css";

const AceDiffDemo = () => {
  const differ = new AceDiff({
    ace: window.ace, // You Ace Editor instance
    element: ".acediff",
    left: {
      content: "your first file content here",
    },
    right: {
      content: "your second file content here",
    },
  });
  return (
    <div>
      <AceDiff />
    </div>
  );
};

export default AceDiffDemo;
