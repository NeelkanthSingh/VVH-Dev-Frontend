/* eslint-disable react/prop-types */
export const Button = ({ className = "", children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 h-14
       bg-[#ABF10E] text-white inline-flex items-center whitespace-nowrap rounded-md ring-offset-background transition-colors justify-start gap-2 hover:shadow-lg shadow-md text-xl font-heading
       ${className}`}
    >
      {children}
    </button>
  );
};