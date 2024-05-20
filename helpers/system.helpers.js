const systemHelper = {
    clone: (value) => {
        return Object.keys(value).map(key => {
            value[key].users = value[key].users.map(user => ({ ...user }));
            value[key] = { ...value[key] };
            return value[key]
        })
    },
    cleanConsole: (index, value) => {
        const result = systemHelper.clone(value);
        if (index === 0) {
            console.log(`%c ---- TEST --- Values before edit: `, 'background: #222; color: #bada55', result);
        }
    }
};


module.exports = systemHelper;
