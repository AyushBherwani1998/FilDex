import leftArrow from "../assets/left_arrow.svg";

export default function TokenDropList({
  tokens,
  toggleDropDown,
  updateSelectedToken,
  isFromTokenDropDown,
}) {
  return (
    <div className="flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3  ">
      {tokens && (
        <div className="flex flex-col">
          <div className="flex flex-row mb-4 ">
            <img
              src={leftArrow}
              alt="v"
              className="p-2 mr-2"
              onClick={() => {
                toggleDropDown(false);
              }}
            />
            <div className="flex items-center">Select receive token</div>
          </div>
          
          {Object.keys(tokens).map((key) => {
            const token = tokens[key];
            return (
              <div
                key={token.name}
                onClick={() => {
                  updateSelectedToken(token, isFromTokenDropDown);
                  toggleDropDown(false);
                }}
              >
                <div className="group flex flex-row hover:bg-hover-fill p-3 rounded   ">
                  <img src={token.logo} alt="F" className="pr-2 w-8" />
                  <div className="m-2 group-hover:text-white">{token.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
