import { Fragment } from "react";

import { Navbar } from "../components/interface/Navbar";
import { Profile } from "../components/interface/Profile";

function ProfilePage() {
  return (
    <Fragment>
      <Navbar />
      <div className="w-10/12 mx-auto mt-28">
        <div>
          <Profile />
        </div>
      </div>
    </Fragment>
  );
}

export { ProfilePage };
