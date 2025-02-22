import { PrismaClient } from "@prisma/client"

import bcrypt from "bcrypt"
const prisma = new PrismaClient()

async function main(){
    const gaurav = await prisma.user.upsert({
        where:{ phone:"2222222222" },
        update:{},
        create:{
            name:"Gaurav",
            phone:"2222222222",
            password:await bcrypt.hash("123456789",12),

            balance:{
                create:{
                    amount:20000,
                    locked:0
                }
            },

            onRampTransaction:{
                create:{
                    createdAt:new Date(),
                    status:"Success",
                    amount:20000,
                    token:"adscjsmwbdskucaygdv",
                    provider:"HDFC Bank"
                }
            }
        }
    })

    const unni = await prisma.user.upsert({
        where:{ phone:"1111111111" },
        update:{},
        create:{
            name:"Unni",
            phone:"1111111111",
            password:await bcrypt.hash("123456789",12),

            balance:{
                create:{
                    amount:200000,
                    locked:0
                }
            },

            onRampTransaction:{
                create:{
                    createdAt:new Date(),
                    status:"Success",
                    amount:200000,
                    token:"csdjedbfliwvuergbfqlbcuiawsdvfc",
                    provider:"HDFC Bank"
                }
            }
        }
    })

    const Gaurav = await prisma.bank.upsert({
        where:{ accountNumber:"1234567890" },
        update:{},
        create:{
            accountNumber:"1234567890",
            name:"Gaurav",
            balance:1000000000,
            userID:"testing_User",
            password:await bcrypt.hash("123456789",12)
        }
    })
}

main().then(async () => {
    await prisma.$disconnect()
})
.catch(async(e)=>{
    console.error(e);
    await prisma.$disconnect()
    process.exit(1)
    
})