export default function TokenQtyValueView({ tokenQuantity, tokenPrice }) {
  return (
    <div className="flex flex-col rounded-lg bg-input-fill p-4 flex-grow">
      <div className="text-white text-md">{tokenQuantity}</div>
    </div>
  );
}
