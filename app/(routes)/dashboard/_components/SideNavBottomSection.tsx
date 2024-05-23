import { Archive, FileInput, Flag, Github } from 'lucide-react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SideNavBottomSection = ({ onFileCreate }: any) => {
  const menuList = [
    {
      id: 1,
      name: 'Getting Started',
      icon: Flag,
      path: '/dashboard/getting-started'
    },
    {
      name: 'Github',
      icon: Github,
      path: '/'
    },
    {
      name: 'Archive',
      icon: Archive,
      path: '/dashboard/archive'
    }
  ];

  const [fileInput, setFileInput] = React.useState('');

  return (
    <div>
      {menuList.map((menu, index) => (
        <h2 className='flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer' key={index}>
          <menu.icon className='h-5 w-5' />
          {menu.name}
        </h2>
      ))}
      <Dialog>
        <DialogTrigger className='w-full' asChild>
          <Button className='w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3'>
            New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='font-bold'>Create New File</DialogTitle>
            <DialogDescription>
              <Input className='w-full mt-5' onChange={(e) => setFileInput(e.target.value)} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className='bg-blue-600 hover:bg-blue-700' onClick={() => onFileCreate(fileInput)}>
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SideNavBottomSection;
