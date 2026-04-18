"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddSubjects from "@/components/admincomp/courseComp/AddSubjects";
import SubjectCard from "@/components/admincomp/courseComp/SubjectCard";
import {
  useAllTrueAndFalseSubjects,
  useUpdateSubjects,
} from "@/hooks/tanstackHooks/useSubjects";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editSubjectId, setEditSubjectId] = useState(null);
  const [editSubjectName, setEditSubjectName] = useState("");
  const [editSubjectCode, setEditSubjectCode] = useState("");

  const navigate = useNavigate()
  const { data } = useAllTrueAndFalseSubjects();
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setAllSubjects(sortedData); // store original
      setSubjects(sortedData);    // initial display
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search) {
        // 👈 reset when empty
        setSubjects(allSubjects);
        return;
      }

      const filteredData = allSubjects.filter((subject) =>
        subject.name.toLowerCase().includes(search.toLowerCase()) ||
        subject.code.toLowerCase().includes(search.toLowerCase())
      );

      setSubjects(filteredData);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, allSubjects]);

  const { mutate, isPending } = useUpdateSubjects();

  const handleEditClick = (subject) => {
    setEditSubjectId(subject._id);
    setEditSubjectName(subject.name);
    setEditSubjectCode(subject.code);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!editSubjectName.trim() || !editSubjectCode.trim()) {
      return toast.error("Please fill both subject name and code.");
    }
    mutate(
      { id: editSubjectId, name: editSubjectName, code: editSubjectCode },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Subject updated successfully!");
            setEditDialogOpen(false);
          } else {
            toast.error("Failed to update subject");
          }
        },
        onError: (error) => {
          toast.error("Failed to update subject: " + error.message);
        },
      }
    );
  };

  const handleToggle = (code, newState) => {
    // Find the subject by code to get its id
    const subject = subjects.find((subj) => subj.code === code);
    if (!subject) {
      toast.error("Subject not found");
      return;
    }
    mutate(
      { id: subject._id, isActive: newState },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(
              `Subject ${res?.data?.name} is now ${newState ? "Active" : "Inactive"
              }`
            );
          } else {
            toast.error("Failed to update subject status");
          }

          // Update local state with new isActive status
          setSubjects((prev) =>
            prev.map((subj) =>
              subj.id === res.id
                ? { ...subj, isActive: res.isActive }
                : subj
            )
          );
        },
        onError: (error) => {
          toast.error("Failed to update subject status: " + error.message);
        },
      }
    );
  };

  const handleAddSubject = (name, code) => {
    // Generate a simple id (ideally your backend should handle this)
    const newId = subjects.length
      ? Math.max(...subjects.map((s) => s.id)) + 1
      : 1;
    setSubjects((prev) => [...prev, { id: newId, name, code, isActive: true }]);
  };

  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start  sm:items-center justify-between gap-4">
        <div className="gap-2 flex flex-col w-full max-w-md ">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Subjects
          </h2>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subject" className='w-full max-w-md' />
        </div>
        <div className="space-x-1">

          {/* <Button variant='outline' onClick={() => navigate(-1)}>Back</Button> */}
          <Button onClick={() => setDialogOpen(true)}>Add Subject</Button>
        </div>
      </div>

      {/* Add Subject Dialog */}
      <AddSubjects
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSave={handleAddSubject}
        subjectName={subjectName}
        setSubjectName={setSubjectName}
        subjectCode={subjectCode}
        setSubjectCode={setSubjectCode}
      />

      {/* Edit Subject Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Update the subject name and code.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Subject Name
              </label>
              <Input
                id="edit-name"
                placeholder="e.g. Physics"
                value={editSubjectName}
                onChange={(e) => setEditSubjectName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-code" className="text-sm font-medium">
                Subject Code
              </label>
              <Input
                id="edit-code"
                placeholder="e.g. PHYS101"
                value={editSubjectCode}
                onChange={(e) => setEditSubjectCode(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={handleEditSave} disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.code}
            name={subject.name}
            code={subject.code}
            isActive={subject.isActive}
            onToggle={(newState) => handleToggle(subject.code, newState)}
            onEdit={() => handleEditClick(subject)}
          />
        ))}
      </div>
    </section>
  );
}
