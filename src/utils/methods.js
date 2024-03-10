export function mapAndEmit(array, emit, props) {
    let arrayToEmit = array.map((elem) => {
        return {
            type: props.type,
            value: elem
        }
    })
    emit('updateFilters', arrayToEmit)
}