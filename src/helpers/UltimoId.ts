export const ultimoIdByArray = (array : any[]) => {
    const BD = array;
    const ultimoId = BD.pop();
    return ++ultimoId.id;
}