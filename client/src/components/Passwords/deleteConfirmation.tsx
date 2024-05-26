import deleteBtn from "@/public/assets/delete-btn.png";
import Image from "next/image";

export type DeleteConfProps = {
  item: any;
  onClose: () => void;
  onSubmit: Function;
};

const DeleteConfirmation = (props: DeleteConfProps) => {
  const { item, onClose, onSubmit } = props;

  return (
    <section className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-40">
      <div className="flex items-end sm:items-center justify-center min-h-full md:p-4 text-center sm:p-0">
        <div className="relative bg-white rounded-lg m text-left shadow-xl transform transition-all sm:my-8">
          <div
            data-testid="delete-confirmation"
            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex flex-col w-full p-4 justify-evenly"
            >
              <h1 className="text-lg self-center font-medium">
                Are you sure you want to delete {item.website_name} Data?
              </h1>
              <div className="w-2/3 self-center my-2">
                Once you delete we will not be able to undo it. Delete only if
                you are sure about it.
              </div>
              <div className="flex flex-row items-center justify-evenly">
                <button
                  className="border border-teal-600 w-full text-teal-600 bg-gray-300 m-1 rounded p-1"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="flex flex-row items-center justify-center border border-teal-600  bg-teal-600 m-1 rounded p-1 text-white w-full"
                  onClick={() => onSubmit(item._id)}
                >
                  <Image className="" src={deleteBtn} alt="" />
                  <p className="">Delete</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteConfirmation;
