export default function TokenQuantityInput({ onInput }) {
  return (
    <div className="flex flex-row border-solid border-grey-font border rounded-lg bg-input-fill">
      <div className="flex flex-col justify-start">
        <input
          type="text"
          onChange={(e) => onInput(e.target.value)}
          placeholder="Enter 0.1, 100, 10%..."
          className="bg-input-fill border-none rounded-tl-lg placeholder:text-sm placeholder:text-placeholder-dark-text ml-3 mt-1"
        />
        <div className="text-xs mb-2 ml-3">$0.00</div>
      </div>
      <div className="text-white text-xs mt-2 mr-3 ml-3">MAX</div>
    </div>
  );
}
