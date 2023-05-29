import { useCallback, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { IUser } from "@/types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: IUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favorites || [];
    return list.includes(listingId);
  }, [currentUser?.favorites, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let req;
        if (hasFavorited) {
          req = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          req = () => axios.post(`/api/favorites/${listingId}`);
        }

        await req();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite
  }
};

export default useFavorite;
