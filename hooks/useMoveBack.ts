import { useRouter } from "next/navigation";

export const useMoveBack = () => {
  const router = useRouter();

  return () => router.back();
};
