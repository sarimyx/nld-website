import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RedirectToSignIn } from "@clerk/nextjs";
import { supabaseServerClient } from "@/utils/supabase-client-server";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { currentUser } from "@clerk/nextjs/server";

export default async function StaffDashboardSubpage() {
  const db = await supabaseServerClient();
  const { data } = await db.from("Services").select("*");
  if (!data) return <p>Failed to load staff.</p>;
  const user = await currentUser();
  return !user ? (
    <RedirectToSignIn />
  ) : (
    <ContentLayout title="Databases">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/staff">Staff</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Databases</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col space-y-3 py-4">
        <div className="flex text-slate-700 dark:text-slate-300 font-light items-center justify-between">
          <span className="font-bold">Services</span>
          <a
            href={`https://supabase.com/dashboard/project/bpbpnlruyebxmjxasecx/editor/33752?schema=public`}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Source
          </a>
        </div>
        <DataTable columns={columns} data={data.sort((a, b) => a.id - b.id)} />
      </div>
    </ContentLayout>
  );
}
