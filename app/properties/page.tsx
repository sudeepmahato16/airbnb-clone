import React from "react";
import PropertiesClient from "./PropertiesClient";
import {getCurrentUser} from "@/actions/getCurrentUser";
import {getListings} from "@/actions/getListings";
import EmptyState from "@/components/EmptyState";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const properties = await getListings({ userId: currentUser.id });

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
