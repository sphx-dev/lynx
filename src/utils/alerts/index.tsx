import toast from "react-hot-toast";

const config = {
  style: {
    backgroundColor: "#3D5656",
    color: "white",
  },
};

export const successAlert = (message: string) => toast.success(message, config);
export const errorAlert = (message: string) => toast.error(message, config);
export const infoAlert = (message: string) => toast(message, config);
export const promiseAlert = (
  promise: Promise<any>,
  loadingComponent: JSX.Element,
  successComponent: any,
  errorComponent: any
) =>
  toast.promise(
    promise,
    {
      loading: loadingComponent,
      success: successComponent,
      error: errorComponent,
    },
    config
  );
