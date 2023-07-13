export const NewApp = () => {
  return (
    <div>
      <section className="grid min-h-screen w-screen grid-cols-3">
        <div className="grid bg-base-100 p-4">
          <div className="grid w-full place-items-center">
            <img
              src={require("@/Assets/Player/Novice/idle-action.gif")}
              alt="Player Name"
              className="w-64 scale-x-[-1]"
            />
          </div>
          
          <div className="grid grid-cols-2">
            <span>Adventurer</span>
            <span>Level 50 / 50</span>
            <span>Novice</span>
            <span>Job Level 7 / 7</span>
          </div>

        </div>
      </section>
    </div>
  );
};
