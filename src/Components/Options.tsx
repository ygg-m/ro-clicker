import usePageStore from "@/Stores/page";
import { MenuHeader } from "./MenuHeader";

export const Options = () => {
  const page = usePageStore((state) => state);

  const MainChar_ShowStatsAbove = () => {};

  return (
    <>
      {page.isOptionsMenuOpen && (
        <dialog
          className="z-[100] min-w-[20rem] rounded bg-white p-0 shadow-xl outline outline-1 outline-neutral"
          open
        >
          <MenuHeader name="Options" closeButton={page.hideOptionsMenu} />
          <div className="grid p-1">
            <div className="grid">
              <span>Main Character</span>
              {/*  */}
              <div className="form-control rounded-full px-2 duration-200 hover:bg-gray-100">
                <label className="label cursor-pointer">
                  <span className="text-sm">
                    Show HP and SP above Character
                  </span>
                  <input
                    type="checkbox"
                    className="toggle-primary toggle toggle-sm"
                    checked={page.isStatsAbovePlayerActive}
                    onChange={() => page.toggleStatsAbovePlayer()}
                  />
                </label>
              </div>
              {/*  */}
              <div className="form-control rounded-full px-2 duration-200 hover:bg-gray-100">
                <label className="label cursor-pointer">
                  <span className="text-sm">Show name below Character</span>
                  <input
                    type="checkbox"
                    className="toggle-primary toggle toggle-sm"
                    checked={page.isNameBelowPlayerActive}
                    onChange={() => page.toggleNameBelowPlayer()}
                  />
                </label>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
