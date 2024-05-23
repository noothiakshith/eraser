"use client";
import React, { useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs'; 
import List from '@editorjs/list'; 
import Header from "@editorjs/header";
import RawTool from '@editorjs/raw';
import Checklist from '@editorjs/checklist'
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import { FILE } from '../../dashboard/_components/FileList';
import { useRef } from 'react';
const rawDocument = {
  "time": 1550476186479,
  "blocks": [
     {
        "type": "heading",
        "data": {
           "text": "Editor.js",
           "level": 2
        }
     },
     {
        "type": "paragraph",
        "data": {
           "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
        }
     },
     {
        "type": "heading",
        "data": {
           "text": "Key features",
           "level": 3
        }
     }
  ],
  "version": "2.8.1"
}
const Editor = ({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) => {
  const ref = useRef<EditorJS>();
  const[document,setDocument] = useState(rawDocument);
  const initEditor = () => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      holder: 'editorjs',
      data:fileData?JSON.parse(fileData.document):rawDocument,
      tools: { 

        header: Header, 
        list: List ,
        raw: RawTool, 
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
              byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            }
          }
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
        },
      }, 
    });
    ref.current = editor;
  };

  useEffect(() => {
    initEditor();
  }, []);
  useEffect(()=>{
    console.log("onSaveTrigger",onSaveTrigger);
    onSaveTrigger&&onSaveDocuemnt();
  },[onSaveTrigger])
  const onSaveDocuemnt =()=>{
    if(ref.current){
      ref.current.save().then((outputData) => {
        console.log('Article data: ', outputData)
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
    }
  }
  return (
    <div>
      <div id='editorjs' className='ml-20'></div>
    </div>
  );
};

export default Editor;
