const Switch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`w-14 h-8 flex items-center bg-gray-300 dark:bg-zinc-700 rounded-full p-1 cursor-pointer transition-all ${
        isOn ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
};

export default Switch;
