const upload_preset = "food_ordering"
const cloud_name = "dwrvr5qnk"
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

export const uploadImageToCloudinary = async(imageFile) => {
  try {
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("upload_preset", upload_preset)
    formData.append("cloud_name", cloud_name)
    
    const res = await fetch(api_url , {
        method:'post',
        body: formData
    })

    const fileData = await res.json()

    return fileData.url
  } catch (error) {
    console.log("error: ", error);
  }
}
