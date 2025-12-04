/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useAddSkillMutation,
  useDeleteSkillMutation,
  useGetAllSkillsQuery,
} from "@/redux/features/skill/skillApi";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";
import type { TSkill } from "@/types";

export default function ManageSkillsPage() {
  const {
    data,
    isLoading,
    refetch: refetchSkills,
  } = useGetAllSkillsQuery(undefined);
  const [addSkill, { isLoading: isAdding }] = useAddSkillMutation();
  const [deleteSkill, { isLoading: isDeleting }] = useDeleteSkillMutation();

  const [skillName, setSkillName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const handleAddSkill = async () => {
    if (!skillName.trim()) {
      toast.error("Skill name is required");
      return;
    }

    try {
      const result = await addSkill({ skillName }).unwrap();
      if (result?.success) {
        toast.success("Skill added successfully!");
        setSkillName("");
        refetchSkills();
      } else {
        toast.error("Failed to add skill");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to add skill");
    }
  };

  const handleDeleteSkill = async () => {
    if (!deleteId) return;

    try {
      const result = await deleteSkill(deleteId).unwrap();
      if (result?.success) {
        toast.success("Skill deleted successfully!");
        refetchSkills();
        setDeleteModal(false);
      } else {
        toast.error("Failed to delete skill");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Failed to delete skill"
      );
    }
  };

  const skills: TSkill[] = data?.data || [];

  return (
    <div className="p-6 w-full">
      {/* Add Skill Form */}
      <Card className="shadow-md rounded-2xl border border-slate-200 mb-6">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-5">
            Add New Skill
          </h1>

          <div className="flex gap-3 items-center">
            <Input
              placeholder="Enter skill name"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
            <Button
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleAddSkill}
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add Skill"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills Table */}
      <Card className="shadow-md rounded-2xl border border-slate-200">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-5">
            Manage Skills
          </h1>

          {skills.length === 0 ? (
            <p className="text-center text-slate-500">No skills found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {skills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell>{skill.name}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setDeleteId(skill.id);
                            setDeleteModal(true);
                          }}
                          disabled={isDeleting}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Skill</DialogTitle>
          </DialogHeader>
          <p className="text-slate-700">
            Are you sure you want to delete this skill? This action cannot be
            undone.
          </p>
          <DialogFooter className="flex gap-2">
            <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSkill}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
