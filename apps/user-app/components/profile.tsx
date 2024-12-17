import { Card } from "@repo/ui/card"

interface ProfileProps{
    name:string,
    phone:string,
}

export const Profile = ({name,phone}:ProfileProps) =>{
    return <Card title="Profile">
        <div className="text-neutral-400 mb-5">Update your personal information</div>
        <div className="text-lg  text-[#1a56db] mb-4"><span className="font-semibold">Name :</span> <span className="font-normal text-black">{name}</span></div>
        <div className="text-lg  text-[#1a56db] mb-4"><span className="font-semibold">Phone : </span><span className="text-black font-normal">{phone}</span></div>
    </Card>
}