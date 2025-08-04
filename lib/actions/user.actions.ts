// 'use server';

// import { clerkClient } from "@clerk/nextjs/server";
// import { parseStringify } from "../utils";
// import { liveblocks } from "../liveblocks";

// export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
//   try {
//     const allUsers = [];

//     for (const email of userIds) {
//       const result = await clerkClient.users.getUserList({
//         emailAddress: [email],
//       });

//       const user = result[0];
//       if (user) {
//         allUsers.push({
//           id: user.id,
//           name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
//           email: user.emailAddresses[0].emailAddress,
//           avatar: user.imageUrl,
//         });
//       }
//     }

//     return allUsers;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return []; // ✅ Never return undefined
//   }
// };


// export const getDocumentUsers = async ({ roomId, currentUser, text }: { roomId: string, currentUser: string, text: string }) => {
//   try {
//     const room = await liveblocks.getRoom(roomId);

//     const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

//     if(text.length) {
//       const lowerCaseText = text.toLowerCase();

//       const filteredUsers = users.filter((email: string) => email.toLowerCase().includes(lowerCaseText))

//       return parseStringify(filteredUsers);
//     }

//     return parseStringify(users);
//   } catch (error) {
//     console.log(`Error fetching document users: ${error}`);
//   }
// }

'use server';

import { createClerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

// Initialize Clerk client with explicit configuration
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    // Check if clerkClient is properly initialized
    if (!clerkClient) {
      console.error("Clerk client is not initialized");
      return [];
    }

    const allUsers = [];

    for (const email of userIds) {
      try {
        const result = await clerkClient.users.getUserList({
          emailAddress: [email],
        });

        const user = result.data?.[0];
        
        if (user) {
          allUsers.push({
            id: user.id,
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            email: user.emailAddresses?.[0]?.emailAddress || email,
            avatar: user.imageUrl,
          });
        }
      } catch (userError) {
        console.error(`Error fetching user ${email}:`, userError);
        // Continue with other users even if one fails
      }
    }

    return parseStringify(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Alternative implementation using different Clerk method
export const getClerkUsersAlternative = async ({ userIds }: { userIds: string[] }) => {
  try {
    if (!clerkClient) {
      console.error("Clerk client is not initialized");
      return [];
    }

    // Try using the newer API method
    const allUsers = [];

    for (const email of userIds) {
      try {
        // Alternative: Search users by email
        const users = await clerkClient.users.getUserList({
          emailAddress: [email],
          limit: 1,
        });

        if (users.data && users.data.length > 0) {
          const user = users.data[0];
          allUsers.push({
            id: user.id,
            name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
            email: user.emailAddresses?.[0]?.emailAddress || email,
            avatar: user.imageUrl,
          });
        }
      } catch (userError) {
        console.error(`Error fetching user ${email}:`, userError);
      }
    }

    return parseStringify(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getDocumentUsers = async ({ 
  roomId, 
  currentUser, 
  text 
}: { 
  roomId: string, 
  currentUser: string, 
  text: string 
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    if (text.length) {
      const lowerCaseText = text.toLowerCase();
      
      const filteredUsers = users.filter((email: string) => 
        email.toLowerCase().includes(lowerCaseText)
      );

      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
    return parseStringify([]);
  }
};