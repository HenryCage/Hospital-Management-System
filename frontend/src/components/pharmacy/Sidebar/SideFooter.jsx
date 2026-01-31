import LoggingOut from '../../Logout';

export default function SideFooter () {
  const logout = LoggingOut();
  return (
    <div className="border-t pt-3">
      <button onClick={logout} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left">
        <span className="material-symbols-outlined">logout</span>
        Log Out
      </button>
    </div>
  );
}