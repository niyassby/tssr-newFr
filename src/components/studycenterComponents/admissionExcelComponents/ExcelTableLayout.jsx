// ExcelTableLayout.jsx
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUploadDialog } from "./FileUploadDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";

export function ExcelTableLayout({
  title,
  students,
  enableUpload = false,
  onEditClick,
  isError = false,
}) {

  return (
    <div
      className={`bg-background rounded-2xl shadow border ${
        isError ? "border-red-400" : " "
      } overflow-x-auto`}
    >
      <div className="px-4 py-3 flex items-center gap-2">
        {isError ? (
          <div className="bg-red-600 text-white rounded-full p-0.5">
            {<HiOutlineXMark size={12} />}
          </div>
        ) : (
          <div className="bg-green-600 text-white rounded-full p-0.5">
            {<HiOutlineCheck size={12} />}
          </div>
        )}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <Table className="min-w-full">
        <TableHeader className='uppercase'>
          <TableRow>
            <TableHead className={'w-20'}>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Aadhaar</TableHead>
            {isError&&<TableHead>Reason</TableHead>}
            {enableUpload && (
              <>
                <TableHead>Upload Files</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student, index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={
                      student?.profileImage ||
                      "https://imgs.search.brave.com/Tdd-8hSXGxRJvnfZAxvVjk9_01vEQe4FraxeApkoyc0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzlhLzU2/L2JmLzlhNTZiZjRm/YjlkZmJkNzVhYTBm/OTFiNjI4NDBmM2Zh/LmpwZw"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback className="capitalize">
                    {student?.name[0]}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{student?.name}</TableCell>
              <TableCell>{student?.gender}</TableCell>
              <TableCell>{student?.phoneNumber}</TableCell>
              <TableCell>{student?.email}</TableCell>
              <TableCell>{student?.adhaarNumber}</TableCell>
              {isError&&<TableCell className='text-base font-medium  max-w-sm  text-red-500'>{student?.reason}</TableCell>}

              {enableUpload && (
                <>
                  <TableCell>
                    {!student?.profileImage || !student?.sslc ? (
                      <Button onClick={() => onEditClick(student)}>
                        Upload
                      </Button>
                    ) : (
                      <Button disabled>Uploaded</Button>
                    )}

                    {/* <Button
                      onClick={() => {
                        onEditClick(student);
                      }}
                    >
                      Upload
                    </Button> */}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell >Total Students {students?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
