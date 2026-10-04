function ErrorBox({ text }: { text: string }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-700 shadow-sm">
        <p className="font-medium">Error</p>
        <p className="text-sm">{text || "An error occurred"}</p>
      </div>
    </div>
  );
}

export default ErrorBox;
