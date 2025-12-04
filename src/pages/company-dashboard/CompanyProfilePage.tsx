// import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { useGetCompanyProfileQuery } from "@/redux/features/company/companyApi";

export default function CompanyProfilePage() {
  const { data } = useGetCompanyProfileQuery(undefined);
  //   const [open, setOpen] = useState(false);
  const company = data?.data;
  //   const [formData, setFormData] = useState({
  //     companyName: company?.companyName || "",
  //     industry: company?.industry || "",
  //     website: company?.website || "",
  //     address: company?.address || "",
  //     description: company?.description || "",
  //   });

  //   const handleChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const saveProfile = () => {
  //     // TODO: dispatch updateCompanyProfile(formData)
  //     setOpen(false);
  //   };

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Company Profile</h1>

      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={company?.logo}
              alt="Company Logo"
              className="w-24 h-24 rounded-xl object-contain border"
            />

            <div>
              <h2 className="text-xl font-semibold">{company?.companyName}</h2>
              <p className="text-slate-600">{company?.industry}</p>
              <p className="text-slate-600 text-sm">{company?.website}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">About Company</h3>
            <p className="text-slate-700 whitespace-pre-line">
              {company?.description || "No description provided."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="text-slate-700">{company?.address}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Country</h3>
            <p className="text-slate-700">{company?.country}</p>
          </div>

          {/* <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => setOpen(true)}
          >
            Edit Profile
          </Button> */}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Company Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />
            <Input
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleChange}
            />
            <Input
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
            />
            <Input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />

            <Textarea
              name="description"
              placeholder="Company Description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-[120px]"
            />

            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700 w-full"
              onClick={saveProfile}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
