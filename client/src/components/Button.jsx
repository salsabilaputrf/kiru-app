export const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-[#6D5DD3] hover:bg-[#5b4db8] text-white font-medium py-2 px-4 rounded-md transition duration-200"
  >
    {children}
  </button>
);