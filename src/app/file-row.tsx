import { FileIcon, Folder as FolderIcon } from "lucide-react";
import type {
  files_table as files,
  folders_table as folders,
} from "~/server/db/schema";

export function FileRow(props: {
  file: typeof files.$inferSelect;
}) {
  const { file } = props;
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">{"file"}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  // Changed 'folder' type to be a single object
  folder: typeof folders.$inferSelect;
  handleFolderClick: (id: number | string) => void; // It's likely you'll need the folder's ID
}) {
  const { folder, handleFolderClick } = props;
  return (
    <li
      key={folder.id} // This will now work
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          {/* Pass the folder ID to handleFolderClick */}
          <button
            onClick={() => handleFolderClick(folder.id)}
            className="flex items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name} {/* This will now work */}
          </button>
        </div>
        <div className="col-span-3 text-gray-400"></div>
        <div className="col-span-3 text-gray-400"></div>
      </div>
    </li>
  );
}
