import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const session = useSession();

  const status = session.status;
  const userProfile = session.data?.user.image;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const Button = (
    <button
      className="btn-primary btn"
      onClick={() => {
        status === "authenticated" ? signOut() : signIn();
      }}
    >
      {status === "authenticated" ? "Logout" : "Login"}
    </button>
  );

  const Profile = (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <img src={userProfile!} className="h-10 w-10 rounded-full" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>{Button}</li>
      </ul>
    </div>
  );

  return (
    <nav className="navbar bg-base-100 px-5">
      <div className="flex-1">
        <p className="btn-ghost btn text-xl normal-case">Note app</p>
      </div>
      <div className="flex-none">{!userProfile ? Button : Profile}</div>
    </nav>
  );
}

export default Navbar;
