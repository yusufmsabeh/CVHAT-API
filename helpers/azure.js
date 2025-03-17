import { containerClient } from "../config/azure_config.js";

export const uploadToAzure = async (
  file,
  fileName,
  folderName,
  fileType,
  fileLength,
  userID,
) => {
  const blockBlobClient = containerClient.getBlockBlobClient(
    `${userID}/${folderName}/${fileName}`,
  );
  await blockBlobClient.upload(file, fileLength, {
    blobHTTPHeaders: {
      blobContentType: fileType,
    },
  });
  return blockBlobClient.url;
};
