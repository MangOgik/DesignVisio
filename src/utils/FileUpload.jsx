import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message } from 'antd';

const FileUpload = ({ onFileChange }) => {
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    const { status, name } = info.file;
    if (status === 'done') {
      message.success(`${name} file uploaded successfully`);
      onFileChange(info.file); // Pass the file to the parent
    } else if (status === 'error') {
      message.error(`${name} file upload failed.`);
    }

    setFileList(info.fileList);
  };

  return (
    <Upload
      name="file"
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" // Just an example, replace with your own API
      headers={{ authorization: 'authorization-text' }}
      onChange={handleChange}
      fileList={fileList}
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default FileUpload;
