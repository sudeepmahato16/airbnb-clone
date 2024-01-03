import React from "react";
import PropertiesClient from "./_components/PropertiesClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import {db} from '@/libs/db'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  
  const properties = await db.listing.findMany({
    where: {
      userId: currentUser.id
    }
  })

  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return (
    <PropertiesClient currentUser={currentUser} properties={properties || []} />
  );
};

export default PropertiesPage;
