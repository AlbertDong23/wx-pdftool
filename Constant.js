const prefix ='https://www.pdfparser.cn/pdfparser/';

export const URL = {
  POST_UploadPDFFiles: `${prefix}convert/wx/pdf/{type}`,
  GET_FileById: `${prefix}convert/wx/download/{fileId}/{fileName}`,
  POST_UploadImage: `${prefix}ocr/uploadImage`,
  POST_ExportExcel: 'https://simplypdf.com/api/convert',
  GET_OCRImages: `${prefix}ocr/result/{imageId}`,
  GET_ImageById: `${prefix}ocr/image/blob/{imageId}/{imageName}`,
  POST_Login: `${prefix}usr/access_token`,
}

export const loginUser = 'admin';
export const loginPws = 'ocr666888';

export const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTcwNjc3NDUsIm5iZiI6MTYxNzA2Nzc0NSwianRpIjoiYWU0MjhjNzctMmQ0Zi00Mzg3LWE3YWMtYjAyMTNhYzg5MjVjIiwiZXhwIjoxNjE3MDk3NzQ1LCJpZGVudGl0eSI6eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoicm9ja3pAc3lubmV4LmNvbSJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.s-zrWvi-gBJTE6GAPY0885X5U5O_T3fLxMolda2Gf5Y';

export const borderColors = ['#0097AF', '#A33FC0', '#1E9D48', '#DC6F01', '#004CAF', '#4DD6D6', '#87C44B', '#E14545',
'#B79544', '#333F48', '#3E52D5', '#5C871B', '#EF9E35', '#E95088', '#81632F', '#731CB0', '#3E5329', '#FF6060',
'#534B37', '#0F5080'];