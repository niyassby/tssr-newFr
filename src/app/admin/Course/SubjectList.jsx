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
import { Library, Search, Plus, BookX } from "lucide-react";

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
              `Subject ${res?.data?.name} is now ${newState ? "Active" : "Inactive"}`
            );
          } else {
            toast.error("Failed to update subject status");
          }

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
    const newId = subjects.length
      ? Math.max(...subjects.map((s) => s.id)) + 1
      : 1;
    setSubjects((prev) => [...prev, { id: newId, name, code, isActive: true }]);
  };

  return (
    <section className="w-full space-y-6">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Library className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">Course Subjects</h1>
            </div>

            <p className="text-muted-foreground mt-2 text-sm md:text-base leading-relaxed">
              Manage your institution's subjects curriculum. Add new subjects, update codes, and toggle active status availability for courses.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subject by name or code..."
                  className="pl-9 h-10 bg-background"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start max-md:mt-2 shrink-0">
            <Button onClick={() => setDialogOpen(true)} className="gap-2 shrink-0 cursor-pointer shadow-sm hover:shadow">
              <Plus className="w-4 h-4" /> Add Subject
            </Button>
          </div>
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
      <div className="rounded-2xl border bg-card/50 p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          Available Subjects <span className="text-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary">{subjects.length}</span>
        </h2>

        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
        ) : (
          <div className="py-16 text-center border-2 border-dashed rounded-xl text-muted-foreground flex flex-col items-center justify-center gap-3">
            <BookX className="w-12 h-12 text-muted-foreground/50" />
            <p className="font-medium text-foreground">No subjects found</p>
            <p className="text-sm text-muted-foreground">We couldn't find any subjects matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
