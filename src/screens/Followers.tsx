import { useOutletContext } from "react-router-dom";

interface FollowerContext {
  nameOfMyUser: string;
}

function Followers() {
  const { nameOfMyUser } = useOutletContext<FollowerContext>();

  return (
    <div>
      <h1>Followers</h1>
      <p>My Follower : {nameOfMyUser}</p>
    </div>
  );
}

export default Followers;
