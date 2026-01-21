import { Loader } from "../Loader/Loader";

export const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-background z-[100]">
      <Loader />
    </div>
  );
};
