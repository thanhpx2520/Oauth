import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { EmailNotFound, PasswordWrong } from "@/utils/errors";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@gmail.com" && credentials?.password === "123456") {
          const user = { name: "Administrator", email: "admin@gmail.com", image: "" };
          return user;
        }
        if (credentials?.email !== "admin@gmail.com") {
          throw new EmailNotFound();
        }
        if (credentials?.password !== "123456") {
          throw new PasswordWrong();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  jwt: {},
  session: {},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
