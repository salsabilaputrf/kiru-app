export const InputField = ({ label, type, placeholder }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
    />
  </div>
);