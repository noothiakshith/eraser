import React, { act, useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import SideNavBottomSection from './SideNavBottomSection'
import { createFile } from '@/convex/files'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { FileListContext } from '@/app/_context/FileListContext'

const SideNav = () => {
  const {user} = useKindeBrowserClient();
  const convex = useConvex();
  const createFile= useMutation(api.files.createFile);
  const[activeTeam,setActiveTeam] = useState<TEAM>();
  const{fileList_,setFileList_} = useContext(FileListContext);
  useEffect(()=>{
    activeTeam&&getFiles();
  },[activeTeam])
  const onFileCreate = async(fileName:any)=>{
    console.log(fileName);
    createFile({
      fileName:fileName,
      teamId:activeTeam?._id,
      createdBy:user?.email,
      archive:false,
      document:'',
      whiteboard:'' 
    }).then(resp=>{
      if(resp){
        toast('File Created')
      }
    },(e)=>{
      toast('Error in creating file')
    })
  }
  const getFiles = async()=>{
    const result = await convex.query(api.files.getFiles,{teamId:activeTeam?._id});
    console.log(result);
    setFileList_(result);
  }
  return (
    <div className='flex flex-col h-screen fixed w-72 border-r border-[1px] p-6 bg-gray-100'>
      <div className='flex-1'>
        <SideNavTopSection user={user} setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}/>
      </div>
      <div>
        <SideNavBottomSection onFileCreate={onFileCreate}/>
      </div>
    </div>
  )
}

export default SideNav