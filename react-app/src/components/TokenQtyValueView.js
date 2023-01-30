export default function TokenQtyValueView({ tokenQuantity, tokenPrice }) {
  return (
    <div className="flex flex-col rounded-lg bg-input-fill p-4">
      <div className="text-white text-md">{tokenQuantity}</div>
      <div className="text-sm">${tokenPrice}</div>
    </div>
  );
}
