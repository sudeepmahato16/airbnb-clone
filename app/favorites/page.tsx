import React from "react";

import EmptyState from "@/components/EmptyState";
import { getCurrentUser } from "@/services/user";


const FavoritesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

    return (
      <EmptyState
        title="No Favorites found"
        subtitle="Looks like you have no properties."
      />
    );


  
};

export default FavoritesPage;
