const Helper = () => {
    const sortDescending = (obj) => Object.keys(obj).sort()
    .reduce((acc, c) => { acc[c] = obj[c]; return acc }, {});
}
export default Helper;