import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma as db } from '../../../../db';
import { Keypair } from "@solana/web3.js";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'google') {
        const email = user.email;
        const name = user.name;

        if (!email) {
          return false
        }

        const userDb = await db.User.findFirst({
          where: {
            email: email
          }
        })

        if (userDb) {
          return true;
        }

        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = keypair.secretKey;

        await db.User.create({
          data: {
            name: name,
            email: email,
            solWallet: {
              create: {
                publicKey: publicKey,
                privateKey: privateKey.toString()
              }
            }
          }
        })
        return true;
      }
      return false;
    }
  }
})

export { handler as GET, handler as POST }
