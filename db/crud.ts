import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { usersTable } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "Me",
    age: 30,
    email: "Me@example.com",
  };

  // Insert User
  await db.insert(usersTable).values(user);
  console.log("New user created!");

  // Retrieve Users
  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  // Update Users
  // await db
  //   .update(usersTable)
  //   .set({
  //     age: 31,
  //   })
  //   .where(eq(usersTable.email, user.email));
  // console.log("User info updated!");

  // Delete
  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log("User deleted!");
}

main();
