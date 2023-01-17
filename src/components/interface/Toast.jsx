import ReactDOM from "react-dom";

function Toast({ text, type }) {
  return ReactDOM.createPortal(
    <div className="w-10/12 mx-auto">
      <div className="toast fixed w-10/12 mx-auto">
        <div className={`flex items-center animate-toast absolute z-20 top-24 right-0 mr-2 px-4 py-1 bg-gray-700 text-white rounded-full max-w-fit`}>
          <div className="text-sm text-center font-light">{text}</div>
        </div>
      </div>
    </div>,
    document.getElementById("toast")
  );
}

export { Toast };
