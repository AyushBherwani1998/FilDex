import successLogo from "../assets/success_logo.svg";

export default function SuccessComponent({ title, body, bottom }) {
  return (
    <div className="flex justify-start flex-col m-8 text-white rounded-lg p-4 w-1/3 bg-gradient-to-b to-gradient-green from-gradient-black">
      <div className="flex justify-center my-2">
        <img src={successLogo} alt="Success" />
      </div>
      <div className="flex justify-center my-2">
        <p>{title}</p>
      </div>
      {body}
      <div className="w-full">
        <hr className="bg-divider-dark" />
      </div>
      {bottom}
    </div>
  );
}
