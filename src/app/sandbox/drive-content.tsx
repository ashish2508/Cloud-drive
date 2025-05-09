"use client";

import { ChevronRight, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "~/app/file-row";
import type {files_table as files, folders_table as folders} from "~/server/db/schema";

export default function DriveContents(props:{
  files:(typeof files.$inferselect)[]
  folders:(typeof folders.$inferselect)[];
}) {
  const [currentFolder, setCurrentFolder] = useState<number>(1);

  const handleFolderClick = (folderId: number) => {
    setCurrentFolder(folderId);
  };

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== 1) {
      const folder = props.folders.find((folder) => folder.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent ?? "root";
      } else {
        break;
      }
    }

    return breadcrumbs;
  }, [currentFolder,props.folders]);

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentFolder(1)}
              variant="ghost"
              className="mr-2 bg-slate-800 text-gray-300 hover:bg-teal-950/30 hover:text-white"
            >
              My Drive
            </Button>
            {breadcrumbs.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                  className="bg-slate-800 text-gray-300 hover:bg-teal-950/30 hover:text-white"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleUpload}
            className="bg-blue-800 text-white hover:bg-blue-950"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
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
              <FolderRow
                key={folder.id}
                folder={folder}
                handleFolderClick={() => {
                  handleFolderClick(folder.id);
                }}
              />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} handleFileClick={() => {}} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
