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

export default async function UsersLeaderboard() {
  const users = await getUsers();

  return (
    <div className=" lg:h-[800px] max-h-[800px] w-full overflow-y-auto rounded-lg p-5 bg-neutral-500/20">
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
                <TableCell className="text-white font-bold">
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
