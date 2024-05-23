import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@radix-ui/react-separator";
import { useConvex } from "convex/react";
import { ChevronDown, Flag, LayoutGrid, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { act, useEffect, useState } from "react";


export  interface TEAM{
  createdBy:String,
  teamName:String,
  _id:String
}

const SideNavTopSection = ({user,setActiveTeamInfo}:any) => {
  const router = useRouter();
  const menu = [
    {
      id: 1,
      name: "Create team",
      icon: Flag,
      path: '/teams/create'
    },
    {
      id: 2,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings"
    }
  ];
  const onMenuClick = (item:any)=>{
    console.log(item)
    if(item.path){
      router.push(item.path)
    }
  }
  const convex = useConvex();
  const[activeTeam,setActiveTeam] = useState<TEAM>();
  useEffect(()=>{
    user&&getTeamList();
  },[user]);
  useEffect(()=>{
    activeTeam && setActiveTeamInfo(activeTeam)
  },[activeTeam])
  const[teamList,setTeamList]=useState<TEAM[]>();
  const getTeamList = async ()=>{
    const result = await convex.query(api.teams.getTeam,{email:user?.email});
    console.log(result);
    setTeamList(result);
    setActiveTeam(result[0]);
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
            <Image src="/logoipsum-296.svg" alt="logo" width={30} height={30} />
            <h2 className="flex gap-2 items-center font-bold text-[17px]">{activeTeam?.teamName}</h2>
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4">
          <div>
          {teamList?.map((team,index)=>(
                        <h2 key={index}
                        className={`p-2 hover:bg-blue-500
                         hover:text-white
                         rounded-lg mb-1 cursor-pointer
                         ${activeTeam?._id==team._id&&'bg-blue-500 text-white'}`}
                         onClick={()=>setActiveTeam(team)}
                        >{team.teamName}</h2>
            ))}
          </div>
          <Separator className="mt-2 bg-slate-100" />
          <div>
            {menu.map((item, index) => (
              <h2 key={index} className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm" onClick={()=>onMenuClick(item)}>
                <item.icon className="h-5 w-5" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm">
                <LogOut className="h-5 w-5" />
                Logout
              </h2>
            </LogoutLink>
          </div>
          <Separator/>
          {user&&
          <div className="mt-2 flex gap-2 items-center">
           <Image src={user?.picture} alt="logo" width={30} height={40} className="rounded-full"/>
           <div>
           <h2 className="text-[14px] font-bold">{user?.given_name}{user?.family_name}</h2>
           <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
           </div>
          </div>}
        </PopoverContent>
      </Popover>

      <div>
        <Button variant="outline" className="w-full justify-start gap-2 font-bold mt-8 bg-gray-100">
          <LayoutGrid className="h-5 w-5"/>
          All Files
        </Button>
      </div>
    </div>
  );
};

export default SideNavTopSection;

