import "@/src/styles/LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div data-testid="loading-spinner">
      <div className="scanner">
        <span>Loading...</span>
      </div>
    </div>
  );
}
