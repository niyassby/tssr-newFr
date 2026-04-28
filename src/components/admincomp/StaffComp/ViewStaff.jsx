// import * as React from "react"
// import { Plus } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"


// export function ViewStaff() {
//   const [goal, setGoal] = React.useState(350)


//   return (
//     <Drawer direction="right">
//       <DrawerTrigger asChild>
//         <Button variant="outline">Open Drawer</Button>
//       </DrawerTrigger>
//       <DrawerContent >
//         <div className="mx-auto w-full max-w-sm">
//           <DrawerHeader>
//             <DrawerTitle>Move Goal</DrawerTitle>
//             <DrawerDescription>Set your daily activity goal.</DrawerDescription>
//           </DrawerHeader>
//           <div className="p-4 pb-0">
//             <div className="flex items-center justify-center space-x-2">
              
//               <div className="flex-1 text-center">
//                 <div className="text-7xl font-bold tracking-tighter">
//                   {goal}
//                 </div>
//                 <div className="text-muted-foreground text-[0.70rem] uppercase">
//                   Calories/day
//                 </div>
//               </div>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 shrink-0 rounded-full"
//               >
//                 <Plus />
//                 <span className="sr-only">Increase</span>
//               </Button>
//             </div>
//             <div className="mt-3 h-[120px]">
              
//             </div>
//           </div>
//           <DrawerFooter>
//             <Button>Submit</Button>
//             <DrawerClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   )
// }


import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Drawer } from 'vaul';
import StaffPDF from './StaffPDF';
import { EyeIcon } from 'hugeicons-react';
import { HiOutlineEye } from 'react-icons/hi2';
 
export default function VaulDrawer({data}) {
    console.log(data);
  return (
    <Drawer.Root  direction="right">
      <Drawer.Trigger >
        <Button size='sm' variant='outline' className='border-primary text-primary hover:bg-primary hover:text-white cursor-pointer'>
        <HiOutlineEye/>
        View
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/20" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-[100] outline-none w-full max-w-sm flex "
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ '--initial-transform': 'calc(100% + 8px)' }}
        >
          <div className="bg-zinc-50 dark:bg-muted h-full w-full grow p-5 flex flex-col rounded-[16px]">
            <div className=" flex flex-col items-center justify-center  ">
                <img className='size-36 mt-5 rounded-full border object-cover' src={data?.profileImage} alt="" />
              <Drawer.Title className="font-medium mt-3 text-foreground">{data.name}</Drawer.Title>
              <Drawer.Description className="text-foreground mb-3 text-sm">{data?.staffId}
              </Drawer.Description>
              <Separator decorative className='mb-4'/>
              <div className='w-full space-y-2 mb-4'>
                <div className='mb-4'>
                    <h1 className='font-medium text-foreground '>Personal Details</h1>
                </div>
                <StaffDatils label={"Name"} value={data?.name}/>
                <StaffDatils label={"Age"} value={`${data?.age} years`}/>
                <StaffDatils label={"DOB"} value={format(new Date(data?.dob), 'PPP')}/>
                <StaffDatils label={"Gender"} value={data?.gender}/>
                <StaffDatils label={"Email"} value={data?.email}/>
                <StaffDatils label={"Designation"} value={data?.designation}/>
              </div>
              <Separator decorative className='mb-4'/>
              <div className='w-full space-y-2 mb-4'>
                <div className='mb-4'>
                    <h1 className='font-medium text-foreground '>Contact Details</h1>
                </div>
                <StaffDatils label={"Phone Number"} value={data?.phoneNumber}/>
                <StaffDatils label={"Email"} value={data?.email}/>
                <StaffDatils label={"State"} value={data?.address?.state}/>
                <StaffDatils label={"Place"} value={data?.address?.place}/>
                <StaffDatils label={"Pincode"} value={data?.address?.pincode}/>
              </div>
              <Separator decorative className='mb-4'/>
              <div className='w-full space-y-2 mb-4'>
                <div className='mb-4'>
                    <h1 className='font-medium text-foreground '>Other Info</h1>
                </div>
                <StaffDatils label={"Qualification"} value={data?.qualification}/>
                <StaffDatils label={"Department"} value={data?.department}/>
                <StaffDatils label={"Staff ID"} value={data?.staffId}/>
              </div>
                 
            </div>
            <StaffPDF data={data}/>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}


function StaffDatils({label, value}) {
  return (
    <div className='grid grid-cols-5 gap-4 w-full '>
        <h1 className='col-span-2 text-sm text-muted-foreground '>{label}</h1>
        <h1 className='col-span-3 text-sm text-foreground font-medium capitalize'>{value}</h1>
    </div>
  )
}
