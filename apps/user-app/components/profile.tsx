import { Card } from "@repo/ui/card"

interface ProfileProps{
    name:string,
    phone:string,
}

export const Profile = ({name,phone}:ProfileProps) =>{
    return <Card title="Profile">
        <div>Update your personal information</div>
        <div >Name : <span>{name}</span></div>
        <div>Phone : <span>{phone}</span></div>
    </Card>
}