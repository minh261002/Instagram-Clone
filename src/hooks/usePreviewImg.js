import Swal from "sweetalert2";
import { useState } from "react";

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const maxFileSize = 2 * 1024 * 1024;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSize) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Kích thước ảnh quá lớn'
                })
                selectedFile(null);
                return;
            }

            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(reader.result);
            }

            reader.readAsDataURL(file);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng chọn file ảnh'
            })
            setSelectedFile(null);
        }
    }

    return { selectedFile, handleImageChange, setSelectedFile }
}

export default usePreviewImg;