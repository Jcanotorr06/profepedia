export {
    toTitleCase,
    formatNombre,
    formatGroup
}

const toTitleCase = (phrase:string) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

const formatNombre = (nombre:string) => {
    return toTitleCase(`${nombre.split(', ')[1]} ${nombre.split(', ')[0].split(' ')[0]}`)
}

const formatGroup = (group:string) => {
    return toTitleCase(group.trimStart())
}