import ReactDOM from "react-dom";

function Toast({ text, type }) {
  return ReactDOM.createPortal(
    <div className="toast relative w-10/12 mx-auto">
      <div className={`${type === "error" ? "bg-bethlehem-600" : "bg-electron-500"} flex items-center animate-toast absolute z-20 top-24 right-0 mr-2 px-5 py-2 text-white rounded-lg max-w-fit`}>
        <div className="text-sm text-center">{text}</div>
      </div>
    </div>,
    document.getElementById("toast")
  );
}

export { Toast };
