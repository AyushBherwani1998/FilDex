export default function TokenQuantityInput({ onInput }) {
  return (
    <div className="flex flex-row border-solid border-grey-font border rounded-lg bg-input-fill focus-visible:ring hover:bg-hover-fill hover:border-hover-stroke flex-grow justify-between">
      <div className="flex flex-col justify-start">
        <input
          type="number"
          onChange={(e) => onInput(e.target.value)}
          placeholder="Enter 0.1, 100, 10%..."
          className="bg-inherit border-none text-white rounded-tl-lg placeholder:text-sm placeholder:text-placeholder-dark-text ml-3 mt-1 focus:outline-none"
        />
      </div>
    </div>
  );
}
