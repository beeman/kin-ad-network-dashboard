export default (size: number = 12) => {
    let randomString = '';
    while (randomString.length < size) {
        randomString += Math.random().toString(36).slice(2);
    }
    return randomString.substring(0, size);
};
