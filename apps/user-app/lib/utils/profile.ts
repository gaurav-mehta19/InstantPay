import { getServerSession } from "next-auth/next";
import { unstable_cache } from "next/cache";
import { NEXT_AUTH } from "../auth";
import { ProfileService } from "../server/services/profile-service";
import { profileTag } from "../server/core/cache-tags";

const profileService = new ProfileService();

export async function getProfile() {
  const session = (await getServerSession(NEXT_AUTH)) as {
    user?: { id?: string };
  } | null;
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated.");
  }

  const result = await unstable_cache(
    async () => profileService.getProfile(userId),
    ["profile", userId],
    { revalidate: 60, tags: [profileTag(userId)] },
  )();

  if (!result.ok) {
    throw new Error("Profile not found");
  }

  return result.value;
}
