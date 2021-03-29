const deepCopyArrayOfObjects = (arrayOfObjects) => {
    return arrayOfObjects.map(object => ({...object}));
}

export default deepCopyArrayOfObjects;