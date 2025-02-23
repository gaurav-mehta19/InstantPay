import { Profile } from "../../../components/profile"
import { getProfile } from "../../../lib/utils/profile"


export default async function Transfer(){
    const profile = await getProfile()

    return (
        <div className="flex justify-center items-center w-screen">
        <Profile name={profile.name} phone={profile.phone} ></Profile>
        </div>
    )
} 
