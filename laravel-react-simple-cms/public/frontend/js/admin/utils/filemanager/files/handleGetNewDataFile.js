export function handleGetNewDataFile(name) {
    return {
        name: name,
        thumbnail: '',
        active: false,
        upload: {
            stat: true,
            percentage: 0,
            error: {
                stat: false,
                message: ""
            }
        },
        info: {
            id: -1,
            title: "",
            alt: "",
            description: ""
        },
        type: {
            label: "Hình ảnh",
            code: "image"
        },
        length: 0,
        datecreated: "",
        sizes: null
    };
}