import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../../sandbox/drive-contents";
import {z} from "zod"
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props:{params:Promise<{folderId:string}>}) {
  const params= await props.params;


  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }
  

  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));
  const folders = await db.select().from(foldersSchema).where(eq(foldersSchema.parent, parsedFolderId));
  return <DriveContents files={files} folders={folders} />;
}
