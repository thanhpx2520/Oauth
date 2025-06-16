import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { EmailNotFound, PasswordWrong } from "@/utils/errors";
import type { NextAuthOptions, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
        if (!credentials) return null;

        const { email, password } = credentials;

        if (email === "admin@gmail.com" && password === "123456") {
          return {
            id: "1", // Bắt buộc: phải có `id`
            name: "Administrator",
            email: "admin@gmail.com",
            image: "", // Nếu không có ảnh thì để chuỗi rỗng
          };
        }

        if (email !== "admin@gmail.com") throw new EmailNotFound();
        if (password !== "123456") throw new PasswordWrong();

        return null; // fallback
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
};
