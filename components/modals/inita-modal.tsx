"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serverFormSchema } from "@/lib/validations";
import { FileUpload } from "../file-upload";
import { Input } from "../ui/input"; // shadcn Input
import { Button } from "../ui/button"; // shadcn Button
import axios from "axios";
import { useRouter } from "next/navigation";

// Modal wrapper (centers on screen)
const Modal = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export const IntialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  type FormSchema = z.infer<typeof serverFormSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(serverFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormSchema) => {
    try {
      const res = await axios.post("/api/servers/", values);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) return null;

  return (
    <Modal open>
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Customize your server</h2>
          <p className="text-gray-500">
            Give your server a personality with name and image. You can always
            change it later.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div className="flex justify-center">
            <FileUpload
              endpoint="ServerImage"
              value={form.watch("imageUrl")}
              onChange={(url) => form.setValue("imageUrl", url)}
            />
          </div>

          {/* Server name */}
          <div>
            <label className="block text-sm font-bold text-gray-600 uppercase mb-1">
              Server name
            </label>
            <Input
              placeholder="Enter server name"
              disabled={isLoading}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-100 px-6 py-4 rounded-b-lg flex justify-end">
            <Button type="submit" disabled={isLoading}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
