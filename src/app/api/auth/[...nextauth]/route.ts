import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const query = `
  SELECT 
    id_user,
    password
  FROM users
  WHERE email = $1
  LIMIT 1
`;

const result = await pool.query(query, [email]);
const user = result.rows[0];

if (!user) return null;

const isValid = await bcrypt.compare(password, user.password);
if (!isValid) return null;

return {
  id: String(user.id_user),
  email,
};

        } catch (error) {
          console.error("Error en autorización:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async jwt({ token, user }: { token: any; user?: { id: string; roleId?: number; role?: string } }) {
  if (user) {
    token.id = user.id;
    token.roleId = user.roleId;
    token.role = user.role;
  }
  return token;
},


  async session({ session, token }: { session: any; token: any }) {
  if (token && session.user) {
    session.user.id = token.id;
    session.user.roleId = token.roleId;
    session.user.role = token.role;
  }
  return session;
},


  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
