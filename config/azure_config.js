import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_ACCOUNT_CONNECTION_STRING,
);
export const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME,
);
export async function checkAzureConnection() {
  try {
    const createContainerResponse = await containerClient.create();
    console.log(
      `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`,
    );
  } catch (error) {
    if (error.code !== "ContainerAlreadyExists") throw error;
    console.log(
      `Container was created successfully.\n\tURL: ${containerClient.url}`,
    );
  }
}
export default async function main() {
  try {
    const containerClient = blobServiceClient.getContainerClient(
      process.env.AZURE_STORAGE_CONTAINER_NAME,
    );
    const createContainerResponse = await containerClient.create();
    console.log(
      `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`,
    );
  } catch (error) {
    if (error.code !== "ContainerAlreadyExists") throw error;
  }
}
