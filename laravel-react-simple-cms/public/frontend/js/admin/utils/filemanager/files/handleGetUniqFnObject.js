export function handleGetUniqFnObject(fn) {
    let fn_splices = fn.toLowerCase().split('.'),
        fn_length = fn_splices.length,
        fn_object = { name: '', extension: '' };
    for (let i = 0; i < fn_length; i++) {
        if (i < fn_length - 1) {
            if (i > 0) {
                fn_object['name'] += '.';
            }
            fn_object['name'] += fn_splices[i];
        } else {
            fn_object['extension'] = fn_splices[i];
        }
    }
    return fn_object;
}