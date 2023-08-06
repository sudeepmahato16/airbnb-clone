'use client'
import React from 'react'

import ListingCard from '@/components/listings/ListingCard'
import Heading from '@/components/Heading'
import Container from '@/components/Container'
import { User, Listing } from '@prisma/client'

interface FavoritesClientProps {
  listings: Listing[],
  currentUser?: User | null,
}


const FavoritesClient: React.FC<FavoritesClientProps> = ({listings, currentUser}) => {
  return (
    <Container>
    <Heading
      title="Favorites"
      subtitle="List of places you favorited!"
    />
    <div 
      className="mt-6 md:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4"
    >
      {listings.map((listing) => (
        <ListingCard
          currentUser={currentUser}
          key={listing.id}
          data={listing}
        />
      ))}
    </div>
  </Container>
  )
}

export default FavoritesClient