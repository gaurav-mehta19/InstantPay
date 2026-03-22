import { Profile } from "../../../components/profile";
import { BreadcrumbNav } from "../../../components/shared/BreadcrumbNav";
import { getProfile } from "../../../lib/utils/profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="page-shell">
      <BreadcrumbNav current="Profile" />

      <Profile name={profile.name} phone={profile.phone} />
    </div>
  );
}
