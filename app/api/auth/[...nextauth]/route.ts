
/*import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { db } from "../../../../firebase"; // Adjust the path if necessary

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Add your own authentication logic here
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      }
    })
  ],
  adapter: FirestoreAdapter(db),
  session: {
    jwt: false,
  },
  callbacks: {
    async session(session, user) {
      session.user = user;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
});
*/