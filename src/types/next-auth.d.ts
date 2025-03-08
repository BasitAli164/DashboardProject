import NextAuth, { DefaultSession } from "next-auth";

// Extend the User and Session interfaces
declare module 'next-auth' {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean; // Fixed type to boolean
    username?: string;
  }

  interface Session extends DefaultSession {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean; // Fixed type to boolean
      username?: string;
    };
  }
}

// Extend the JWT interface
declare module 'next-auth/jwt' { // Removed extra space
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean; // Fixed type to boolean
    username?: string;
  }
}