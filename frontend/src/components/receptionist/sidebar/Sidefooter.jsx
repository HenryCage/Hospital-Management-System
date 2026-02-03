import LoggingOut from "../../Logout";

export default function SideFooter () {
  const logout = LoggingOut();
  return (
    <div className="border-t pt-3">
      <button onClick={logout} className="flex items-center gap-2 text-red-600 font-semibold pt-6 border-t hover:text-red-700 transition"
>
        <span className="material-symbols-outlined">logout</span>
        Log Out
      </button>
    </div>
  );
}