"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Styling } from "@/constants/styling";
import {
  OrganizationList,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SelectOrganizationPage() {
  return (
    <ContentLayout title="Select Organization" hideSidebar>
      <SignedIn>
        <div className="flex justify-center px-4 py-8">
          <div className="flex flex-col space-y-4">
            <span
              className={`max-w-80 text-5xl font-light ${Styling.GoldChromatic}`}
            >
              Select an organization.
            </span>
            <OrganizationList
              appearance={{ baseTheme: dark }}
              afterSelectOrganizationUrl={(org) =>
                `/dashboard${org.slug ? `/${org.slug}` : ""}`
              }
              afterSelectPersonalUrl={() => `/dashboard/customer`}
            />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ContentLayout>
  );
}
