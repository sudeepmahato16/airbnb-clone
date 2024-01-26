import React, { Suspense } from "react";

import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import ListingCard from "@/components/ListingCard";

import { getCurrentUser } from "@/services/user";
import { getReservations } from "@/services/reservation";
import LoadMore from "@/components/LoadMore";

const ReservationPage = async () => {
  const user = await getCurrentUser();

  if (!user) return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const { listings, nextCursor } = await getReservations({
    autherId: user.id,
  });

  if (listings.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );

  return (
    <section className="main-container">
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className=" mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4">
        {listings.map((listing) => {
          const { reservation, ...data } = listing;
          return (
            <ListingCard
              key={listing.id}
              data={data}
              reservation={reservation}
            />
          );
        })}
        {nextCursor ? (
          <Suspense fallback={<></>}>
            <LoadMore
              nextCursor={nextCursor}
              fnArgs={{ autherId: user.id }}
              queryFn={getReservations}
              queryKey={["reservations", user.id]}
            />
          </Suspense>
        ) : null}
      </div>
    </section>
  );
};

export default ReservationPage;
