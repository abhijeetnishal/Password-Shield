import deleteBtn from "@/public/assets/delete-btn.png";
import Image from "next/image";

export type DeleteConfProps = {
  passwordId: string;
  item: string;
  onClose: () => void;
};

const DeleteConfirmation = (props: DeleteConfProps) => {
  const { passwordId, item, onClose } = props;

  async function handleConfirmationDelete() {
    const response = await fetch(
      `${process.env.REACT_APP_HOST_URL}/passwords/${passwordId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    //console.log(data);
    //window.location.reload(false); /* TypeErr: reload does not take args */
    window.location.reload();
  }

  return (
    <div
      data-testid="delete-confirmation"
      onClick={onClose}
      className="shadow fixed right-[5%] left-[5%] lg:right-1/4 lg:left-1/4 flex flex-row items-start justify-center bg-white"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="shadow-md border rounded flex flex-col w-full p-4 h-60 justify-evenly"
      >
        <h1 className="text-lg self-center font-medium">
          Are you sure you want to delete {item} Data?
        </h1>
        <div className="w-2/3 self-center my-2">
          Once you delete we will not be able to undo it. Delete only if you are
          sure about it.
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
            onClick={handleConfirmationDelete}
          >
            <Image className="" src={deleteBtn} alt="" />
            <p className="">Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
