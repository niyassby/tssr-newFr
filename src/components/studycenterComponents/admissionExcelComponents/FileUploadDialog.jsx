import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useFirebaseUpload } from "@/hooks/useFirebaseUpload";
import { Progress } from "@/components/ui/progress";

export function FileUploadDialog({
  student,
  setNewStudents,
  dialogOpen,
  setDialogOpen,
  newStudents,
  setRow,
}) {
  const [profileImage, setProfileImage] = useState(null);
  const { uploadFile, progress,uploading: isUploading, error: uploadError } = useFirebaseUpload();
  const [sslcFile, setSslcFile] = useState(null);
  const [uploadErrors, setUploadErrors] = useState({
    profileImage: "",
    sslcFile: "",
  });
  const [formError, setFormError] = useState("");
  const [uploading, setUploading] = useState(false);
  // const [dialogOpen, setDialogOpen] = useState(false);

  // Clear formError when both files selected
  useEffect(() => {
    if (profileImage && sslcFile) setFormError("");
  }, [profileImage, sslcFile]);

  const handleFileChange = (e, setter, field) => {
    const file = e.target.files[0];
    setter(file);
    setUploadErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    if (!profileImage || !sslcFile) {
      setFormError("Please select both files before submitting.");
      return;
    }

    setUploading(true);
    setUploadErrors({ profileImage: "", sslcFile: "" });

    try {
      const [profileResult, sslcResult] = await Promise.all([
        // uploadFile(profileImage),
        // uploadFile(sslcFile),
        uploadFile({
          file: profileImage,
          path: "students/profileImages",
        }),
        uploadFile({
          file: sslcFile,
          path: "students/files",
        })
      ]);

      if (profileResult.url === "" || sslcResult.url === "") {
        if (profileResult.url === "") {
          setUploadErrors((prev) => ({
            ...prev,
            profileImage: `Failed: Uploading Profile Image`,
          }));
        }
        if (sslcResult.url === "") {
          setUploadErrors((prev) => ({
            ...prev,
            sslcFile: `Failed: Uploading SSLC File`,
          }));
        }
        toast.warning("One or more files couldn't be uploaded.");
        return;
      }
      const filterData = newStudents.filter(
        (s) => s.adhaarNumber != student.adhaarNumber
      );
      // Update student record in newStudents
      setNewStudents([
        ...filterData,
        {
          ...student,
          profileImage: profileResult.url,
          sslc: sslcResult.url,
        },
      ]);
      toast.success(`Profile and SSLC files added for ${student.name}.`);

      // Reset form
      setRow(null)
      setProfileImage(null);
      setSslcFile(null);
      setDialogOpen(false);
    } catch (error) {
      toast.warning("Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  

  const isUploaded = student.profileImage && student.sslc;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline" className="w-full" disabled={isUploaded}>
          {isUploaded ? "Already Uploaded" : "Upload"}
        </Button>
      </DialogTrigger> */}

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <DialogDescription>
            Upload profile image and SSLC certificate for{" "}
            <strong>{student.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Profile Image */}
          <div className="grid gap-2">
            <Label htmlFor={`profile-${student.id}`}>Profile Image</Label>
            <Input
              id={`profile-${student.id}`}
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e, setProfileImage, "profileImage")
              }
              disabled={uploading || isUploaded}
            />
            {profileImage && (
              <p className="text-sm text-green-600">
                ✅ Selected: <strong>{profileImage.name}</strong>
              </p>
            )}
            {uploadErrors.profileImage && (
              <p className="text-sm text-red-600">
                {uploadErrors.profileImage}
              </p>
            )}
          </div>

          {/* SSLC File */}
          <div className="grid gap-2">
            <Label htmlFor={`sslc-${student.id}`}>SSLC Certificate</Label>
            <Input
              id={`sslc-${student.id}`}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, setSslcFile, "sslcFile")}
              disabled={uploading || isUploaded}
            />
            {sslcFile && (
              <p className="text-sm text-green-600">
                ✅ Selected: <strong>{sslcFile.name}</strong>
              </p>
            )}
            {uploadErrors.sslcFile && (
              <p className="text-sm text-red-600">{uploadErrors.sslcFile}</p>
            )}
          </div>

          {/* General form error */}
          {formError && <p className="text-sm text-red-600">{formError}</p>}
          {isUploading&&<Progress value={progress} className="w-full" />}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={uploading || isUploaded}>
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
