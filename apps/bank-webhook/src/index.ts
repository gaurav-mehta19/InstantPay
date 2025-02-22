import express from 'express';
import cors from 'cors';
const app = express();

import prisma from "@repo/db/client";

app.use(express.json());
app.use(cors());

app.get('/testing',async (req,res)=>{
  res.status(200).json({
    msg:"Testing Endpoint"
  })
})

app.post('/hdfcWebhook', async (req, res) => {

  const paymentInfromation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  
  try {
    await prisma.$transaction([
      prisma.balance.update({
        //@ts-ignore
        where: {
          userId: paymentInfromation.userId
        },
        data: {
          amount: {
            increment: paymentInfromation.amount
          }
        }
      }),
      
      prisma.onRampTransaction.update({
        where: {
          token: paymentInfromation.token
        },
        data: {
          status: "Success"
        }
      })
    ]);
    
    res.json({
      message:"Captured"
    })
  }catch(e){
    console.error(e);
    res.status(411).json({
      message:"Error while processing webhook"
    })
  }
})




app.listen(3003, () => {
  console.log('Server is running on port 3003');
})