export default function SideFooter () {
  return (
    <div className="border-t pt-3">
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left">
        <span className="material-symbols-outlined">logout</span>
        Log Out
      </button>
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="size-8 rounded-full bg-gray-300" />
        <div>
        <p className="text-xs font-semibold">Sarah Jenkins</p>
        <p className="text-[10px] text-[#617589]">Head Receptionist</p>
      </div>
      </div>
    </div>
  );
}