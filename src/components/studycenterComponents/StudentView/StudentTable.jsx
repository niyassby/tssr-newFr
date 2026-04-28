import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/Context/authContext";
import { useSettings } from "@/hooks/tanstackHooks/useAuth";
import CopyToClipbord from "@/components/ui/CopyToClipbord";
import { PencilEdit02Icon, ViewIcon } from "hugeicons-react";
import Avatarview from "@/components/ui/avatarview";
  
  
  export function StudentTable({data}) {
    const { user } = useAuth()
    const { data:settings } = useSettings();
    const settingData = settings?.data;
    const navigate = useNavigate()
    return (
      <Table className="border-b">
        <TableHeader className='uppercase'>
          <TableRow>
            <TableHead className="w-[10px]">NO</TableHead>
            <TableHead className="w-[50px]">Profile</TableHead>
            <TableHead className="">Name</TableHead>
            <TableHead>Mobile</TableHead>
            {user?.isAdmin && <TableHead>Center</TableHead>}
            <TableHead>Course</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Reg. NO</TableHead>
            <TableHead>View</TableHead>
            {(user.isAdmin ||settingData.editStudentDataPermission ) && <TableHead>Edit</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell className=" w-[10px]">{i + 1}</TableCell>
              <TableCell className="font-medium">
                <Avatarview src={item.profileImage} fallBack={item?.studentName[1]?.toUpperCase() || "ST"}/>
                {/* <Avatar className={' border'}>
                  <AvatarImage
                    className="object-cover"
                    src={item.profileImage}
                    alt="@shadcn"
                  />
                  <AvatarFallback>{item?.studentName[1]?.toUpperCase() || "ST"}</AvatarFallback>
                </Avatar> */}
              </TableCell>
              <TableCell className="font-medium">{item.studentName?.toUpperCase()}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              {user?.isAdmin && <TableCell className='md:min-w-60 md:whitespace-normal md:break-words capitalize'>{item?.studycenterName?.toUpperCase() || "N/A"}</TableCell>}
              <TableCell className='md:min-w-60 md:whitespace-normal md:break-words capitalize'>{item.courseName?.toUpperCase() || "N/A"}</TableCell>
              <TableCell>{item.batchMonth}</TableCell>
              <TableCell>{item.year}</TableCell>
              <TableCell> <CopyToClipbord text={item.admissionNumber}/></TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`view?id=${item.enrollmentId}&isEnroll=true`)}
                >
                  View <ViewIcon size={20}/>
                </Button>
              </TableCell>

              {(user.isAdmin ||settingData.editStudentDataPermission )  && (
                <TableCell>
                  <Button
                    className='bg-transparent hover:bg-background  cursor-pointer shadow-none border border-primary  text-primary'
                    size="sm"
                    onClick={() => navigate(`edit?id=${item.enrollmentId}&isEnroll=true`)}
                  >
                    Edit <PencilEdit02Icon size={20}/>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    );
  }

