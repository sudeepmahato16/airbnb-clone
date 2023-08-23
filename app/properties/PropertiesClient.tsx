"use client";
import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { User, Listing } from "@prisma/client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import ConfirmDelete from "@/components/ConfirmDelete";
import useConfirmDelete from "@/hooks/useConfirmDelete";

interface PropertiesClientProps {
  currentUser: User | null;
  properties: Listing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  properties,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { onOpen, onClose } = useConfirmDelete();

  const onDelete = (id: string) => {
    setIsDeleting(true);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsDeleting(false);
        onClose();
      });
  };

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className=" mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4">
        {properties.map((listing) => (
          <Fragment key={listing.id}>
            <ListingCard
              data={listing}
              onAction={() => onOpen(listing.id)}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
            <ConfirmDelete
              id={listing.id}
              onConfirm={() => onDelete(listing.id)}
              title="Delete Property"
              desc="Are you sure you want to delete this listing permanently?"
              isLoading={isDeleting}
            />
          </Fragment>
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
