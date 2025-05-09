import {db} from "~/server/db"
import { mockFolders,mockFiles } from "~/lib/mock-data";
import {
  files_table as files,
  folders_table as folders,
} from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function{" "}
    <form action={async ()=>{
      "use server";

      console.log("Seeding data");
      await db.insert(folders).values(mockFolders.map((folder,index) => ({
        id: index+1,
        name: folder.name,
        parent : index != 0?1 : null,
      })),
      );
      await db.insert(files).values(mockFiles);
     }} >
      <button type="submit">Seed</button>
    </form>
    </div>
  );
}
