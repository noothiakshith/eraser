import React, { useEffect, useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';


const WhiteBoard = ({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FILE}) => {
  const saveWhiteboard = ()=>{
    updateWhiteboard({
      _id:fileId,
      whiteboard:JSON.stringify(whiteboardData)
    
    }).then(resp=>console.log)
  }
  const[whiteboardData,setWhiteboardData] = useState<any>();
  const updateWhiteboard = useMutation(api.files.updateWhiteboard)

  useEffect(()=>{
    onSaveTrigger&&saveWhiteboard();
  },[onSaveTrigger])

  return (
    <>
    <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
    <div style={{ height: "500px" }}>
      <Excalidraw />
    </div>
  </>
  )
}

export default WhiteBoard