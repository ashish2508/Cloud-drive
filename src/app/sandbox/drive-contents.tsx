"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FileRow, FolderRow } from "~/app/file-row";
import type {
  files_table as files,
  folders_table as folders,
} from "~/server/db/schema";

export default function DriveContents(props: {
  files: (typeof files.$inferSelect)[];
  folders: (typeof folders.$inferSelect)[];
  parents: (typeof folders.$inferSelect)[];
}) {
  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/f/1"
              className="mr-2 bg-slate-900 text-gray-300 hover:bg-teal-950/30 hover:text-white"
            >
              My Drive
            </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="bg-slate-800 text-gray-300 hover:bg-teal-950/30 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 bg-teal-950/15 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-slate-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
