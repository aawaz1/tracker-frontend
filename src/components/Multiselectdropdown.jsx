import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

const platforms = ["LeetCode", "CodeChef", "Codeforces"];

const MultiSelectDropdown = ({ selectedOptions, onChange }) => {
  const toggleSelection = (platform) => {
    const newSelection = selectedOptions.includes(platform)
      ? selectedOptions.filter((p) => p !== platform)
      : [...selectedOptions, platform];

    onChange(newSelection); // Call parent function to update state
  };

  return (
    <div className="relative w-90 md:w-100">
      <Listbox>
        <div className="relative">
          <Listbox.Button className="w-full border px-4  py-2 rounded-lg flex justify-between items-center bg-white shadow">
            {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select Platforms"}
            <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
          </Listbox.Button>
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
              <div className="px-4 py-2 text-gray-600 font-semibold">Platforms</div>
              <div className="flex flex-wrap gap-2 p-2">
                {platforms.map((platform) => (
                 <button
                 key={platform}
                 onClick={() => toggleSelection(platform)}
                 className={`px-3 py-1 rounded-full text-sm font-semibold border transition-all duration-300 ${
                   selectedOptions.includes(platform) ? "bg-gray-200 scale-105" : "bg-white scale-100"
                 }`}
               >
                 {platform} 
                 <span className="ml-2 transition-transform duration-300">
                   {selectedOptions.includes(platform) ? "−" : "+"}
                 </span>
               </button>
               
                ))}
              </div>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default MultiSelectDropdown;
