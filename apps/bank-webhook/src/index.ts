import express from 'express';
const app = express();
import prisma from "@repo/db/client";

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
          //@ts-ignore
          status: "Success"
        }
      })
    ]);

    res.json({
      message:"Captured"
    })
  }catch(e){
    res.status(411).json({
      message:"Error while processing webhook"
    })
  }
})




app.listen(3003, () => {
  console.log('Server is running on port 3003');
})