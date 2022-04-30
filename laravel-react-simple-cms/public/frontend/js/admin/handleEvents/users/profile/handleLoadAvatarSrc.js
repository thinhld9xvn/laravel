export function handleLoadAvatarSrc(file) {
    const self = this;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        var image = document.createElement("img");
        image.src = reader.result;
        image.onload = () => {
            if (image.width < 160 || image.height < 200) {
                document.isLoadedAvatar = false;
            } 
            else {
                self.props.updateUserAvatarSrc(reader.result);
                document.isLoadedAvatar = true;
            }
        };
    });
    reader.readAsDataURL(file);
}