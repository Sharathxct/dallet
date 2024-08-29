import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma as db } from '../../../../db';
import { Keypair } from "@solana/web3.js";
import { Session } from 'next-auth';

export interface session extends Session {
  user: {
    email: string;
    name: string;
    image: string
    pubKey: string;
  };
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    session: ({ session, token }: any): session => {
      const newSession: session = session as session;
      if (newSession.user && token.pubKey) {
        // @ts-ignore
        newSession.user.pubKey = token.pubKey ?? "";
      }
      return newSession!;
    },
    async jwt({ token, account, profile }: any) {
      const user = await db.User.findFirst({
        where: {
          sub: account?.providerAccountId ?? ""
        },
        include: {
          solWallet: true // Eagerly load the associated SolWallet
        }
      })
      if (user) {
        console.log("user.......", user);
        token.pubKey = user.solWallet?.publicKey
      }
      return token
    },
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
          },
          include: {
            solWallet: true // Eagerly load the associated SolWallet
          }
        })

        if (userDb) {
          return {
            user: {
              ...user,
              pubKey: userDb.solWallet?.publicKey
            }
          };
        }

        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = keypair.secretKey;

        await db.User.create({
          data: {
            name: name,
            email: email,
            sub: account.providerAccountId,
            solWallet: {
              create: {
                publicKey: publicKey,
                privateKey: privateKey.toString()
              }
            }
          }
        })
        return {
          user: {
            ...user,
            pubKey: publicKey
          }
        };
      }
      return false;
    }
  }
})

export { handler as GET, handler as POST }
