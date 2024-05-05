import { getUsers } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default async function UsersLeaderboard({ userId }: { userId: string }) {
  const users = await getUsers();

  const sortedUsers = users.sort((a: IUser, b: IUser) => {
    if (a.totalPoints < b.totalPoints) {
      return 1;
    }
    if (a.totalPoints > b.totalPoints) {
      return -1;
    }
    return 0;
  });

  return (
    <div className=" lg:h-[825px] max-h-[825px] w-full overflow-y-auto rounded-lg p-5 bg-neutral-500/20">
      <h1 className="font-bold text-center text-xl text-white">
        Users Leaderboard
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Current Streak</TableHead>
            <TableHead className="text-right">Total Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: IUser) => {
            return (
              <TableRow key={user?._id}>
                <TableCell
                  className={`${
                    userId === user?._id ? "text-violet-500" : "text-white"
                  } font-bold`}
                >
                  {user?.username}
                </TableCell>
                <TableCell className="text-white">
                  {user?.currentStreak}
                </TableCell>
                <TableCell className="text-white text-right">
                  {user?.totalPoints}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
