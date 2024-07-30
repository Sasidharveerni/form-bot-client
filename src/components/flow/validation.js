const isValidImageUrl = (url) => {
    const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|avif|svg))$/i;
    return pattern.test(url);
};

const isValidVideoUrl = (url) => {
    const pattern = /^(https?:\/\/.*\.(?:mp4|webm|ogg))$/i;
    return pattern.test(url);
};

const isValidGifUrl = (url) => {
    const pattern = /^(https?:\/\/.*\.(?:gif))$/i;
    return pattern.test(url);
};


export {isValidGifUrl, isValidImageUrl, isValidVideoUrl}