import leftArrow from "../assets/left_arrow.svg";

export default function TokenDropList({
  tokens,
  toggleDropDown,
  updateSelectedToken,
  isFromTokenDropDown,
}) {
  return (
    <div className="flex justify-start flex-col m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3">
      {tokens && (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <img
              src={leftArrow}
              alt="v"
              className="mr-4"
              onClick={() => {
                toggleDropDown(false);
              }}
            />
            <div>Select receive token</div>
          </div>
          <div className="mb-4" />
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
                <div className="flex flex-row">
                  <img src={token.logo} alt="F" className="w-8" />
                  <div className="m-2">{token.name}</div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
