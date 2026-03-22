import { err, ok, type Result } from "../core/result";
import { UserRepository } from "../repositories/user-repository";

export type ProfileError = "UNAUTHENTICATED" | "PROFILE_NOT_FOUND";

export class ProfileService {
  constructor(private readonly userRepo = new UserRepository()) {}

  async getProfile(
    userId: string | undefined,
  ): Promise<Result<{ phone: string; name: string }, ProfileError>> {
    if (!userId) {
      return err("UNAUTHENTICATED");
    }

    const profile = await this.userRepo.getProfileById(userId);
    if (!profile) {
      return err("PROFILE_NOT_FOUND");
    }

    return ok({
      phone: profile.phone,
      name: profile.name,
    });
  }
}
