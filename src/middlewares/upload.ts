// src/middleware/upload.ts
import multer from 'multer'; 

// Configure storage options
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Export upload middleware
export {upload}  ;
