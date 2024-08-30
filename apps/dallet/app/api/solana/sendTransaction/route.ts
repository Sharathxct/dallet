import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authConfig } from '../../../../lib/auth';
import { prisma as db } from '../../../../db';
import { sendTransaction } from "../../../../lib/solana";

export async function POST(req: NextRequest) {
  const data: {
    quoteResponse: any
  } = await req.json();

  const session = await getServerSession(authConfig);

  console.log("session", session);
  console.log("data", data);

  //@ts-ignore
  if (!!session.user.email) {
    //@ts-ignore
    const user = await db.User.findFirst({
      where: {
        //@ts-ignore
        email: session.user.email
      },
      include: {
        solWallet: true
      }
    })
    console.log('user....', user);

    try {
      //@ts-ignore
      const signature = await sendTransaction(data.addr, data.amount, user.solWallet.privateKey)
      console.log('signature........', signature)
      return NextResponse.json({ message: "hi", signature })
    } catch (error) {
      //@ts-ignore
      console.log(error.message);
      return NextResponse.json({ error: true })
    }

  }
}
