// import { Alert, Snackbar } from "@mui/material";

enum NotificationType {
  SUCCESS,
  ERROR
}

interface Props {
  isOpen: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  message: string,
  type: NotificationType;
}

function NotificationToStringMapper(input: NotificationType) {
  if (input === NotificationType.SUCCESS) {
    return 'success';
  } else {
    return 'error';
  }
}

const Notification: React.FC<Props> = ({ message, type, isOpen, setter }) => {
  return (
    // <Snackbar open={isOpen} autoHideDuration={2000} onClose={() => setter(false)}>
    //   <Alert onClose={() => { setter(false) }} severity={NotificationToStringMapper(type)} variant='filled' sx={{ width: '100%' }}>
    //     {message}
    //   </Alert>
    // </Snackbar>
    <div></div>
  );
}

export { Notification, NotificationType };
