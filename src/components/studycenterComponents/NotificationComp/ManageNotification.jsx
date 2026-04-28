import { useState } from "react";
import { NotificationIcon } from "./GetIcon";
import { useDeleteNotifications, useGetAllNotificationsForEdit } from "@/hooks/tanstackHooks/useNotifications";
import Loader from "@/components/ui/loader";
import { formatDistanceStrict } from "date-fns";
import { Download04Icon, Delete01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { CreateNotification } from "@/components/admincomp/NotificationComp/CreateNotification";
import { useNavigate } from "react-router-dom";
import { deleteByUrl } from "@/hooks/useFirebaseUpload";

function ManageNotification() {
  const { data, error, isLoading } = useGetAllNotificationsForEdit();
  const navigate = useNavigate('')
  const { mutate, isPending } = useDeleteNotifications();
  const [deletingId, setDeletingId] = useState(null);


const handleDeleteNotification = async (id, title) => {
  setDeletingId(id);
  const imgUrl = data.data.find((item) => item._id === id)?.attachedFileUrl;
  if (imgUrl) {
    await deleteByUrl(imgUrl)
  }
  mutate(
    { id },
    {
      onSuccess: () => {
        toast.success(`Notification "${String(title)}" was removed.`);
      },
      onError: () => {
        toast.error("Failed to delete the notification.");
      },
    }
  );
};

const NavigateBack = () => {
  navigate(-1);
}

  if (error) return <div>error</div>;

  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );

  // if (!data.data || data.data.length === 0)
  //   return (
  //     <div className="w-full h-full flex items-center justify-center">
  //       No Notification
  //     </div>
  //   );

  return (
    <div className="w-full max-w-[65rem] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold "> Manage Notifications </h1>
        <div>
          <Button onClick={NavigateBack}>Back</Button>
            {" "}
            <CreateNotification />
        </div>
      </div>
      <div className="flex flex-col divide-y">
        {data?.data?.map((item, i) => {
          const isDeleting = deletingId === item._id;

          return (
            <div
              key={i}
              className="flex md:items-start max-md:flex-col gap-2 hover:bg-muted/40 px-2 md:px-4 py-5"
            >
              <div className="flex gap-3 md:gap-6 w-full">
                {/* Fixed width for icon container */}
                <div className="flex-shrink-0 relative">
                  <NotificationIcon item={item.category} size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  {" "}
                  {/* This prevents text from pushing the layout */}
                  <h1 className="font-medium truncate">{item?.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    {item?.description}
                  </p>
                  <div className="mt-2">
                    {item?.attachedFileUrl && item?.attachedFileUrl !== "" && (
                      <a
                        href={item?.attachedFileUrl}
                        download={true}
                        className="text-xs font-medium text-white mt-1 bg-primary px-3 inline-flex items-center justify-center gap-1 rounded-md py-1"
                      >
                        <Download04Icon size={16} />
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between h-full items-end gap-3 text-nowrap">
                <p className="text-sm text-muted-foreground">
                  {formatDistanceStrict(
                    new Date(item?.createdAt || 0),
                    new Date(),
                    { addSuffix: true }
                  )}
                </p>

                {/* Delete Button */}
                <div className="flex items-center gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 bg-transparent h-8 px-2 md:px-3"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 border border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs hidden sm:inline">
                              Deleting...
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Delete01Icon size={14} />
                            <span className="text-xs hidden sm:inline">
                              Delete
                            </span>
                          </div>
                        )}
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this notification?
                          This action cannot be undone.
                          <div className="mt-3 p-3 bg-muted rounded-md">
                            <p className="font-medium text-sm truncate">
                              {item?.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {item?.description}
                            </p>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleDeleteNotification(item._id, item.title)
                          }
                          className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageNotification;
