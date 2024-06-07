import {
  StorageError,
  TaskState,
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from './firebase'; // Đảm bảo rằng 'storage' được export từ './firebase'
import * as ImagePicker from 'expo-image-picker';
import { elderconnection } from '~/constants/firebase';

export interface uploadFilesProps {
  images: ImagePicker.ImagePickerAsset[];
  floderName: string;
  onUploadStart?: () => void;
  onUploading?: (uploadStatus: UploadingStatus) => void;
  onUploadSucess?: (url: string) => void;
  onUploadFailed?: (error: StorageError | unknown) => void;
}

export interface UploadingStatus {
  progress: number;
  state: TaskState | 'none';
}

export const uploadFiles = async ({
  images,
  floderName,
  onUploadStart,
  onUploadFailed,
  onUploadSucess,
  onUploading,
}: uploadFilesProps) => {
  try {
    const uploadTasks: UploadTask[] = [];
    let totalBytesTransferred = 0;
    let totalBytes = 0;
    const bytesTransferredByTask: { [key: string]: number } = {};

    // Calculate the total bytes of all images
    for (const image of images) {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      totalBytes += blob.size;
    }

    // Loop through each image
    for (const image of images) {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const fileName = image.fileName || new Date().getTime().toString();
      const storageRef = ref(storage, elderconnection + '/' + floderName + '/image/' + fileName);
      const metadata = {
        contentType: image.type,
      };
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      onUploadStart?.();

      bytesTransferredByTask[fileName] = 0; // Initialize bytes transferred for this file

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const bytesTransferred = snapshot.bytesTransferred;
          const previousTransferred = bytesTransferredByTask[fileName];

          // Update the total bytes transferred correctly
          totalBytesTransferred += bytesTransferred - previousTransferred;
          bytesTransferredByTask[fileName] = bytesTransferred;

          const progress = (totalBytesTransferred / totalBytes) * 100;
          onUploading?.({ progress, state: snapshot.state });
        },
        (error) => {
          onUploadFailed?.(error);
          console.error('Error uploading file:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadSucess?.(downloadURL);
          console.log('File available at', downloadURL);
        }
      );

      uploadTasks.push(uploadTask);
    }

    // Wait for all upload tasks to complete
    await Promise.all(uploadTasks.map((task) => task.then()));
  } catch (error) {
    onUploadFailed?.(error);
    console.error('Error uploading files:', error);
  }
};
