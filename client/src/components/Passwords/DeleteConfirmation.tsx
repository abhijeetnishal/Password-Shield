import useThemeStore from "@/src/store/themeStore";
import CrossIcon from "../Icons/CrossIcon";
import DisclaimerIcon from "../Icons/DisclaimerIcon";

export type DeleteConfProps = {
  item: any;
  onClose: () => void;
  onSubmit: Function;
};

const DeleteConfirmation = (props: DeleteConfProps) => {
  const { item, onClose, onSubmit } = props;

  const theme = useThemeStore((state) => state.theme);

  return (
    <section className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-40">
      <div className="flex items-end sm:items-center justify-center min-h-full md:p-4 text-center sm:p-0">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div
            className={`relative rounded-lg shadow ${
              theme === "dark" ? "bg-[#1c1c1c]" : "bg-[white] text-gray-800"
            }`}
          >
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <CrossIcon />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <DisclaimerIcon theme={theme} />
              <h3
                className={`mb-5 text-lg font-normal ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Are you sure you want to delete {item.website_name}&apos;s
                password?
              </h3>
              <button
                onClick={() => onSubmit("delete", item)}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I&apos;m sure
              </button>
              <button
                onClick={onClose}
                data-modal-hide="popup-modal"
                type="button"
                className={`py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none 
                            ${
                              theme === "dark"
                                ? "bg-[#292929] text-white "
                                : "bg-[#f8f8ff] text-black "
                            }rounded-lg border border-gray-600 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100`}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteConfirmation;
