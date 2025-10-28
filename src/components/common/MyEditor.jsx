
import draftToHtml from "draftjs-to-html";
import { useEffect, useState, useCallback } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";

const MyEditor = ({ setDescriptionData, form, wrapperStyle, name, height }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Initialize editor content when form.description changes
  useEffect(() => {
    if (form.description && (name === "update" || name === "parse")) {
      const blocksFromHTML = convertFromHTML(form.description);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [form.description, name]);

  // Handle editor state changes
  const onEditorStateChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  // Handle editor blur and convert content to HTML
  const handleEditorBlur = useCallback(() => {
    const content = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    
    if (content) {
      setDescriptionData(content); // Update the parent component with HTML content
    }
  }, [editorState, setDescriptionData]);

  return (
    <Editor
      wrapperStyle={wrapperStyle}
      editorStyle={{
        padding: "0px 10px",
        background: "white",
        height: height || "400px", // default height
        overflowY: "scroll",
        lineHeight: "1.1",
      }}
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      onBlur={handleEditorBlur} // Convert to HTML when the editor loses focus
    />
  );
};

export default MyEditor;
