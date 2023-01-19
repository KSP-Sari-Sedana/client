import { Fragment } from "react";

import { Navbar } from "../components/interface/Navbar";
import { Avatar } from "../components/interface/Avatar";
import { Badge } from "../components/interface/Badge";
import { Profile } from "../components/interface/Profile";
import { StarIcon } from "../components/icons/StarIcon";
import { useUserContext } from "../context/userContext";

function ProfilePage() {
  const { userCtx } = useUserContext();

  return (
    <Fragment>
      <Navbar />
      <div className="w-10/12 mx-auto">
        <div className="mt-28 flex flex-col items-center">
          <p className="text-center font-darkergrotesque text-3xl font-extrabold mb-2">Profil</p>
          <Avatar></Avatar>
          <div className="flex mt-3 gap-x-2">
            <Badge style="clear">
              <StarIcon role={userCtx.me.role} />
              {userCtx.me.role}
            </Badge>
            <Badge
              style={
                userCtx.me.status === "Aktif"
                  ? "clear"
                  : userCtx.me.status === "Ditinjau"
                  ? "buttercup"
                  : userCtx.me.status === "Dikunci"
                  ? "rice"
                  : userCtx.me.status === "Nonaktif"
                  ? "magenta"
                  : "pippin"
              }
            >
              {userCtx.me.status}
            </Badge>
          </div>
          <div className="mt-2 font-darkergrotesque text-4xl font-extrabold">
            <p>
              {userCtx.me.firstName} {userCtx.me.lastName}
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Profile />
        </div>
      </div>
    </Fragment>
  );
}

export { ProfilePage };
