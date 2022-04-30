export function handleCropAvatarModal() {
    this.setState({
        croppedImageUrl : null,
        blob : null,
        crop: {
            unit: "px",
            x : 0,
            y : 0,
            width: 160,
            height: 200
        }
        
    });
}